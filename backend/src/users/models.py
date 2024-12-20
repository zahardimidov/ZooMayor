import enum
from datetime import datetime, timezone, date
from typing import Any, Dict

from database.session import Base
from sqlalchemy import (BigInteger, Boolean, DateTime, Enum, ForeignKey,
                        Integer, String)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.ext.hybrid import hybrid_property
from src.cards.models import Card, Group
from src.invitecode.models import InviteCode
from src.tasks.models import Task


class UserLanguageEnum(enum.Enum):
    ru = 'russian'
    en = 'english'
    it = 'italian'
    es = 'spanish'
    de = 'german'


class User(Base):
    __tablename__ = 'users'

    id = mapped_column(BigInteger, nullable=False, primary_key=True)
    username = mapped_column(String(50), default="Guest")

    level = mapped_column(Integer, default=1)
    exp = mapped_column(Integer, default=0)
    energy = mapped_column(Integer, default=100)
    balance = mapped_column(Integer, default=0)

    lang = mapped_column(Enum(UserLanguageEnum), nullable=False)
    vibration = mapped_column(Boolean, default=True)
    dark_mode = mapped_column(Boolean, default=True)

    registered_at = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        # onupdate=lambda: datetime.now(timezone.utc)
    )
    energy_last_update = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc)
    )
    balance_last_update = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now().replace(minute=0, second=0)
    )

    @property
    def progress(self):
        return ''

    def __str__(self) -> str:
        return self.username


class UserRef(Base):
    __tablename__ = 'userref'

    referral_id = mapped_column(ForeignKey('users.id'), primary_key=True)
    referral: Mapped['User'] = relationship(
        'User',
        foreign_keys=[referral_id],
        backref='referrals',
        primaryjoin='UserRef.referral_id == User.id'
    )

    referrer_id = mapped_column(ForeignKey('users.id'), primary_key=True)
    referrer: Mapped['User'] = relationship(
        'User',
        foreign_keys=[referrer_id],
        backref='referrers',
        primaryjoin='UserRef.referrer_id == User.id'
    )

    bonus = mapped_column(Integer, default=0)
    exp = mapped_column(Integer, default=0)

    card_id = mapped_column(ForeignKey('cards.id'), nullable=True)
    card: Mapped['Card'] = relationship(lazy='subquery')


class UserCard(Base):
    __tablename__ = 'usercard'

    user_id = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), primary_key=True)
    user: Mapped['User'] = relationship(lazy='subquery')

    card_id = mapped_column(ForeignKey(
        'cards.id', ondelete='CASCADE'), primary_key=True)
    card: Mapped['Card'] = relationship(lazy='subquery')

    amount = mapped_column(Integer, default=1)

    receive_time = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    @hybrid_property
    def type(self):
        return self.card.type

    def to_dict(self) -> Dict[str, Any]:
        data = super().to_dict()
        data.update(type = self.type)
        return data


class UserInviteCode(Base):
    __tablename__ = 'userbonus'

    user_id = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), primary_key=True)
    user: Mapped['User'] = relationship(lazy='subquery')

    invitecode_id = mapped_column(ForeignKey(
        'invitecode.code', ondelete='CASCADE'), primary_key=True)
    invitecode: Mapped['InviteCode'] = relationship(lazy='subquery')

    def __str__(self) -> str:
        return f'{self.user} - {self.invitecode}'


class UserTask(Base):
    __tablename__ = 'usertask'

    user_id = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), primary_key=True)
    user: Mapped['User'] = relationship(lazy='subquery')

    task_id = mapped_column(ForeignKey(
        'tasks.id', ondelete='CASCADE'), primary_key=True)
    task: Mapped['Task'] = relationship(lazy='subquery')

    created_at = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc))
    complete = mapped_column(Boolean, default=True)



class UserGroup(Base):
    __tablename__ = 'usergroup'

    user_id = mapped_column(ForeignKey(
        'users.id', ondelete='CASCADE'), primary_key=True)
    user: Mapped['User'] = relationship(lazy='subquery')

    group_id = mapped_column(ForeignKey(
        'groups.id', ondelete='CASCADE'), primary_key=True)
    group: Mapped['Group'] = relationship(lazy='subquery')
