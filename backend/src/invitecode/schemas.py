from typing import List

from pydantic import BaseModel


class ReceiveBonusRequest(BaseModel):
    code: str


class ReceivedBonusResponse(BaseModel):
    code: str
    bonus: int
    exp: int
    card_id: str | None


class UserBonusesList(BaseModel):
    bonuses: List[ReceivedBonusResponse]
