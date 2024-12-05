import re
import uuid

from database.session import Base
from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.cards.models import Card


def generate_uuid():
    return str(uuid.uuid4())


def generate_code():
    code = generate_uuid().upper().replace("-", "")
    code = '-'.join(re.findall('.{4}', code[:16]))

    return code


class InviteCode(Base):
    __tablename__ = 'invitecode'

    code = mapped_column(String, default=generate_code, primary_key=True)

    bonus = mapped_column(Integer, default=0)
    exp = mapped_column(Integer, default=0)

    card_id = mapped_column(ForeignKey('cards.id'), nullable=True)
    card: Mapped['Card'] = relationship(lazy='subquery')

    def __str__(self) -> str:
        return self.code
