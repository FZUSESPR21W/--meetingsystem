import jwt
import time

SECRET_KEY = "asjiodjoasd"


def create_token(user_id):
    global SECRET_KEY
    headers = {
        "alg": "HS256",
        "typ": "JWT"
    }
    exp = int(time.time() + 1e100)
    payload = {
        "user_id": user_id,
        "exp": exp
    }
    token = jwt.encode(payload=payload, key=SECRET_KEY, algorithm="HS256", headers=headers).decode('utf-8')
    return token

