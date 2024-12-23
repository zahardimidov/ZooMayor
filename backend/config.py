import os
from pathlib import Path

from dotenv import load_dotenv

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
        return int(value) if value.isdigit() else value
    return default


LANGUAGES = dict(
    ru='russian',
    en='english',
    it='italian',
    es='spanish',
    de='german'
)

YANDEX_CLOUD_API_TOKEN = 'AQVN0GF6ohWdx2FEvw8z88sbtrlBTFgDMcgwX8Nn'
YANDEX_CLOUD_FOLDER_ID = 'b1g6i8ev5a8h6oisn607'

DEFAULT_LANG = "ru"

BASE_DIR = Path(__file__).parent.resolve()
CARD_PICTURES_DIR = str(BASE_DIR) + '/media/cards/'
DEV_MODE = boolean(env('DEVMODE', False))

TEST_MODE = not DEV_MODE
TEST_USER = {
    "id": 7485502073,
    "first_name": "Test",
    "last_name": "User",
    "username": "TestUser",
    "photo_url": "https://t.me/i/userpic/320/7biCnCzgbpgB0jxJOROndcn3W8rgTSN1LrXDJg8vZXo.svg"
}

PORT = env('PORT')
HOST = env('HOST', 'https://134c-178-47-140-82.ngrok-free.app')
BOT_TOKEN = env('BOT_TOKEN')
ENGINE = env('ENGINE', "sqlite+aiosqlite:///./database/database.db")
REDIS_HOST = env('REDIS_HOST', "localhost")

WEBAPP_URL = HOST
WEBHOOK_HOST = HOST
WEBHOOK_PATH = 'webhook'

ADMIN_USERNAME = 'admin'
ADMIN_PASSWORD = 'qwerty'
ADMIN_SECRET_KEY = "fdbb0dd1-a368-4689-bd71-5888f69b438e"
