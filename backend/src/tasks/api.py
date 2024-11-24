from fastapi import APIRouter
from src.users.schemas import WebAppRequest, InitDataRequest
from src.tasks.schemas import Task, TaskList
from database.requests import get_all_user_tasks
from middlewares.webapp_user import webapp_user_middleware

router = APIRouter(prefix="/tasks")


@router.post('/all', response_model=TaskList)
@webapp_user_middleware
async def user_tasks(request: WebAppRequest, init_data: InitDataRequest):
    tasks = await get_all_user_tasks(user_id=request.webapp_user.id)

    response = []
    for task in tasks:
        d = dict(title=task[0].title, bonus=task[0].bonus, exp = task[0].exp, card_id = task[0].card_id, complete = task[1], photo = None)
        print(d)

        response.append(Task(**d))
        

    return TaskList(tasks=response)