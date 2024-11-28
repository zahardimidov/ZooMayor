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


class CardBase(BaseModel):
    title: str
    bonus: int = 0
    exp: int = 0
    bonus_per_hour: int | None
    chance: float

    price: int
    description: str = ''
    type: str = 'citizen'

    note: str = ''
    section: str = 'culture'

    rating: int

class CreateCardResponse(BaseModel):
    card_id: str