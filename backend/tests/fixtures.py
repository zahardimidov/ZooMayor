import asyncio
import atexit
import logging
import os
from pathlib import Path
from time import sleep

import docker
import pytest
from docker.models.containers import Container
from dotenv import load_dotenv
from fastapi.testclient import TestClient

BASE_DIR = Path(__file__).parent.parent.parent.resolve()


httpx_logger = logging.getLogger("httpx")
httpx_logger.setLevel(logging.WARNING)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

POSTGRES_DB = 'test'
POSTGRES_USER = 'test'
POSTGRES_PASSWORD = 'test'
PGPORT = 5432


class Setup:
    cl = None

    @staticmethod
    def env():
        ENV_FILE = BASE_DIR.joinpath('.localenv')
        load_dotenv(ENV_FILE)

        os.environ['ENGINE'] = f'{POSTGRES_USER}:{POSTGRES_PASSWORD}@localhost:{PGPORT}/{POSTGRES_DB}'

    @staticmethod
    def docker():
        client = docker.from_env()
        pg_container: Container = client.containers.run(
            image="postgres:13.3-alpine",
            auto_remove=True,
            environment=dict(
                POSTGRES_DB=POSTGRES_DB,
                POSTGRES_USER=POSTGRES_USER,
                POSTGRES_PASSWORD=POSTGRES_PASSWORD,
                PGPORT=PGPORT
            ),
            name="test_postgres",
            ports={"5432/tcp": ("127.0.0.1", PGPORT)},
            detach=True,
            remove=True,
        )

        redis_container: Container = client.containers.run(
            image="redis:latest",
            restart_policy='unless-stopped',
            name="test_redis",
            ports={"6379": ("127.0.0.1", '6379')},
        )

        atexit.register(lambda: container.stop()
                        for container in (pg_container, redis_container))
        
        sleep(5)

    @staticmethod
    def testclient():
        from run import app, run_database, text_query

        client = TestClient(app)

        loop = asyncio.new_event_loop()
        loop.run_until_complete(run_database(reset=True))

        default_user_data = "1, 0, 100, 0, 'ru', true, true"

        loop.run_until_complete(text_query(
            f'''
        INSERT INTO users (id, username, level, exp, energy, balance, lang, vibration, dark_mode) VALUES
        (749234118, 'ZaharDimidov', {default_user_data}),
        (7485502073, 'TestUser', {default_user_data}),
        (7485502070, 'TestUser0', {default_user_data}),
        (7485502071, 'TestUser1', {default_user_data}),
        (7485502072, 'TestUser2', {default_user_data});
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
        Setup.cl = client


#client = Setup.client()
print(Setup.cl)