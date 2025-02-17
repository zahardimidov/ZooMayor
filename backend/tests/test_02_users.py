from test_00_client import client, token, logger


def test_create_test_user_invalid_lang():
    response = client.post('/users/create_test_user',
                           json={'id': 7485502079, 'lang': 'invalidlang'})

    assert response.status_code == 422


def test_dublicate_test_user():
    response = client.post('/users/create_test_user',
                           json={'id': 7485502073, 'lang': 'russian'})

    assert response.status_code == 400
    assert response.json()['detail'] == 'User already exists'


def test_create_second_test_user():
    response = client.post('/users/create_test_user', json={'id': 749234118, 'username': 'ZaharDimidov', 'lang': 'spanish'})

    assert response.status_code == 200
    assert response.json()['detail'] == 'User was created'


def test_get_me(token):
    response = client.get(
        '/users/me', headers={"Authorization": f"Bearer {token}"})
    
    logger.info(response.json())

    assert response.status_code == 200
    assert response.json()['username'] == 'ZaharDimidov'
    assert response.json()['id'] == 749234118


def test_settings(token):
    response = client.get('/users/me/settings',
                          headers={"Authorization": f"Bearer {token}"})

    data: dict = response.json()

    assert response.status_code == 200
    assert 'dark_mode' in data and 'lang' in data and 'vibration' in data


def test_lang_settings(token):
    response = client.get('/users/me/settings',
                          headers={"Authorization": f"Bearer {token}"})

    data: dict = response.json()

    assert response.status_code == 200
    assert data['lang'] == 'spanish'


def test_change_lang_settings(token):
    response = client.post('/users/me/settings/switch-lang',
                           headers={"Authorization": f"Bearer {token}"}, json={'lang': 'france'})

    data: dict = response.json()

    assert response.status_code == 422

    response = client.post('/users/me/settings/switch-lang',
                           headers={"Authorization": f"Bearer {token}"}, json={'lang': 'italian'})

    data: dict = response.json()

    assert response.status_code == 200
    assert 'Language was changed to' in data['detail']

    response = client.get('/users/me/settings',
                          headers={"Authorization": f"Bearer {token}"})

    data: dict = response.json()

    assert response.status_code == 200
    assert data['lang'] == 'italian'


def test_switch_mode(token):
    response = client.get('/users/me/settings',
                          headers={"Authorization": f"Bearer {token}"})
    data: dict = response.json()
    dark_mode = data['dark_mode']

    assert response.status_code == 200
    assert isinstance(dark_mode, bool)

    response = client.post('/users/me/settings/switch-mode',
                           headers={"Authorization": f"Bearer {token}"})

    data: dict = response.json()

    assert response.status_code == 200
    assert 'Dark mode was' in data['detail']

    response = client.get('/users/me/settings',
                          headers={"Authorization": f"Bearer {token}"})
    data: dict = response.json()
    assert response.status_code == 200
    assert isinstance(data['dark_mode'], bool)
    assert dark_mode != data['dark_mode']
