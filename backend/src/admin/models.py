from datetime import datetime
import enum
import uuid

from pydantic import BaseModel
from database.session import Base

from sqlalchemy import DateTime, ForeignKey, String, Boolean
from sqlalchemy.orm import mapped_column, relationship


def generate_uuid():
    return str(uuid.uuid4())


class Action(Base):
    __tablename__ = 'actions'

    id = mapped_column(String, default=generate_uuid, primary_key=True)
    date = mapped_column(DateTime, nullable=False)
    action = mapped_column(String, nullable=False)
    result = mapped_column(String, nullable=False)

    moderator_id = mapped_column(ForeignKey('moderators.id'), nullable=False)

class Permission(Base):
    __tablename__ = 'permissions'

    id = mapped_column(String, default=generate_uuid, primary_key=True)
    
    p_action_cards = mapped_column(Boolean, nullable=False)
    p_action_set_cards = mapped_column(Boolean, nullable=False)
    p_action_tasks = mapped_column(Boolean, nullable=False)
    p_action_bonuses = mapped_column(Boolean, nullable=False)
    p_action_users = mapped_column(Boolean, nullable=False)
    p_action_ref = mapped_column(Boolean, nullable=False)
    p_action_ref = mapped_column(Boolean, nullable=False)
    p_action_shop = mapped_column(Boolean, nullable=False)
    p_action_other = mapped_column(Boolean, nullable=False)

    moderator_id = mapped_column(ForeignKey('moderators.id'), nullable=False)


class Moderator(Base):
    __tablename__ = 'moderators'

    id = mapped_column(String, default=generate_uuid, primary_key=True)

    status = mapped_column(Boolean, nullable=False)
    last_login = mapped_column(DateTime, nullable=False)
    name = mapped_column(String, nullable=False)
    password = mapped_column(String, nullable=False)
    telegram_account = mapped_column(String, nullable=False)
    email = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)

    last_actions = relationship("Action", backref="moderator")
    permissions = relationship("Permissions", backref="moderator")
