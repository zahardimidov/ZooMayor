from datetime import datetime, timedelta, timezone
from typing import List

from database.session import async_session
from fastapi import HTTPException
from sqlalchemy import and_, select, update
from src.cards.models import Card
from src.invitecode.models import InviteCode
from src.tasks.models import Task
from src.users.models import User, UserCard, UserInviteCode, UserRef, UserTask


async def get_user(user_id) -> User:
    async with async_session() as session:
        user = await session.scalar(select(User).where(User.id == user_id))

        return user


async def get_card_by_id(card_id) -> Card:
    async with async_session() as session:
        card = await session.scalar(select(Card).where(Card.id == card_id))

        return card
    

async def get_task_by_id(task_id) -> Task:
    async with async_session() as session:
        task = await session.scalar(select(Task).where(Task.id == task_id))

        return task


async def set_user(user_id, **kwargs) -> User:
    async with async_session() as session:
        user = await session.scalar(select(User).where(User.id == user_id))

        if not user:
            user = User(id=user_id, **kwargs)
            session.add(user)
        else:
            for k, v in kwargs.items():
                setattr(user, k, v)

        await session.commit()
        await session.refresh(user)

        return user


async def set_referral(referrer_id, referral_id, bonus=0, exp=0, card_id=None):
    async with async_session() as session:
        ref = UserRef(referral_id=referral_id, referrer_id=referrer_id,
                      bonus=bonus, exp=exp, card_id=card_id)
        session.add(ref)
        await session.commit()
        await session.refresh(ref)

        return ref


async def get_user_friends(user_id):
    async with async_session() as session:
        friends = await session.scalars(select(User.username, User.registered_at, UserRef.bonus, UserRef.exp, UserRef.card_id).join(UserRef).where(UserRef.referrer_id == user_id))

        return list(friends)


async def get_user_cards(user_id):
    async with async_session() as session:
        results = await session.execute(select(Card, UserCard.amount).join(UserCard).where(UserCard.user_id == user_id))

        return results.all()


async def search_cards(query, minprice, maxprice, offset, limit) -> List[Card]:
    async with async_session() as session:
        stmt = select(Card)

        # Создание списка условий для фильтрации
        conditions = []

        if query is not None:
            conditions.append(Card.title.ilike(f'%{query}%'))

        if minprice is not None:
            conditions.append(Card.price >= minprice)

        if maxprice is not None:
            conditions.append(Card.price <= maxprice)

        # Применение условий фильтрации, если они есть
        if conditions:
            stmt = stmt.where(and_(*conditions))

        # Выполнение запроса и получение результатов
        cards = await session.scalars(stmt.limit(limit).offset(offset))
        return cards.all()


async def user_receive_bonuses(user_id, exp=0, bonus=0, card_id=None, **kwargs):
    await add_user_exp(user_id, exp)
    await add_user_balance(user_id, bonus)

    if card_id:
        await set_user_card(user_id=user_id, card_id=card_id)


async def set_user_card(user_id, card_id):
    card = await get_card_by_id(card_id=card_id)

    if not card:
        raise HTTPException(status_code=400, detail='Card not found')

    async with async_session() as session:
        userCard = await session.scalar(select(UserCard).where(UserCard.card_id == card_id, UserCard.user_id == user_id))

        if userCard:
            userCard.amount += 1
        else:
            userCard = UserCard(user_id=user_id, card_id=card_id)
            session.add(userCard)

        await session.commit()
        await session.refresh(userCard)

        data: dict = userCard.card.__dict__
        if 'card_id' in data:
            data.pop('card_id')
        await user_receive_bonuses(user_id=user_id, **data)


async def add_user_exp(user_id, exp):
    user = await get_user(user_id=user_id)

    async with async_session() as session:
        new_level = user.level + (exp // 1000)
        new_exp = (user.exp + exp) % 1000

        await session.execute(update(User).where(User.id == user_id).values(level=new_level, exp=new_exp))
        await session.commit()

    return await get_user(user_id=user_id)


async def add_user_balance(user_id, balance):
    user = await get_user(user_id=user_id)

    async with async_session() as session:
        await session.execute(update(User).where(User.id == user_id).values(balance=user.balance + balance))
        await session.commit()

    return await get_user(user_id=user_id)


async def get_user_invite_codes(user_id) -> InviteCode:
    async with async_session() as session:
        codes = await session.scalars(select(InviteCode).join(UserInviteCode).where(UserInviteCode.user_id == user_id))

        return list(codes)


async def get_bonus_by_code(code: str) -> InviteCode:
    async with async_session() as session:
        bonus = await session.scalar(select(InviteCode).where(InviteCode.code == code))

        return bonus


async def set_user_invitecode(user_id, code):
    async with async_session() as session:
        userInviteCode = await session.scalar(select(UserInviteCode).where(UserInviteCode.user_id == user_id, UserInviteCode.invitecode_id == code))

        if userInviteCode:
            raise HTTPException(
                status_code=400, detail='You have already received this bonus')

        userInviteCode = UserInviteCode(user_id=user_id, invitecode_id=code)
        session.add(userInviteCode)

        await session.commit()
        await session.refresh(userInviteCode)

        data = userInviteCode.invitecode.__dict__
        await user_receive_bonuses(user_id=user_id, **data)

        return userInviteCode


async def get_all_user_tasks(user_id):
    async with async_session() as session:
        tasks = await session.scalars(select(Task))

        res = []
        for task in tasks.all():
            usertask = await session.scalar(select(UserTask).where(UserTask.user_id == user_id, UserTask.task_id == task.id))

            if usertask:
                res.append([task, usertask.complete, usertask.created_at])
            else:
                res.append([task, False, None])

        return sorted(res, key=lambda x: (-x[1], x[0].position))


async def set_user_task(user_id, task_id):
    async with async_session() as session:
        userTask = await session.scalar(select(UserTask).where(UserTask.user_id == user_id, UserTask.task_id == task_id))

        if userTask:
            if userTask.task.timer is None or (userTask.complete and not (datetime.now(timezone.utc) - timedelta(minutes=userTask.task.timer) >= userTask.created_at)):
                raise HTTPException(
                    status_code=400, detail='You could not complete this task right now')
            else:
                userTask.created_at = datetime.now(timezone.utc)
                userTask.complete = True
        else:
            userTask = UserTask(user_id=user_id, task_id=task_id)
            session.add(userTask)

        await session.commit()
        await session.refresh(userTask)

        await user_receive_bonuses(user_id=user_id, **userTask.task.__dict__)

async def create_task(title, **kwargs):
    async with async_session() as session:
        task = Task(title = title, **kwargs)
        session.add(task)

        await session.commit()
        await session.refresh(task)

        return task