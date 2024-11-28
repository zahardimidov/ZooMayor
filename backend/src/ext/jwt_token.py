from datetime import datetime, timedelta, timezone

import jwt

SECRET_KEY = "my_secret_key"
ALGORITHM = "HS256"
EXPIRATION_TIME = timedelta(minutes=30)


def create_jwt_token(data: dict):
    expiration = datetime.now(timezone.utc) + EXPIRATION_TIME
    data.update({"exp": expiration})
    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return token


def verify_jwt_token(token: str):
    try:
        decoded_data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_data['initData']
    except jwt.PyJWTError as e:
        print(e)
        return str(e)
