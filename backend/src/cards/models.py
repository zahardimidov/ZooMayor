import enum
import uuid

from config import CARD_PICTURES_DIR
from database.session import Base
from sqlalchemy import Enum, Float, Integer, String
from sqlalchemy.orm import mapped_column


def generate_uuid():
    return str(uuid.uuid4())


class CardTypeEnum(enum.Enum):
    citizen = 'citizen'
    city = 'city'

class CardSectionEnum(enum.Enum):
    culture = 'culture'


class Card(Base):
    __tablename__ = 'cards'

    id = mapped_column(String, default=generate_uuid, primary_key=True)

    title = mapped_column(String, nullable=False)
    bonus = mapped_column(Integer, nullable=False)
    exp = mapped_column(Integer, nullable=True)
    bonus_per_hour = mapped_column(Integer, nullable=True)
    chance = mapped_column(Float, nullable=False)

    price = mapped_column(Integer, nullable=False) # !!! PRICE

    description = mapped_column(String)
    type = mapped_column(Enum(CardTypeEnum), nullable=False)

    note = mapped_column(String)
    section = mapped_column(Enum(CardSectionEnum), nullable=False)

    rating = mapped_column(Integer, nullable=False)

    @property
    def photo(self):
        return CARD_PICTURES_DIR.joinpath(f'{self.id}.png')
    
    def __repr__(self) -> str:
        return f'{self.title} ({self.id})'
