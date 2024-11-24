import uuid

from database.session import Base
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.cards.models import Card

def generate_uuid():
    return str(uuid.uuid4())


class Task(Base):
    __tablename__ = 'tasks'

    id = mapped_column(String, default=generate_uuid, primary_key=True)
    title = mapped_column(String)
    url = mapped_column(String, nullable=True)
    timer = mapped_column(Integer, nullable=True)
    position = mapped_column(Integer, default=1)

    bonus = mapped_column(Integer, default=0)
    bonus_per_hour = mapped_column(Integer, default=0)
    exp = mapped_column(Integer, default=0)

    card_id = mapped_column(ForeignKey(
        'cards.id', ondelete='CASCADE'), nullable=True)
    card: Mapped['Card'] = relationship(lazy='subquery')

    def __str__(self) -> str:
        return self.title
    