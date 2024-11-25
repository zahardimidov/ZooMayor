import asyncio
import os
import logging

os.environ['ENGINE'] = 'sqlite+aiosqlite:///./database/testdb.db'

from fastapi.testclient import TestClient
from database.session import run_database
from run import app
import subprocess
import atexit

@atexit.register
def shutdown():
    subprocess.run(["redis-cli", "shutdown"])

client = TestClient(app)

httpx_logger = logging.getLogger("httpx")
httpx_logger.setLevel(logging.WARNING)

asyncio.new_event_loop().run_until_complete(run_database(reset=True))
subprocess.run(["redis-server", "--daemonize", "yes"])

def test_create_test_user():
    response = client.post('/users/create_test_user', json={'id': 7485502073, 'lang': 'en'})

    assert response.status_code == 200
    assert response.json()['detail'] == 'User was created'


def test_create_tasks():
    tasks = [
        dict(title = 'Task 5', exp = 500, bonus = 1500, position = 5),
        dict(title = 'Task 2', exp = 220, bonus = 220, position = 2),
        dict(title = 'Task 3', exp = 333, bonus = 350, position = 3),
        dict(title = 'Task 4', exp = 500, bonus = 1000, position = 4),
        dict(title = 'Task 1', exp = 150, bonus = 500, position = 1),
    ]
    for task in tasks:
        response = client.post('/admin/api/create_task', json=task)

        assert response.status_code == 200
        assert response.json().get('task_id') is not None