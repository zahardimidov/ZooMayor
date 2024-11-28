from src.ext.responses import DetailResponse
from database.requests import create_task, create_card
from fastapi import APIRouter
from src.admin.schemas import CreateTask, CreateTaskResponse, CreateCardResponse, CardBase

router = APIRouter(prefix="/admin/api", tags=['Админка'])


@router.post('/create_task', response_model=CreateTaskResponse)
async def create_task_handler(data: CreateTask):
    task = await create_task(**dict(data))

    return CreateTaskResponse(task_id=task.id, title=task.title, bonus=task.bonus, exp=task.exp)


@router.post('/create_card', response_model=CreateCardResponse)
async def create_card_handler(data: CardBase):
    card = await create_card(**dict(data))

    return CreateCardResponse(card_id=card.id, **dict(data))
