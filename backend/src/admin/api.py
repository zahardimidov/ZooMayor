from fastapi.responses import JSONResponse
from config import BASE_DIR, CARD_PICTURES_DIR
from database.requests import (create_card, create_cardback, create_task,
                               get_cardbacks, get_cards_opened_last_24h, get_cities_cards,
                               get_citizens_cards, get_total_users_count, get_users_registered_last_24h, login_moderator)
from fastapi import APIRouter, Depends, File, Query, UploadFile
from src.admin.schemas import (CardBackBase, CardBackList, CardBase, CardList,
                               CreateCardbackResponse, CreateCardResponse,
                               CreateTask, CreateTaskResponse, SignInRequest, TotalStatisticsResponse)
# from src.ext.schemas import DetailResponse
from src.ext.utils import save_file
from .jwt import jwt_tools

router = APIRouter(prefix="/admin", tags=['Админка'])


@router.post('/create_task', response_model=CreateTaskResponse)
async def create_task_handler(data: CreateTask, current_user=Depends(jwt_tools.get_current_user)):
    task = await create_task(**dict(data))

    return CreateTaskResponse(task_id=task.id, title=task.title, bonus=task.bonus, exp=task.exp)


@router.post('/create_card', response_model=CreateCardResponse)
async def create_card_handler(data: CardBase = Depends(), photo: UploadFile = File(), current_user=Depends(jwt_tools.get_current_user)):
    card = await create_card(**dict(data))

    content = await photo.read()
    await save_file(path=CARD_PICTURES_DIR + f'{card.id}.png', content=content)

    return CreateCardResponse(card_id=card.id, **dict(data))


@router.post('/create_cardback', response_model=CreateCardbackResponse)
async def create_card_handler(data: CardBackBase = Depends(), photo: UploadFile = File(), current_user=Depends(jwt_tools.get_current_user)):
    card = await create_cardback(**dict(data))

    content = await photo.read()
    await save_file(path=CARD_PICTURES_DIR + f'{card.id}.png', content=content)

    return CreateCardbackResponse(cardback_id=card.id, **dict(data))


@router.get('/cardbacks', response_model=CardBackList)
async def cardbacks(query: str = Query(default=None), current_user=Depends(jwt_tools.get_current_user)):
    return dict(
        cardbacks=[carback.to_dict() for carback in await get_cardbacks(query=query)]
    )


@router.get('/cards/citizens', response_model=CardList)
async def cardbacks(query: str = Query(default=None), current_user=Depends(jwt_tools.get_current_user)):
    return dict(
        cards=[carback.to_dict() for carback in await get_citizens_cards(query=query)]
    )


@router.get('/cards/cities', response_model=CardList)
async def cardbacks(query: str = Query(default=None), current_user=Depends(jwt_tools.get_current_user)):
    return dict(
        cards=[carback.to_dict() for carback in await get_cities_cards(query=query)]
    )

# ___________________________ s1rne's code ___________________________


@router.get('/statistics/total', response_model=TotalStatisticsResponse)
async def total_statistics(current_user=Depends(jwt_tools.get_current_user)):
    # Получить статистику (общее количество пользователей, количество новых пользователей за последние 24 часа, количество открытых карт за последние 24 часа)
    return dict(
        total_users=await get_total_users_count(),
        new_users_last_24h=await get_users_registered_last_24h(),
        # TODO: get from db
        cards_opened_last_24h=await get_cards_opened_last_24h(),
    )


@router.post('/auth/login')
async def login_admin(request: SignInRequest):
    user = await login_moderator(request.login, request.password)
    if user:
        token = jwt_tools.encode(
            user.name,
            str(user.id)
        )
        print(token)

        return JSONResponse(
            status_code=200,
            content={"token": token},
            headers={"Authorization": f"Bearer {token}"}
        )
    print('Invalid credentials')
    return JSONResponse(status_code=200, content={'error': 'Invalid credentials'}, headers={'Authorization': ''})


@router.get('/me')
async def me(current_user=Depends(jwt_tools.get_current_user)):
    print(current_user)
    return JSONResponse(status_code=200, content={'name': current_user.name})
