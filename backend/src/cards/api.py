import json
import logging

from database.requests import (get_card_by_id, get_cardback_by_id, get_random_card_id,
                               get_user_card_groups, get_user_cardbacks, get_user_cards, get_user_cardback,
                               search_cards, set_user, set_user_card, set_user_cardback_card)
from fastapi import APIRouter, Depends, HTTPException, Query
from src.cards.schemas import (BuyCardRequest, CardGroup, CardGroups, UserCardBacksList, UserCardbackResponse,
                               CardResponse, GameResponse, ReceiveGameCard, SelectCardbackRequest,
                               SearchCardResponse, UserCardList,
                               UserCardResponse)
from src.ext.dependencies import WebAppUser, check_group_cards, use_energy
from src.ext.schemas import DetailResponse
from src.ext.translate import translate_response
from src.ext.utils import redis
from src.invitecode.models import generate_code

router = APIRouter(prefix="/cards", tags=['Карты'])


@router.get('/search', response_model=SearchCardResponse, description='Поиск карт в магазине')
@translate_response(translate_fields=['title', 'description'])
async def search(
    user: WebAppUser,
    query: str = Query(default=None),
    minprice: int = Query(default=None),
    maxprice: int = Query(default=None),
    offset: int = Query(default=0),
    limit: int = Query(default=10),
):
    cards = await search_cards(query=query, minprice=minprice, maxprice=maxprice, offset=offset, limit=limit)

    return SearchCardResponse(
        cards=[CardResponse(**card.__dict__, language=str(user.lang.name))
               for card in cards]
    )


@router.post('/game', response_model=GameResponse, description='Создать игру и получить ее id')
async def game(user: WebAppUser):
    need_energy = 10
    if user.energy < need_energy:
        raise HTTPException(
            status_code=400, detail='You do not have enough enery')

    game_cards = [await get_random_card_id() for _ in range(3)]
    await use_energy(user=user, amount=need_energy)

    game_id = "game_"+generate_code()

    await redis.set(game_id, json.dumps(game_cards), ex=300)

    return GameResponse(game_id=game_id)


@router.post('/receive_card', response_model=CardResponse, description='Выбрать карту из игры по индексу')
@translate_response(translate_fields=['title', 'description'])
async def receive_game_card(user: WebAppUser, data: ReceiveGameCard):
    json_game_cards = await redis.get(data.game_id)

    if not json_game_cards:
        raise HTTPException(status_code=400, detail='Game not found')

    game_cards = json.loads(json_game_cards)

    card = await get_card_by_id(game_cards[data.card_ind])

    if not card:
        raise HTTPException(status_code=400, detail='Card not found')

    await redis.delete(data.game_id)

    await set_user_card(user_id=user.id, card_id=card.id)

    return CardResponse(**card.__dict__)


@router.get('/get', response_model=CardResponse, description='Получить подробную информацию о карте')
@translate_response(translate_fields=['title', 'description'])
async def get_card(
    card_id: str = Query()
):
    card = await get_card_by_id(card_id=card_id)

    return CardResponse(**card.__dict__)


@router.post('/buy', response_model=DetailResponse, description='Купить карту')
async def buy_card(user: WebAppUser, data: BuyCardRequest):
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
@translate_response(translate_fields=['title', 'description'])
async def my(user: WebAppUser):
    cards = await get_user_cards(user_id=user.id)

    return UserCardList(
        cards=[UserCardResponse(
            amount=amount, card_id=card.id, type=card.type) for card, amount in cards]
    )


@router.post('/my_cardbacks', response_model=UserCardList, description='Список всех рубашек пользователя')
@translate_response(translate_fields=['title', 'description'])
async def my_cardbacks(user: WebAppUser):
    cardbacks = await get_user_cardbacks(user_id=user.id)

    return UserCardBacksList(
        cards=[UserCardbackResponse(cardback_id = back.id,  photo = back.photo) for back in cardbacks]
    )

@router.post('/buy_cardback', response_model=DetailResponse, description='Купить рубашку')
async def buy_card(user: WebAppUser, data: SelectCardbackRequest):
    back = await get_cardback_by_id(back_id=data.cardback_id)

    if not back:
        raise HTTPException(status_code=400, detail='Cardback not found')

    if user.balance >= back.price:
        await set_user(user_id=user.id, balance=user.balance - back.price)
        await set_user_cardback_card(user_id=user.id, cardback_id=back.id)
    else:
        raise HTTPException(
            status_code=400, detail="You could not buy this card")

    return DetailResponse(detail='Cardback was bought')



@router.post('/set_cardback', response_model=DetailResponse, description='Купить рубашку')
async def buy_card(user: WebAppUser, data: SelectCardbackRequest):
    back =  await get_user_cardback(user_id=user.id, cardback_id=data.cardback_id)

    if not back:
        raise HTTPException(status_code=400, detail='Cardback not found')
    
    for cardback in  await get_user_cardbacks(user_id=user.id):
        await set_user_cardback_card(user_id=user.id, cardback_id=cardback.cardback_id, selected=False)

    await set_user_cardback_card(user_id=user.id, cardback_id=data.cardback_id, selected=True)

    return DetailResponse(detail='Cardback was selected')


@router.get('/groups', response_model=CardGroups, description='Получить список сетов и открытых в них карт')
@translate_response(translate_fields=['title', 'description'])
async def my_groups(groups = Depends(check_group_cards)):
    return groups
