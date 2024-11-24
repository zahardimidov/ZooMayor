from pydantic import BaseModel
from typing import List

class Task(BaseModel):
    title: str
    photo: str | None

    bonus: int
    exp: int
    card_id: str | None

    complete: bool

class TaskList(BaseModel):
    tasks: List[Task]
