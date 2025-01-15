from pathlib import Path
from typing import Union

import aiofiles.os
from config import CARD_PICTURES_DIR
from fastapi import Request, Response
from redis.asyncio import from_url
from starlette.middleware.base import BaseHTTPMiddleware


async def save_file(path: str, content: bytes):
    async with aiofiles.open(path, 'wb') as file:
        await file.write(content)


class redis:
    @staticmethod
    async def set(key, value, ex):
        async with from_url('redis://localhost:6379') as async_redis:
            return await async_redis.set(key, value, ex=ex)

    async def get(key):
        async with from_url('redis://localhost:6379') as async_redis:
            return await async_redis.get(key)

    async def delete(key):
        async with from_url('redis://localhost:6379') as async_redis:
            return await async_redis.delete(key)


async def path_exists(path: Union[Path, str]) -> bool:
    try:
        await aiofiles.os.stat(str(path))
    except OSError as e:
        print(e)
        return False
    return True


class ImageCacheMiddleware(BaseHTTPMiddleware):
    def __init__(self, app):
        super().__init__(app)

    async def dispatch(self, request: Request, call_next):
        if request.url.path.startswith('/media/'):
            filename = request.url.path.split('/')[-1]

            if request.url.path.startswith('/media/cards'):
                path = CARD_PICTURES_DIR + filename

                if not await path_exists(path):
                    path = CARD_PICTURES_DIR + '/default.png'

            if not await path_exists(path):
                return Response(status_code=404)

            with open(path, 'rb') as file:
                image_bytes = file.read()

            response = Response(content=image_bytes,
                                media_type="image/png")
            return response
        else:
            return await call_next(request)
