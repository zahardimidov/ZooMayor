import json
from functools import wraps
from pathlib import Path
from typing import Union

import aiofiles.os
from src.ext.utils import async_redis
from redis.asyncio import from_url

def cache_decorator(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        key = func.__name__

        # Проверяем, есть ли кеш в Redis
        cached_value = await async_redis.get(key)
        if cached_value:
            print('From cache')
            return json.loads(cached_value)

        # Если кеша нет, вызываем функцию и обновляем кеш
        result = await func(*args, **kwargs)

        # Сохраняем результат в Redis с временем жизни 5 минут (300 секунд)
        # ex - время жизни в секундах
        await async_redis.set(key, json.dumps(result), ex=300)
        return result

    return wrapper