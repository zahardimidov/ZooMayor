from datetime import datetime, timedelta, timezone
from typing import List

from database.session import async_session
from fastapi import HTTPException
from sqlalchemy import and_, func, select, update, or_
from src.cards.models import Card, Group, GroupCard
from src.invitecode.models import InviteCode
from src.tasks.models import Task
from src.users.models import User, UserCard, UserInviteCode, UserRef, UserTask, UserGroup
from random import random

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
        friends = await session.scalars(select(User.username, User.registered_at, UserRef.bonus, UserRef.exp, UserRef.card_id).join(UserRef, onclause=and_(UserRef.referrer_id == User.id)).where(UserRef.referrer_id == user_id))

        return list(friends)


async def get_user_cards(user_id):
    async with async_session() as session:
        results = await session.execute(select(Card, UserCard.amount).join(UserCard).where(UserCard.user_id == user_id))

        return results.all()


async def search_cards(query, minprice, maxprice, offset, limit) -> List[Card]:
    async with async_session() as session:
        stmt = select(Card).outerjoin(GroupCard, Card.id == GroupCard.card_id).outerjoin(Group, GroupCard.group_id == Group.id)

        # Создание списка условий для фильтрации
        conditions = [or_(Group.is_active == True, GroupCard.group_id == None)]

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

async def get_user_card(user_id, card_id) -> UserCard:
    async with async_session() as session:
        card = await session.scalars(select(UserCard).where(UserCard.user_id == user_id, UserCard.card_id == card_id))

        return card
    
async def get_user_received_group(user_id, group_id) -> UserCard:
    async with async_session() as session:
        group = await session.scalars(select(UserGroup).where(UserGroup.user_id == user_id, UserGroup.group_id == group_id))

        return group


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
    
async def set_user_received_group(user_id, group_id):
    async with async_session() as session:
        usergroup = UserGroup(user_id=user_id, group_id = group_id)
        session.add(usergroup)

        await session.commit()
        await session.refresh(usergroup)

        data = usergroup.group.__dict__
        await user_receive_bonuses(user_id=user_id, **data)

        return usergroup


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
    
async def create_card(title, **kwargs):
    async with async_session() as session:
        card = Card(title = title, **kwargs)
        session.add(card)

        await session.commit()
        await session.refresh(card)

        return card
    
async def get_random_card_id():
    async with async_session() as session:
        result = await session.execute(select(func.sum(Card.chance).label('total_percentage')))
        target = random() * result.one()[0]

        cumulative_subquery = (
            select(
                Card.id,
                Card.title,
                Card.chance,
                func.sum(Card.chance).over(order_by=Card.chance).label('cumulative_percentage')
            )
            .subquery()
        )

        # Основной запрос с фильтрацией по кумулятивному проценту
        query = (
            select(cumulative_subquery)
            .where(cumulative_subquery.c.cumulative_percentage >= target)
            .order_by(cumulative_subquery.c.chance)
            .limit(1)
        )

        # Выполняем запрос и получаем результат
        result = await session.execute(query)
        card_id = result.one()[0]

        return card_id
    

async def get_user_card_groups(user_id):
    async with async_session() as session:
        user = await get_user(user_id=user_id)
        friends = await get_user_friends(user_id=user_id)

        groups = await session.scalars(select(Group).where(Group.is_active == True, Group.min_level <= user.level, Group.min_friends_amount <= len(friends) ))

        response = []
        for group in groups.all():
            amount = await session.execute(select(func.count(GroupCard.card_id)).where(GroupCard.group_id == group.id))
            
            cards = await session.scalars(select(UserCard).join(GroupCard, onclause=and_(UserCard.card_id == GroupCard.card_id)).where(GroupCard.group_id == group.id, UserCard.user_id == user_id))
            response.append(dict(group = group, cards = cards, count = amount.fetchone()[0]))
    
    return response
