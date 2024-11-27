from pydantic import BaseModel, model_serializer
from config import DEFAULT_LANG
from src.ext.translate import translate

class ErrorResponse(BaseModel):
    detail: str

class DetailResponse(BaseModel):
    detail: str


class TranslatableResponse(BaseModel):
    def __repr__(self) -> str:
        return self.__str__()
    
    language: str = DEFAULT_LANG

    # _translate_fields - fields that should be translated

    @model_serializer
    def serialize(self):
        if self.language != DEFAULT_LANG and self._translate_fields:
            print(self)
            
            texts = [self.__dict__[field] for field in self._translate_fields]

            translates = translate(source=DEFAULT_LANG, target=self.language, texts=texts)
            for ind, field in enumerate(self._translate_fields):
                #TODO: save in cache
                self.__dict__[field] = translates[ind]
            print(translates)
                
        return self.__dict__

