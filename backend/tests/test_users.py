from test_client import client


def test_create_test_user_invalid_lang():
    response = client.post('/users/create_test_user', json={'id': 7485502073, 'lang': 'russian'})

    assert response.status_code == 400
    assert 'Incorrect language. Available languages' in response.json()['detail']

def test_dublicate_test_user():
    response = client.post('/users/create_test_user', json={'id': 7485502073, 'lang': 'ru'})

    assert response.status_code == 400
    assert response.json()['detail'] == 'User already exists'

def test_create_second_test_user():
    response = client.post('/users/create_test_user', json={'id': 7485502076, 'lang': 'es'})

    assert response.status_code == 200
    assert response.json()['detail'] == 'User was created'


def test_get_me():
    response = client.post('/users/me', json={'initData': '{}'})

    assert response.status_code == 200
    assert response.json()['username'] == 'Guest'
    assert response.json()['id'] == 7485502073

def test_settings():
    response = client.post('/users/me/settings', json={'initData': '{}'})

    data: dict = response.json()

    assert response.status_code == 200
    assert 'dark_mode' in data and 'lang' in data and 'vibration' in data

def test_lang_settings():
    response = client.post('/users/me/settings', json={'initData': '{}'})

    data: dict = response.json()

    assert response.status_code == 200
    assert data['lang'] == 'en'

def test_change_lang_settings():
    response = client.post('/users/me/settings/switch-lang', json={'initData': '{}', 'lang': 'france'})

    data: dict = response.json()

    assert response.status_code == 400
    assert 'Incorrect language. Available languages' in data['detail']


    response = client.post('/users/me/settings/switch-lang', json={'initData': '{}', 'lang': 'it'})

    data: dict = response.json()

    assert response.status_code == 200
    assert 'Language was changed to it' in data['detail']

    response = client.post('/users/me/settings', json={'initData': '{}'})

    data: dict = response.json()

    assert response.status_code == 200
    assert data['lang'] == 'it'

def test_switch_mode():
    response = client.post('/users/me/settings', json={'initData': '{}'})
    data: dict = response.json()
    dark_mode = data['dark_mode']

    assert response.status_code == 200
    assert isinstance(dark_mode, bool)

    response = client.post('/users/me/settings/switch-mode', json={'initData': '{}'})

    data: dict = response.json()

    assert response.status_code == 200
    assert 'Dark mode was' in data['detail']

    response = client.post('/users/me/settings', json={'initData': '{}'})
    data: dict = response.json()
    assert response.status_code == 200
    assert isinstance(data['dark_mode'], bool)
    assert dark_mode != data['dark_mode']

