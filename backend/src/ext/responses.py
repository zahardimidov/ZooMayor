from config import DEFAULT_LANG
from pydantic import BaseModel

class ErrorResponse(BaseModel):
    detail: str


class DetailResponse(BaseModel):
    detail: str


class TranslatableResponse(BaseModel):
    def __repr__(self) -> str:
        return self.__str__()

    language: str = DEFAULT_LANG
