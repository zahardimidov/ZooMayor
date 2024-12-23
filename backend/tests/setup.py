import asyncio
import atexit
import logging
import os
import subprocess
from pathlib import Path
from time import sleep

from dotenv import load_dotenv
from fastapi.testclient import TestClient

BASE_DIR = Path(__file__).parent.parent.parent.resolve()
ENV_FILE = BASE_DIR.joinpath('.localenv')

load_dotenv(ENV_FILE)

os.environ['ENGINE'] = 'test:test@localhost:5432/test'

httpx_logger = logging.getLogger("httpx")
httpx_logger.setLevel(logging.WARNING)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DOCKER_COMPOSE_FILE = BASE_DIR.joinpath('backend/tests/docker-compose.yml')

@atexit.register
def shutdown():
    subprocess.run(
        f'docker compose -f {DOCKER_COMPOSE_FILE} --env-file {ENV_FILE} down'.split())

subprocess.run(
    f"docker compose -f {DOCKER_COMPOSE_FILE} --env-file {ENV_FILE} up --build -d".split())
sleep(5)


def setup_client():
    from run import app, run_database, text_query

    client = TestClient(app)

    loop = asyncio.new_event_loop()
    loop.run_until_complete(run_database(reset=True))
    loop.run_until_complete(text_query(
        '''
    INSERT INTO users (id, username, lang) VALUES
    (7485502073, 'TestUser', 'ru'),
    (7485502070, 'TestUser0', 'ru'),
    (7485502071, 'TestUser1', 'ru'),
    (7485502072, 'TestUser2', 'ru');
    '''
    ))

    loop.run_until_complete(text_query(
        '''
    INSERT INTO cards (id, title, bonus, exp, bonus_per_hour, chance, price, rating, type, section) VALUES
    ('1', 'Президент', 1000, 500, 50, 30, 3000, 60, 'citizen', 'culture'),
    ('2', 'Майор', 1000, 500, 50, 30, 3000, 60, 'citizen', 'culture'),
    ('3', 'Пожарник', 1000, 500, 50, 30, 3000, 60, 'citizen', 'culture'),
    ('4', 'Учитель', 1000, 500, 50, 30, 3000, 60, 'citizen', 'culture'),
    ('5', 'Житель', 1000, 500, 50, 30, 3000, 60, 'citizen', 'culture');
    '''
    ))


    loop.run_until_complete(text_query(
        '''
    INSERT INTO tasks (id, title, bonus, exp, position) VALUES
    ('1', 'Task 5', 500, 1500, 5),
    ('2', 'Task 2', 220, 220, 2),
    ('3', 'Task 3', 333, 350, 3),
    ('4', 'Task 4', 500, 1000, 4),
    ('5', 'Task 1', 150, 500, 1);
    '''
    ))

    return client

client = setup_client()
