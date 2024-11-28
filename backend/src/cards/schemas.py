from typing import List

from fastapi import HTTPException
from pydantic import BaseModel, field_validator
from src.ext.responses import TranslatableResponse

class CardResponse(TranslatableResponse):
    id: str
    title: str
    photo: str | None = None
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


class BuyCardRequest(BaseModel):
    card_id: str


class UserCardResponse(BaseModel):
    card_id: str
    amount: int
    type: str


class UserCardList(BaseModel):
    cards: List[UserCardResponse]


class GameResponse(BaseModel):
    game_id: str


class ReceiveGameCard(BaseModel):
    game_id: str
    card_ind: int

    @field_validator("card_ind", mode='before')
    def validate_card_ind(cls, value: str):
        if not value in range(3):
            raise HTTPException(status_code=400, detail='Unsupported index')
        return value
