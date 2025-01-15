import enum
import uuid

from config import CARD_PICTURES_DIR
from database.session import Base
from sqlalchemy import Enum, Float, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import mapped_column, Mapped, relationship
from fastapi_storages import FileSystemStorage
from fastapi_storages.integrations.sqlalchemy import FileType

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

    price = mapped_column(Integer, nullable=False)

    description = mapped_column(String)
    type = mapped_column(Enum(CardTypeEnum), nullable=False)

    note = mapped_column(String)
    section = mapped_column(Enum(CardSectionEnum), nullable=False)

    rating = mapped_column(Integer, nullable=False)
    photo = mapped_column(FileType(storage=FileSystemStorage(path=CARD_PICTURES_DIR)), nullable=True)

    def __repr__(self) -> str:
        return f'{self.title} ({self.id})'
    

class CardBack(Base):
    __tablename__ = 'cardbacks'

    id = mapped_column(String, default=generate_uuid, primary_key=True)

    title = mapped_column(String, nullable=False)
    bonus = mapped_column(Integer, nullable=False)
    exp = mapped_column(Integer, nullable=True)
    price = mapped_column(Integer, nullable=False)

    description = mapped_column(String)

    note = mapped_column(String)

    min_friends_amount = mapped_column(Integer, default=0)
    min_level = mapped_column(Integer, default=0)

    rating = mapped_column(Integer, nullable=False)
    photo = mapped_column(FileType(storage=FileSystemStorage(path=CARD_PICTURES_DIR)), nullable=True)

    def __repr__(self) -> str:
        return f'{self.title} ({self.id})'


class Group(Base):
    __tablename__ = 'groups'

    id = mapped_column(String, default=generate_uuid, primary_key=True)

    title = mapped_column(String)
    description = mapped_column(String)
    type = mapped_column(Enum(CardTypeEnum), nullable=False)

    bonus = mapped_column(Integer, default=0)
    bonus_per_hour = mapped_column(Integer, default=0)
    exp = mapped_column(Integer, default=0)

    min_friends_amount = mapped_column(Integer, default=0)
    min_level = mapped_column(Integer, default=0)

    is_active = mapped_column(Boolean, default=True)

    def __str__(self) -> str:
        return self.title


class GroupCard(Base):
    __tablename__ = 'groupcard'

    group_id = mapped_column(ForeignKey(
        'groups.id', ondelete='CASCADE'), primary_key=True)
    group: Mapped['Group'] = relationship(lazy='subquery')

    card_id = mapped_column(ForeignKey(
        'cards.id', ondelete='CASCADE'), primary_key=True)
    card: Mapped['Card'] = relationship(lazy='subquery')

    amount = mapped_column(Integer, default=1)
    
    def __str__(self) -> str:
        return self.group.title + ' - ' + self.card.title