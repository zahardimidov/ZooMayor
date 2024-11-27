from src.ext.responses import DetailResponse
from database.requests import get_all_user_tasks, set_user_task, get_task_by_id
from fastapi import APIRouter, HTTPException
from middlewares.webapp_user import webapp_user_middleware
from src.tasks.schemas import CompleteTask, Task, TaskList
from src.users.schemas import InitDataRequest, WebAppRequest

router = APIRouter(prefix="/tasks", tags=['Задания'])


@router.post('/all', response_model=TaskList, description='Получить список заданий')
@webapp_user_middleware
async def user_tasks(request: WebAppRequest, init_data: InitDataRequest):
    tasks = await get_all_user_tasks(user_id=request.webapp_user.id)

    response = []
    for task in tasks:
        d = dict(id=task[0].id, title=task[0].title, bonus=task[0].bonus,
                 exp=task[0].exp, card_id=task[0].card_id, complete=task[1], photo=None)
        response.append(Task(**d))

    return TaskList(tasks=response)


@router.post('/complete', response_model=DetailResponse, description='Выполнить задание')
@webapp_user_middleware
async def complete_task(request: WebAppRequest, data: CompleteTask):
    task = await get_task_by_id(task_id=data.task_id)

    if not task:
        raise HTTPException(status_code=404, detail='Task not found')

    await set_user_task(user_id=request.webapp_user.id, task_id=data.task_id)

    return DetailResponse(detail='Task was completed')
