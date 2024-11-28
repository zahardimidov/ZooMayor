from typing import List

from pydantic import BaseModel


class Task(BaseModel):
    id: str
    title: str
    photo: str | None

    bonus: int
    exp: int
    card_id: str | None

    complete: bool


class TaskList(BaseModel):
    tasks: List[Task]


class CompleteTask(BaseModel):
    task_id: str
