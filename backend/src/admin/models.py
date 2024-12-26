import uuid

from database.session import Base

from sqlalchemy import DateTime, String, Boolean, func
from sqlalchemy.orm import mapped_column


def generate_uuid():
    return str(uuid.uuid4())


class Action(Base):
    __tablename__ = 'actions'

    id = mapped_column(String, default=generate_uuid, primary_key=True)
    date = mapped_column(DateTime, nullable=False, server_default=func.now())
    action = mapped_column(String, nullable=False)
    result = mapped_column(String, nullable=False)

    moderator_id = mapped_column(String, nullable=False)


class Moderator(Base):
    __tablename__ = 'moderators'

    id = mapped_column(String, default=generate_uuid, primary_key=True)

    status = mapped_column(Boolean, nullable=False)
    last_login = mapped_column(DateTime, nullable=False, default=func.now())
    name = mapped_column(String, nullable=False)
    password = mapped_column(String, nullable=False)
    telegram_account = mapped_column(String, nullable=False)
    email = mapped_column(String, nullable=False)
    description = mapped_column(String, nullable=False)

    p_action_cards = mapped_column(Boolean, nullable=False)
    p_action_set_cards = mapped_column(Boolean, nullable=False)
    p_action_tasks = mapped_column(Boolean, nullable=False)
    p_action_bonuses = mapped_column(Boolean, nullable=False)
    p_action_users = mapped_column(Boolean, nullable=False)
    p_action_ref = mapped_column(Boolean, nullable=False)
    p_action_ref = mapped_column(Boolean, nullable=False)
    p_action_shop = mapped_column(Boolean, nullable=False)
    p_action_other = mapped_column(Boolean, nullable=False)
