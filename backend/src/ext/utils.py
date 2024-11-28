from config import REDIS_HOST
from redis import Redis
from redis.asyncio import from_url

sync_redis = Redis(host=REDIS_HOST)
async_redis = from_url(f'redis://{REDIS_HOST}')
