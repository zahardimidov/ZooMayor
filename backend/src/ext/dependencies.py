from asyncio import Task
from datetime import datetime, timedelta, timezone
from typing import Annotated

from src.cards.schemas import CardGroup, CardGroups, UserCardResponse
from database.requests import (get_all_user_tasks, get_user, get_user_card_groups, get_user_cards, get_user_card, get_user_received_group, set_user_received_group,
                               set_user)
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from src.cards.models import Card
from src.ext.jwt_token import verify_jwt_token
from src.ext.validation import validate_qsl_init_data
from src.users.models import User

auth_scheme = HTTPBearer()


async def get_current_user(token: HTTPAuthorizationCredentials = Depends(auth_scheme)):
    initData = verify_jwt_token(token.credentials)
    if not initData:
        raise HTTPException(status_code=400, detail="Invalid token")

    user_data = validate_qsl_init_data(initData)
    if not user_data:
        raise HTTPException(
            status_code=400, detail='Invalid auth data provided')

    user = await get_user(user_data.get('id'))
    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    user = await update_energy(user)

    return user

WebAppUser = Annotated[User, Depends(get_current_user)]


async def update_energy(user: User):
    current_time = datetime.now(timezone.utc)
    dif: timedelta = current_time.replace(tzinfo=None) - user.energy_last_update
    energy_gained = int(dif.seconds // 10)

    if energy_gained > 0:
        user = await set_user(user_id=user.id, energy=min(100, user.energy + energy_gained), energy_last_update=current_time)

    return user

async def use_energy(user: User, amount):
    if user.energy == 100:
        current_time = datetime.now(timezone.utc)
        await set_user(user_id=user.id, energy_last_update=current_time, amount = user.energy - amount)
    else:
        await set_user(user_id=user.id, amount=user.energy - amount)

async def update_balance(user: User):
    current_time = datetime.now(timezone.utc)
    dif: timedelta = current_time.replace(tzinfo=None) - user.balance_last_update
    hours = dif.seconds // 60 // 60
    new_time = user.balance_last_update + timedelta(hours=hours)

    bonus = await get_bonus_per_hour(user_id=user.id)
    bonus_gained = bonus * hours


    if hours > 0:
        user = await set_user(user_id=user.id, balance = user.balance + bonus_gained, balance_last_update=new_time)

    return user


async def get_bonus_per_hour(user_id) -> int:
    user = await get_user(user_id=user_id)
    cards = await get_user_cards(user_id=user_id)

    res = 0
    for card, amount in cards:
        card: Card
        res += card.bonus_per_hour * amount

    tasks = await get_all_user_tasks(user_id=user.id)
    for usertask in tasks:
        ut: Task = usertask[0]
        if usertask[1] and ut.bonus_per_hour:
            res += ut.task.bonus_per_hour

    groups = await check_group_cards(user)
    for group in groups.groups:
        if group.bonus_received and group.bonus_per_hour:
            res += group.bonus_per_hour

    return res


async def check_group_cards(user: WebAppUser) -> CardGroups:
    groups = CardGroups(groups=[
        CardGroup(**group['group'].__dict__, cards_amount=group['count'], cards=[
            UserCardResponse(**card.to_dict()) for card in group['cards']
        ]) for group in await get_user_card_groups(user_id=user.id)
    ])

    for group in groups.groups:
        for card in group.cards:
            user_card = await get_user_card(user_id=user.id, card_id=card.card_id)

            if not user_card:
                break
        else:
            if not await get_user_received_group(user_id=user.id, group_id=group.id):
                await set_user_received_group(user_id=user.id, group_id=group.id)
    return groups
    

