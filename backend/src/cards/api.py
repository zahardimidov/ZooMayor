from src.ext.responses import DetailResponse
from database.requests import (get_card_by_id, get_user_cards, search_cards,
                               set_user, set_user_card, get_random_card_id)
from fastapi import APIRouter, HTTPException, Query, Response
from middlewares.webapp_user import webapp_user_middleware
from src.cards.schemas import (BuyCardRequest, CardResponse,
                               SearchCardResponse, UserCardList, GameResponse, ReceiveGameCard,
                               UserCardResponse)
from src.users.schemas import InitDataRequest, WebAppRequest
from src.ext.utils import async_redis
import json
from src.invitecode.models import generate_code

router = APIRouter(prefix="/cards", tags=['Карты'])


@router.get('/search', response_model=SearchCardResponse, description='Поиск карт в магазине')
async def search(
    query: str = Query(default=None),
    minprice: int = Query(default=None),
    maxprice: int = Query(default=None),
    offset: int = Query(default=0),
    limit: int = Query(default=10),
):
    cards = await search_cards(query=query, minprice=minprice, maxprice=maxprice, offset=offset, limit=limit)

    return SearchCardResponse(
        cards=[CardResponse(**card.__dict__) for card in cards]
    )


@router.post('/game', response_model=GameResponse, description='Создать игру и получить ее id')
@webapp_user_middleware
async def game(request: WebAppRequest, init_data: InitDataRequest):
    need_energy = 10
    if request.webapp_user.energy < need_energy:
        raise HTTPException(status_code=400, detail='You do not have enough enery')
    
    game_cards = [await get_random_card_id() for _ in range(3)]
    await set_user(user_id=request.webapp_user.id, energy = request.webapp_user.energy - need_energy)
    
    game_id = "game_"+generate_code()
    
    await async_redis.set(game_id, json.dumps(game_cards), ex=300)

    return GameResponse(game_id=game_id)

@router.post('/receive_card', response_model=CardResponse, description='Выбрать карту из игры по индексу')
@webapp_user_middleware
async def receive_game_card(request: WebAppRequest, data: ReceiveGameCard):
    json_game_cards = await async_redis.get(data.game_id)

    if not json_game_cards:
        raise HTTPException(status_code=400, detail='Game not found')
    
    game_cards = json.loads(json_game_cards)
    
    card = await get_card_by_id(game_cards[data.card_ind])

    if not card:
        raise HTTPException(status_code=400, detail='Card not found')
    
    await async_redis.delete(data.game_id)

    await set_user_card(user_id=request.webapp_user.id, card_id=card.id)

    return CardResponse(**card.__dict__)


@router.get('/get', response_model=CardResponse, description='Получить подробную информацию о карте')
async def get_card(
    card_id: str = Query()
):
    card = await get_card_by_id(card_id=card_id)

    return CardResponse(**card.__dict__)


@router.post('/buy', response_model=DetailResponse, description='Купить карту')
@webapp_user_middleware
async def buy_card(request: WebAppRequest, data: BuyCardRequest):
    user = request.webapp_user

    card = await get_card_by_id(card_id=data.card_id)

    if not card:
        raise HTTPException(status_code=400, detail='Card not found')

    if user.balance >= card.price:
        await set_user(user_id=user.id, balance=user.balance - card.price)
        await set_user_card(user_id=user.id, card_id=card.id)
    else:
        raise HTTPException(
            status_code=400, detail="You could not buy this card")

    return DetailResponse(detail='Card was bought')


@router.post('/my', response_model=UserCardList, description='Список всех карт пользователя')
@webapp_user_middleware
async def my(request: WebAppRequest, data: InitDataRequest):
    cards = await get_user_cards(user_id=request.webapp_user.id)

    return UserCardList(
        cards=[UserCardResponse(
            amount=amount, card_id=card.id, type=card.type) for card, amount in cards]
    )
