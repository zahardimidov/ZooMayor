from redis.asyncio import from_url
from redis import Redis
from config import REDIS_HOST

sync_redis = Redis(host=REDIS_HOST)
async_redis = from_url(f'redis://{REDIS_HOST}')