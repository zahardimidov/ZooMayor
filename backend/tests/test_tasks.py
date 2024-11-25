import logging

from test_client import client

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def test_all_tasks():
    response = client.post('/tasks/all', json={'initData': '{}'})

    assert response.status_code == 200
    assert len(response.json()['tasks']) > 0

def test_complete_task():
    ind = 2

    ### Get current resources
    response = client.post('/users/me', json={'initData': '{}'})
    assert response.status_code == 200
    user_data = response.json()
    logging.info(f'{user_data=}')

    ### Get Tasks List
    response = client.post('/tasks/all', json={'initData': '{}'})
    assert response.status_code == 200
    tasks = response.json()['tasks']
    assert len(tasks) > ind

    ### Complete Task
    task_id = tasks[ind]['id']
    response = client.post('/tasks/complete', json={'initData': '{}', 'task_id': task_id})
    assert response.status_code == 200
    assert response.json()['detail'] == 'Task was completed'

    ### Try complete again
    response = client.post('/tasks/complete', json={'initData': '{}', 'task_id': task_id})
    assert response.status_code == 400
    assert response.json()['detail'] == 'You could not complete this task right now'

    ### Check increased resources
    response = client.post('/users/me', json={'initData': '{}'})
    assert response.status_code == 200
    user_new_data = response.json()
    assert user_new_data['exp'] == user_data['exp'] + tasks[ind]['exp']
    assert user_new_data['balance'] == user_data['balance'] + tasks[ind]['bonus']

    logging.info(f'{user_new_data=}')

    ### Log results
    response = client.post('/tasks/all', json={'initData': '{}'})
    for task in response.json()['tasks']:
        logging.info(task)


def test_complete_incorrect_task():
    response = client.post('/tasks/complete', json={'initData': '{}', 'task_id': 'not id'})
    assert response.status_code == 404
    assert response.json()['detail'] == 'Task not found'
