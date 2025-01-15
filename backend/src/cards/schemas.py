from typing import List

from fastapi import HTTPException
from pydantic import BaseModel, computed_field, field_validator, ConfigDict, validator
from src.ext.schemas import TranslatableResponse

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
    
    @field_validator("photo", mode='before')
    def validate_photo(cls, v: str):
        return v.replace('/backend', '') if v else v


class SearchCardResponse(BaseModel):
    cards: List[CardResponse]


class BuyCardRequest(BaseModel):
    card_id: str


class SelectCardbackRequest(BaseModel):
    cardback_id: str


class UserCardResponse(BaseModel):
    model_config = ConfigDict(extra='ignore')

    card_id: str
    photo: str | None = None
    amount: int
    type: str | None = None


class UserCardList(BaseModel):
    cards: List[UserCardResponse]



class UserCardbackResponse(BaseModel):
    model_config = ConfigDict(extra='ignore')

    cardback_id: str
    photo: str | None = None

    @validator('photo', pre=True)
    def remove_backend(cls, v):
        return v.replace('/backend', '') if v else v
    
    @field_validator("photo", mode='before')
    def validate_card_ind(cls, v: str):
        return v.replace('/backend', '') if v else v



class UserCardBacksList(BaseModel):
    cards: List[UserCardbackResponse]


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


class CardGroup(BaseModel):
    model_config = ConfigDict(extra='ignore')

    id: str
    title: str
    description: str | None = None
    bonus: int
    exp: int
    bonus_per_hour: int | None
    
    cards_amount: int
    cards: List[UserCardResponse]

    @computed_field
    @property
    def bonus_received(self) -> bool:
        return len(self.cards) == self.cards_amount

class CardGroups(BaseModel):
    model_config = ConfigDict(extra='ignore')

    groups: List[CardGroup]