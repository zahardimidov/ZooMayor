from test_00_client import client, logger, token


def test_all_tasks(token):
    response = client.get(
        '/tasks/all', headers={"Authorization": f"Bearer {token}"})
    
    assert response.status_code == 200
    assert len(response.json()['tasks']) > 0


def test_complete_task(token):
    ind = 2

    # Get current resources
    response = client.get(
        '/users/me', headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    user_data = response.json()
    logger.info(f'{user_data=}')

    # Get Tasks List
    response = client.get(
        '/tasks/all', headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    tasks = response.json()['tasks']
    assert len(tasks) > ind

    # Complete Task
    task_id = tasks[ind]['id']
    response = client.post(
        '/tasks/complete', headers={"Authorization": f"Bearer {token}"}, json={'task_id': task_id})
    assert response.status_code == 200
    assert response.json()['detail'] == 'Task was completed'

    # Try complete again
    response = client.post(
        '/tasks/complete', headers={"Authorization": f"Bearer {token}"}, json={'task_id': task_id})
    assert response.status_code == 400
    assert response.json()[
        'detail'] == 'You could not complete this task right now'

    # Check increased resources
    response = client.get(
        '/users/me', headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    user_new_data = response.json()
    assert user_new_data['exp'] == user_data['exp'] + tasks[ind]['exp']
    assert user_new_data['balance'] == user_data['balance'] + \
        tasks[ind]['bonus']

    logger.info(f'{user_new_data=}')

    # Log results
    response = client.get(
        '/tasks/all', headers={"Authorization": f"Bearer {token}"})
    for task in response.json()['tasks']:
        logger.info(task)


def test_complete_incorrect_task(token):
    response = client.post(
        '/tasks/complete', headers={"Authorization": f"Bearer {token}"}, json={'task_id': 'not id'})
    assert response.status_code == 404
    assert response.json()['detail'] == 'Task not found'
