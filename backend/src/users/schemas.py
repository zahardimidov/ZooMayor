from datetime import datetime
from typing import List

from fastapi import HTTPException, Request
from pydantic import BaseModel, field_validator
from src.users.models import UserLanguageEnum


class CreateTestUser(BaseModel):
    id: int = 7485502073
    lang: str = "ru"

    @field_validator("lang", mode='before')
    def validate_lang(cls, value: str):
        if value not in UserLanguageEnum._member_names_:
            raise HTTPException(
                status_code=400, detail=f'Incorrect language. Available languages {UserLanguageEnum._member_names_}')
        return value


class User(BaseModel):
    id: int
    username: str

    level: int
    exp: int
    energy: int
    balance: int

    lang: str
    vibration: bool
    dark_mode: bool


class WebAppRequest(Request):
    def __init__(self, webapp_user, **kwargs):
        self.__dict__.update(kwargs)
        self.webapp_user: User = webapp_user


class InitDataRequest(BaseModel):
    initData: str = "{}"


class SwitchLangRequest(InitDataRequest):
    lang: str

    @field_validator("lang", mode='before')
    def validate_lang(cls, value: str):
        if value not in UserLanguageEnum._member_names_:
            raise HTTPException(
                status_code=400, detail=f'Incorrect language. Available languages {UserLanguageEnum._member_names_}')
        return value


class UserResponse(BaseModel):
    id: int
    username: str

    level: int
    exp: int
    energy: int
    balance: int


class UserRefResponse(BaseModel):
    link: str


class UserSettingsResponse(BaseModel):
    lang: str
    vibration: bool
    dark_mode: bool


class FriendResponse(BaseModel):
    username: str
    registered_at: datetime


class UserFriendsList(BaseModel):
    friends: List[UserResponse]


class BonusPerHour(BaseModel):
    bonus: int
