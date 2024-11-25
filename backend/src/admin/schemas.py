from pydantic import BaseModel


class CreateTask(BaseModel):
    title: str = 'Задание'
    bonus: int = 1000
    exp: int = 500
    position: int = 1

class CreateTaskResponse(BaseModel):
    task_id: str
    title: str
    bonus: int
    exp: int