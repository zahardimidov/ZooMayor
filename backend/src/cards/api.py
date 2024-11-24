from database.requests import get_card_by_id, search_cards, set_user, set_user_card, get_user_cards
from fastapi import APIRouter, Query, Response, HTTPException
from src.cards.schemas import CardResponse, SearchCardResponse, BuyCardRequest, UserCardResponse, UserCardList
from src.users.schemas import WebAppRequest
from src.users.schemas import InitDataRequest
from common import DetailResponse
from middlewares.webapp_user import webapp_user_middleware

router = APIRouter(prefix="/cards", tags=['Карты'])


@router.get('/search', response_model=SearchCardResponse)
async def search(
    query: str = Query(default=None),
    minprice: int = Query(default=None),
    maxprice: int = Query(default=None),
    offset: int = Query(default=0),
    limit: int = Query(default=10),
):
    cards = await search_cards(query=query, minprice=minprice, maxprice=maxprice, offset = offset, limit = limit)

    print(cards)

    return SearchCardResponse(
        cards=[CardResponse(**card.__dict__) for card in cards]
    )


@router.get('/get', response_model=CardResponse)
async def get_card(
    card_id: str = Query()
):
    card = await get_card_by_id(card_id=card_id)

    return card


@router.post('/buy', response_model=DetailResponse)
@webapp_user_middleware
async def buy_card(request: WebAppRequest, data: BuyCardRequest):
    user = request.webapp_user

    card = await get_card_by_id(card_id=data.card_id)

    if not card:
        raise HTTPException(status_code=400, detail='Card not found')
    
    if user.balance >= card.price:
        await set_user(user_id=user.id, balance = user.balance - card.price)
        await set_user_card(user_id=user.id, card_id=card.id)
    else:
        raise HTTPException(status_code=400, detail="You could not buy this card")

    return DetailResponse(detail='Card was bought')


@router.post('/my', response_model=UserCardList)
@webapp_user_middleware
async def my(request: WebAppRequest, data: InitDataRequest):
    cards = await get_user_cards(user_id=request.webapp_user.id)
    
    return UserCardList(
        cards=[UserCardResponse(amount=amount, card_id = card.id, type = card.type) for card, amount in cards]
    )
