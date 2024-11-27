import os
from pathlib import Path

from dotenv import load_dotenv
from redis.asyncio import from_url

load_dotenv()


def boolean(value: str | bool | int):
    if isinstance(value, bool):
        return value
    value = str(value).lower()

    if value.isdigit():
        return False if value == "0" else True

    return {"false": False, "true": True}.get(value, bool(value))


def env(key, default=None):
    value = os.environ.get(key)
    if value:
        return value
    return default

LANGUAGES = dict(
    ru = 'russian',
    en = 'english',
    it = 'italian',
    es = 'spanish',
    de = 'german'
)

DEFAULT_LANG = "ru"

BASE_DIR = Path(__file__).parent.resolve()

CARD_PICTURES_DIR = BASE_DIR.joinpath('/media/cards/')

DEV_MODE = boolean(env('DEVMODE', False))

TEST_MODE = not DEV_MODE
TEST_USER_ID = 7485502073

PORT = 4550

HOST = env('HOST', 'https://2771-2a01-4f8-c012-3738-00-1.ngrok-free.app')
BOT_TOKEN = env('BOT_TOKEN', '7489777184:AAHk-tgEypNOTMa3gSW72c10FsgELmPH99o')
ENGINE = env('ENGINE', "sqlite+aiosqlite:///./database/database.db")
REDIS_HOST = env('REDIS_HOST', "localhost")

WEBAPP_URL = HOST
WEBHOOK_HOST = HOST
WEBHOOK_PATH = 'webhook'

ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'qwerty'

redis = from_url(f'redis://{REDIS_HOST}')