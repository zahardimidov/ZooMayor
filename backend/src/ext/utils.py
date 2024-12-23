from redis.asyncio import from_url
import aiofiles

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

    

