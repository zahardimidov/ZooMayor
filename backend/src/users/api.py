from aiogram import Bot
from aiogram.utils.deep_linking import create_start_link
from common import DetailResponse
from config import BOT_TOKEN, TEST_MODE
from database.requests import get_user, set_user, get_user_friends
from fastapi import APIRouter, HTTPException
from middlewares.webapp_user import webapp_user_middleware
from src.users.schemas import *

router = APIRouter(prefix="/users", tags=['Пользователь'])

if TEST_MODE:
    @router.post('/create_test_user')
    async def create_test_user(data: CreateTestUser):
        if await get_user(user_id=data.id):
            raise HTTPException(status_code=400, detail='User already exists')
        await set_user(user_id=data.id, lang=data.lang)

        return DetailResponse(detail='User was created')


@router.post('/me', response_model=UserResponse)
@webapp_user_middleware
async def get_me(request: WebAppRequest, init_data: InitDataRequest):
    user = request.webapp_user

    return user


@router.post('/me/ref', response_model=UserRefResponse)
@webapp_user_middleware
async def get_ref_link(request: WebAppRequest, initData: InitDataRequest):
    link = await create_start_link(Bot(BOT_TOKEN), str(request.webapp_user.id), encode=True)

    return UserRefResponse(link=link)

@router.post('/me/friends', response_model=UserRefResponse)
@webapp_user_middleware
async def get_friends(request: WebAppRequest, initData: InitDataRequest):
    friends = await get_user_friends(user_id=request.webapp_user.id)

    return UserFriendsList(friends=friends)


@router.post('/me/settings', response_model=UserSettingsResponse)
@webapp_user_middleware
async def get_me_settings(request: WebAppRequest, init_data: InitDataRequest):
    user = request.webapp_user

    return dict(
        lang=user.lang.name,
        vibration=user.vibration,
        dark_mode=user.dark_mode
    )


@router.post('/me/settings/switch-lang')
@webapp_user_middleware
async def switch_lang(request: WebAppRequest, data: SwitchLangRequest):
    user = request.webapp_user

    await set_user(user_id=user.id, lang=data.lang)

    return DetailResponse(detail=f'Language was changed to {data.lang}')


@router.post('/me/settings/switch-mode')
@webapp_user_middleware
async def switch_mode(request: WebAppRequest, init_data: InitDataRequest):
    user = request.webapp_user

    await set_user(user_id=user.id, dark_mode=not user.dark_mode)

    return DetailResponse(detail=f"Dark mode was {'disabled' if user.dark_mode else 'enabled'}")


@router.post('/me/settings/switch-vibration')
@webapp_user_middleware
async def switch_vibration(request: WebAppRequest, init_data: InitDataRequest):
    user = request.webapp_user

    await set_user(user_id=user.id, vibration=not user.vibration)

    return DetailResponse(detail=f"Vibration mode was {'disabled' if user.vibration else 'enabled'}")
