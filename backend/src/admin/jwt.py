from datetime import UTC, datetime, timedelta

from fastapi import Depends, HTTPException
from fastapi import security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
import jwt

from database.requests import get_moderator_by_login

security = HTTPBearer()

JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION = 1
RANDOM_SECRET = '1234567890'



class JWT:
    @staticmethod
    def encode(login: str, sub: str) -> str:
        current_time = datetime.now(UTC)
        expiration = current_time + timedelta(hours=JWT_EXPIRATION)

        token_payload = {
            "login": login,
            "exp": expiration.timestamp(),
            "iat": current_time.timestamp(),
            "sub": sub,
        }

        token = jwt.encode(
            token_payload,
            RANDOM_SECRET,
            algorithm=JWT_ALGORITHM
        )
        return token

    @staticmethod
    async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
        credentials_exception = HTTPException(
            status_code=401,
            detail="Could not validate credentials"
        )
        try:
            token = credentials.credentials
            if not token:
                raise credentials_exception

            payload = jwt.decode(
                token,
                RANDOM_SECRET,
                algorithms=[JWT_ALGORITHM],
                options={
                    "verify_signature": True,
                    "verify_exp": True,
                    "verify_iat": True,
                    "require": ["exp", "iat", "login"]
                }
            )
            exp_timestamp = payload.get("exp")
            if not exp_timestamp:
                raise credentials_exception

            iat_timestamp = payload.get("iat")
            if not iat_timestamp:
                raise credentials_exception

            if datetime.fromtimestamp(payload['exp']) < datetime.now():
                raise credentials_exception

            user = await get_moderator_by_login(payload['login'])
            if not user:
                raise credentials_exception
            if not user.status:
                raise credentials_exception

            return user
        except jwt.InvalidTokenError as e:
            raise credentials_exception
        except Exception as e:
            raise credentials_exception


jwt_tools = JWT
