from datetime import datetime
from typing import List, Optional

from config import TEST_USER
from pydantic import BaseModel, Field
from src.users.models import UserLanguageEnum


class UserBase(BaseModel):
    id: int
    username: str
    lang: Optional[UserLanguageEnum] = Field(
        default=UserLanguageEnum.ru, validate_default=True
    )

    class Config:
        extra = 'ignore'
        json_encoders = {
            datetime: lambda v: v.strftime('%d/%m/%Y %H:%M:%S')
        }

class CreateTestUser(UserBase):
    id: int = TEST_USER['id']
    username: str = 'Guest'

class SwitchLangRequest(BaseModel):
    lang: UserLanguageEnum = Field(
        default=UserLanguageEnum.ru, validate_default=True
    )

class UserResponse(UserBase):
    level: int
    exp: int
    energy: int
    balance: int

    registered_at: datetime


class UserRefResponse(BaseModel):
    link: str

class UserSettingsResponse(BaseModel):
    lang: str
    vibration: bool
    dark_mode: bool


class FriendResponse(UserResponse):
    ...


class UserFriendsList(BaseModel):
    friends: List[UserResponse]


class BonusPerHour(BaseModel):
    bonus: int
