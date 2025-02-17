from aiogram import Bot
from aiogram.utils.deep_linking import create_start_link
from config import BOT_TOKEN, TEST_MODE
from database.requests import *
from fastapi import APIRouter, HTTPException
from src.ext.dependencies import WebAppUser, get_bonus_per_hour
from src.ext.schemas import DetailResponse
from src.users.schemas import *

router = APIRouter(prefix="/users", tags=['Пользователь'])

if TEST_MODE:
    @router.post('/create_test_user', description='Создание пользователя (только для тестирования)')
    async def create_test_user(data: CreateTestUser):
        if await get_user(user_id=data.id):
            raise HTTPException(status_code=400, detail='User already exists')
        await set_user(user_id=data.id, username=data.username, lang=data.lang)

        return DetailResponse(detail='User was created')


@router.get('/bonus_per_hour', response_model=BonusPerHour, description='Получить доход в час пользователя')
async def get_ref_link(user: WebAppUser):
    res = await get_bonus_per_hour(user_id=user.id)

    return BonusPerHour(bonus=res)


@router.get('/me', response_model=UserResponse, description='Получить информацию о своем профиле')
async def get_me(user: WebAppUser):
    return user


@router.get('/me/ref', response_model=UserRefResponse, description='Получить реферальную ссылку')
async def get_ref_link(user: WebAppUser):
    link = await create_start_link(Bot(BOT_TOKEN), str(user.id), encode=True)

    return UserRefResponse(link=link)


@router.get('/me/friends', response_model=UserFriendsList, description='Получить список своих рефералов')
async def get_friends(user: WebAppUser):
    friends = await get_user_friends(user_id=user.id)

    return UserFriendsList(friends=friends)


@router.get('/me/settings', response_model=UserSettingsResponse, description='Получить свои текущие настройки')
async def get_me_settings(user: WebAppUser):
    return user.to_dict()


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
