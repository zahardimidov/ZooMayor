from typing import Optional, List
from pydantic import BaseModel, ConfigDict, Field
from enum import Enum
from src.cards.models import CardTypeEnum, CardSectionEnum


class CreateTask(BaseModel):
    title: str = 'Задание'
    bonus: int = 1000
    exp: int = 500
    position: int = 1


class CreateTaskResponse(BaseModel):
    task_id: str
    title: str
    bonus: int
    exp: int


class CardBase(BaseModel):
    model_config = ConfigDict(use_enum_values=True)

    title: str
    bonus: int = 0
    exp: int = 0
    bonus_per_hour: int | None
    chance: float

    price: int
    description: str = ''
    type: Optional[CardTypeEnum] = Field(
        default=CardTypeEnum.citizen, validate_default=True
    )

    note: str = ''
    section: Optional[CardSectionEnum] = Field(
        default=CardSectionEnum.culture, validate_default=True
    )

    rating: int


class CreateCardResponse(CardBase):
    id: str
    photo: str = '/blue-card-back.png'


class CardBackBase(BaseModel):
    title: str
    price: int
    exp: int = 0
    bonus: int = 0
    min_level: int = 0
    min_friends_amount: int = 0
    rating: int
    description: str
    note: str


class CreateCardbackResponse(CardBackBase):
    id: str
    photo: str = '/blue-card-back.png'


class CardBackList(BaseModel):
    cardbacks: List[CreateCardbackResponse]

class CardList(BaseModel):
    cards: List[CreateCardResponse]
