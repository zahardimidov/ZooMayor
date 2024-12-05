import os

os.environ['ENGINE'] = 'postgresql+asyncpg://test:test@test-postgres:5434/test'

from run import app
from fastapi.testclient import TestClient
from database.session import run_database, drop_all
import pytest
import subprocess
import atexit
import asyncio
import logging
import os

#@atexit.register
def shutdown():
    subprocess.run(["redis-cli", "shutdown"])


client = TestClient(app)

httpx_logger = logging.getLogger("httpx")
httpx_logger.setLevel(logging.WARNING)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

#asyncio.new_event_loop().run_until_complete(drop_all())
asyncio.new_event_loop().run_until_complete(run_database())
#subprocess.run(["redis-server", "--daemonize", "yes"])


def test_create_test_user():
    response = client.post('/users/create_test_user',
                           json={'id': 7485502073, 'lang': 'en'})
    
    logger.info(response.json()['detail'])
    print(response.json()['detail'])


    assert response.status_code == 200
    assert response.json()['detail'] == 'User was created'


INIT_DATA = 'query_id=AAHGZ6gsAAAAAMZnqCzWc5Fx&user=%7B%22id%22%3A749234118%2C%22first_name%22%3A%22Zahar%22%2C%22last_name%22%3A%22Dimidov%22%2C%22username%22%3A%22ZaharDimidov%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F7biCnCzgbpgB0jxJOROndcn3W8rgTSN1LrXDJg8vZXo.svg%22%7D&auth_date=1732775322&signature=dKd15KCubOujqhfmSSjpsRLzFW-VUICalrz66uJWdptCC8_ugBh9db1qcr0JglPIYEhfddJIhjvhI94GSWaJBQ&hash=7b5484c74e7c076dc06d0ca3e90221138fda89e923175f712f8ec57f6ba95daa'


@pytest.fixture
def token():
    response = client.post('/users/authInitData', json={'initData': INIT_DATA})
    assert response.status_code == 200

    return response.json()['access_token']


def test_create_tasks():
    tasks = [
        dict(title='Task 5', exp=500, bonus=1500, position=5),
        dict(title='Task 2', exp=220, bonus=220, position=2),
        dict(title='Task 3', exp=333, bonus=350, position=3),
        dict(title='Task 4', exp=500, bonus=1000, position=4),
        dict(title='Task 1', exp=150, bonus=500, position=1),
    ]
    for task in tasks:
        response = client.post('/admin/api/create_task', json=task)

        assert response.status_code == 200
        assert response.json().get('task_id') is not None


def test_create_cards():
    tasks = [
        dict(title='Президент', exp=300, bonus=2500, rating=80,
             bonus_per_hour=50, chance=5, price=000),
        dict(title='Майор', exp=500, bonus=1500, rating=60,
             bonus_per_hour=40, chance=10, price=4000),
        dict(title='Пожарник', exp=500, bonus=1000, rating=40,
             bonus_per_hour=15, chance=30, price=3000),
        dict(title='Учитель', exp=150, bonus=500, rating=30,
             bonus_per_hour=5, chance=25, price=2000),
        dict(title='Житель', exp=100, bonus=100, rating=20,
             bonus_per_hour=30, chance=50, price=1000),
    ]
    for task in tasks:
        response = client.post('/admin/api/create_card', json=task)

        print(response.json())

        assert response.status_code == 200
        assert response.json().get('card_id') is not None
