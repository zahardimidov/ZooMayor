from typing import List

from database.requests import (get_bonus_by_code, get_user_invite_codes,
                               set_user_invitecode)
from fastapi import APIRouter, HTTPException
from src.ext.dependencies import WebAppUser
from src.invitecode.models import InviteCode
from src.invitecode.schemas import (ReceiveBonusRequest, ReceivedBonusResponse,
                                    UserBonusesList)

router = APIRouter(prefix="/bonus", tags=['Инвайт коды'])


@router.post('/receive', response_model=ReceivedBonusResponse, description='Получить бонус за код')
async def receive_bonus(user: WebAppUser, data: ReceiveBonusRequest):
    bonus = await get_bonus_by_code(code=data.code)

    if not bonus:
        raise HTTPException(status_code=400, detail='Code not found')

    await set_user_invitecode(user_id=user.id, code=data.code)

    return ReceivedBonusResponse(bonus=bonus.bonus, exp=bonus.exp, card_id=bonus.card_id)


@router.post('/received', response_model=UserBonusesList, description='Список введенных ранее кодов')
async def received_bonuses(user: WebAppUser):
    bonuses: List[InviteCode] = await get_user_invite_codes(user_id=user.id)

    return UserBonusesList(bonuses=[{
        'code': b.code,
        'bonus': b.bonus,
        'exp': b.exp,
        'card_id': b.card_id
    } for b in bonuses])
