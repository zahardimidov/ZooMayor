from test_00_client import client, token, logger
import time


def test_search_cards(token):
    response = client.get(
        '/cards/search?limit=10', headers={"Authorization": f"Bearer {token}"})
    
    assert response.status_code == 200
    assert len(response.json()['cards']) > 0

    #logger.info(json.dumps(response.json(), indent=4, ensure_ascii=False))


def test_play_game(token):
    response = client.post(
        '/cards/game', headers={"Authorization": f"Bearer {token}"})
    
    assert response.status_code == 200