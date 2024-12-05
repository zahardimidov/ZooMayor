from functools import wraps

from aiohttp import ClientSession
from config import (DEFAULT_LANG, LANGUAGES, YANDEX_CLOUD_API_TOKEN,
                    YANDEX_CLOUD_FOLDER_ID)
from pydantic import BaseModel
from base64 import b64encode
from src.ext.utils import async_redis


async def translate(target, texts: list[str]):
    if target == DEFAULT_LANG:
        print('skip translate')
        return texts

    translates = [0]*len(texts)
    require_translation = []

    for ind, text in enumerate(texts):
        if not text:
            translates[ind] = ''
            continue
        encoded_str = b64encode(text.encode('utf-8')).decode('utf-8')
        key = target + '_' + encoded_str

        value: bytes = await async_redis.get(key)
        if value:
            translates[ind] = value.decode().title()
        else:
            require_translation.append(text)

    if require_translation:
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Api-Key {0}".format(YANDEX_CLOUD_API_TOKEN)
        }

        body = {
            "targetLanguageCode": target,
            "texts": require_translation,
            "folderId": YANDEX_CLOUD_FOLDER_ID,
        }

        async with ClientSession() as session:
            response = await session.post('https://translate.api.cloud.yandex.net/translate/v2/translate', json=body, headers=headers)
            data: list = [i['text'] for i in (await response.json()).get('translations')]

        for ind in range(len(translates)):
            if translates[ind] == 0:
                translates[ind] = data.pop(0)

    return translates


async def iter_data(data, key=None, language=None, translate_fields=[]):
    if isinstance(data, dict):
        new_data = {}
        language = data.get('language') or language
        for key, value in data.items():
            new_data[key] = await iter_data(value, key=key, language=language, translate_fields=translate_fields)
        return new_data
    elif isinstance(data, list):
        new_list = []
        for i in data:
            new_list.append(await iter_data(i, language=language, translate_fields=translate_fields))
        return new_list
    elif isinstance(data, BaseModel):
        new_data = {}
        language = data.__dict__.get('language') or language
        for key, value in data.__dict__.items():
            new_data[key] = await iter_data(value, key=key, language=language, translate_fields=translate_fields)
        return new_data
    elif isinstance(data, str) and key in translate_fields:
        return (await translate(target=language, texts=[data]))[0]
    else:
        return data


def translate_response(translate_fields: list):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            response = await func(*args, **kwargs)

            return await iter_data(response.__dict__, translate_fields=translate_fields)
        return wrapper
    return decorator
