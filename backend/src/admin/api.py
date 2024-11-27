from src.ext.responses import DetailResponse
from database.requests import create_task
from fastapi import APIRouter
from src.admin.schemas import CreateTask, CreateTaskResponse

router = APIRouter(prefix="/admin/api")


@router.post('/create_task', response_model=CreateTaskResponse)
async def create_task_handler(data: CreateTask):
    task = await create_task(**dict(data))

    return CreateTaskResponse(task_id=task.id, title=task.title, bonus=task.bonus, exp=task.exp)
