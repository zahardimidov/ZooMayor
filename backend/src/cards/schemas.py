from typing import List

from pydantic import BaseModel
from src.users.schemas import InitDataRequest
from responses import TranslatableResponse


class CardResponse(TranslatableResponse):
    id: str
    title: str
    bonus: int
    exp: int
    bonus_per_hour: int | None

    price: int
    description: str | None
    type: str
    section: str
    rating: int

    _translate_fields = ['title', 'description']


class SearchCardResponse(BaseModel):
    cards: List[CardResponse]


class BuyCardRequest(InitDataRequest):
    card_id: str


class UserCardResponse(BaseModel):
    card_id: str
    amount: int
    type: str


class UserCardList(BaseModel):
    cards: List[UserCardResponse]
