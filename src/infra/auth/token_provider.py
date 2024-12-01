from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY= 'E188D39898EBA0968C7B8AC00161C137A4B99C16F8677A4E7732494D'
ALGORITHM = 'HS256'
EXPIRES_IN_MIN = 3000

def create_access_token(data: dict):
    data_dict = data.copy()
    expiration = datetime.utcnow() + timedelta(minutes=EXPIRES_IN_MIN)
    data_dict.update({'exp': expiration})

    token_jwt = jwt.encode(data_dict, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

def verify_access_token(token: str):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload.get('sub')