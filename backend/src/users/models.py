import enum
from datetime import datetime, timezone

from database.session import Base
from sqlalchemy import BigInteger, Boolean, Enum, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import mapped_column, Mapped, relationship
from src.cards.models import Card
from src.tasks.models import Task
from src.invitecode.models import InviteCode


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

    registered_at = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))

    @property
    def progress(self):
        return ''
    
    def __str__(self) -> str:
        return self.username


class UserRef(Base):
    __tablename__ = 'userref'
    
    referral_id = mapped_column(ForeignKey('users.id'), primary_key=True) # тот кого вы пригласили  
    referral: Mapped['User'] = relationship('User', foreign_keys=[referral_id], backref='referrals')

    referrer_id = mapped_column(ForeignKey('users.id'), primary_key=True)
    referrer: Mapped['User'] = relationship('User', foreign_keys=[referrer_id], backref='referrers') #тот, кто пригласил, называется реферером.

    bonus = mapped_column(Integer, default=0)
    exp = mapped_column(Integer, default=0)

    card_id = mapped_column(ForeignKey(
        'cards.id', ondelete='CASCADE'), nullable=True)
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

    created_at = mapped_column(DateTime, default=lambda: datetime.now(timezone.utc))
    complete = mapped_column(Boolean, default=True)
    