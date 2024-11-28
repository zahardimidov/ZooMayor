from base64 import b64encode

from config import DEFAULT_LANG
from pydantic import BaseModel, model_serializer
from src.ext.translate import translate
from src.ext.utils import sync_redis

import logging

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
            for field in self._translate_fields:
                text: str = self.__dict__[field]

                encoded_str = b64encode(text.encode('utf-8')).decode('utf-8')

                key = self.language + '_' + encoded_str

                value: bytes = sync_redis.get(key)
                if not value:
                    translates = translate(
                        source=DEFAULT_LANG, target=self.language, texts=[text])
                    self.__dict__[field] = translates[0]
                    sync_redis.set(key, translates[0].title(), ex=60 * 60)
                else:
                    translated_text = value.decode().title()
                    logging.info(f'Translate from cache: {translated_text}')
                    self.__dict__[field] = translated_text

        return self.__dict__
