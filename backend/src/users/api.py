from aiogram import Bot
from aiogram.utils.deep_linking import create_start_link
from config import BOT_TOKEN, TEST_MODE
from database.requests import (get_all_user_tasks, get_user, get_user_cards,
                               get_user_friends, set_user)
from fastapi import APIRouter, HTTPException, Query
from src.cards.models import Card
from src.ext.dependencies import WebAppUser
from src.ext.jwt_token import create_jwt_token
from src.ext.responses import DetailResponse
from src.ext.validation import validate_qsl_init_data
from src.tasks.models import Task
from src.users.schemas import *

router = APIRouter(prefix="/users", tags=['Пользователь'])

if TEST_MODE:
    @router.post('/create_test_user', description='Создание пользователя (только для тестирования)')
    async def create_test_user(data: CreateTestUser):
        if await get_user(user_id=data.id):
            raise HTTPException(status_code=400, detail='User already exists')
        await set_user(user_id=data.id, username = data.username, lang=data.lang)

        return DetailResponse(detail='User was created')


@router.post('/authInitData', response_model=AuthInitDataResponse, description='Принимает window.Telegram.WebApp.initData и возвращает токен')
async def authInitData(data: InitDataRequest):
    print(f'{data.initData=}')
    user_data = validate_qsl_init_data(data.initData)

    if not user_data:
        raise HTTPException(
            status_code=400, detail='Invalid auth data provided')

    jwt_token = create_jwt_token({"initData": data.initData})
    return dict(access_token=jwt_token)


@router.get('/bonus_per_hour', response_model=BonusPerHour, description='Получить доход в час пользователя')
async def get_ref_link(user: WebAppUser):
    cards = await get_user_cards(user_id=user.id)

    res = 0
    for card, amount in cards:
        card: Card
        res += card.bonus_per_hour * amount

    tasks = await get_all_user_tasks(user_id=user.id)
    for usertask in tasks:
        ut: Task = usertask[0]
        if usertask[1] and ut.bonus_per_hour:
            res += ut.task.bonus_per_hour

    return BonusPerHour(bonus=res)


@router.get('/me', response_model=UserResponse, description='Получить информацию о своем профиле')
async def get_me(user: WebAppUser):
    return user


@router.get('/me/ref', response_model=UserRefResponse, description='Получить реферальную ссылку')
async def get_ref_link(user: WebAppUser):
    link = await create_start_link(Bot(BOT_TOKEN), str(user.id), encode=True)

    return UserRefResponse(link=link)


@router.get('/me/friends', response_model=UserRefResponse, description='Получить список своих рефералов')
async def get_friends(user: WebAppUser):
    friends = await get_user_friends(user_id=user.id)

    return UserFriendsList(friends=friends)


@router.get('/me/settings', response_model=UserSettingsResponse, description='Получить свои текущие настройки')
async def get_me_settings(user: WebAppUser):
    return dict(
        lang=user.lang.name,
        vibration=user.vibration,
        dark_mode=user.dark_mode
    )


@router.post('/me/settings/switch-lang', response_model=DetailResponse, description='Переключение языка')
async def switch_lang(data: SwitchLangRequest, user: WebAppUser):
    await set_user(user_id=user.id, lang=data.lang)

    return DetailResponse(detail=f'Language was changed to {data.lang}')


@router.post('/me/settings/switch-mode', response_model=DetailResponse, description='Переклюить тему')
async def switch_mode(user: WebAppUser):
    await set_user(user_id=user.id, dark_mode=not user.dark_mode)

    return DetailResponse(detail=f"Dark mode was {'disabled' if user.dark_mode else 'enabled'}")


@router.post('/me/settings/switch-vibration')
async def switch_vibration(user: WebAppUser):
    await set_user(user_id=user.id, vibration=not user.vibration)

    return DetailResponse(detail=f"Vibration mode was {'disabled' if user.vibration else 'enabled'}")
