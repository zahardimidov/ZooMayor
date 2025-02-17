from config import BASE_DIR, CARD_PICTURES_DIR
from database.requests import (create_card, create_cardback, create_task,
                               get_cardbacks, get_cities_cards,
                               get_citizens_cards)
from fastapi import APIRouter, Depends, File, Query, UploadFile
from src.admin.schemas import (CardBackBase, CardBackList, CardBase, CardList,
                               CreateCardbackResponse, CreateCardResponse,
                               CreateTask, CreateTaskResponse)
from src.ext.schemas import DetailResponse
from src.ext.utils import save_file

router = APIRouter(prefix="/admin", tags=['Админка'])


@router.post('/create_task', response_model=CreateTaskResponse)
async def create_task_handler(data: CreateTask):
    task = await create_task(**dict(data))

    return CreateTaskResponse(task_id=task.id, title=task.title, bonus=task.bonus, exp=task.exp)


@router.post('/create_card', response_model=CreateCardResponse)
async def create_card_handler(data: CardBase = Depends(), photo: UploadFile = File()):
    card = await create_card(**dict(data))

    content = await photo.read()
    await save_file(path=CARD_PICTURES_DIR + f'{card.id}.png', content=content)

    return CreateCardResponse(card_id=card.id, **dict(data))
  

@router.post('/create_cardback', response_model=CreateCardbackResponse)
async def create_card_handler(data: CardBackBase = Depends(), photo: UploadFile = File()):
    card = await create_cardback(**dict(data))

    content = await photo.read()
    await save_file(path=CARD_PICTURES_DIR + f'{card.id}.png', content=content)

    return CreateCardbackResponse(cardback_id=card.id, **dict(data))


@router.get('/cardbacks', response_model=CardBackList)
async def cardbacks(query: str = Query(default=None)):
    return dict(
        cardbacks=[carback.to_dict() for carback in await get_cardbacks(query=query)]
    )


@router.get('/cards/citizens', response_model=CardList)
async def cardbacks(query: str = Query(default=None)):
    return dict(
        cards=[carback.to_dict() for carback in await get_citizens_cards(query=query)]
    )


@router.get('/cards/cities', response_model=CardList)
async def cardbacks(query: str = Query(default=None)):
    return dict(
        cards=[carback.to_dict() for carback in await get_cities_cards(query=query)]
    )
