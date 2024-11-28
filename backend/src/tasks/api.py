from database.requests import get_all_user_tasks, get_task_by_id, set_user_task
from fastapi import APIRouter, HTTPException
from src.ext.dependencies import WebAppUser
from src.ext.responses import DetailResponse
from src.tasks.schemas import CompleteTask, Task, TaskList

router = APIRouter(prefix="/tasks", tags=['Задания'])


@router.get('/all', response_model=TaskList, description='Получить список заданий')
async def user_tasks(user: WebAppUser):
    tasks = await get_all_user_tasks(user_id=user.id)

    response = []
    for task in tasks:
        d = dict(id=task[0].id, title=task[0].title, bonus=task[0].bonus,
                 exp=task[0].exp, card_id=task[0].card_id, complete=task[1], photo=None)
        response.append(Task(**d))

    return TaskList(tasks=response)


@router.post('/complete', response_model=DetailResponse, description='Выполнить задание')
async def complete_task(data: CompleteTask, user: WebAppUser):
    task = await get_task_by_id(task_id=data.task_id)

    if not task:
        raise HTTPException(status_code=404, detail='Task not found')

    await set_user_task(user_id=user.id, task_id=data.task_id)

    return DetailResponse(detail='Task was completed')
