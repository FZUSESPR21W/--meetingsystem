import jwt
import time

from jwt import exceptions

SECRET_KEY = "asjiodjoasd"


# 根据user_id创建token
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
    token = jwt.encode(payload=payload, key=SECRET_KEY, algorithm="HS256", headers=headers)
    return token


# 解析token，返回载荷
def validate_token(token):
    global SECRET_KEY
    payload = None
    msg = None
    try:
        payload = jwt.decode(jwt=token, key=SECRET_KEY, algorithms="HS256")
    except exceptions.ExpiredSignatureError:
        msg = "token过期"
    except jwt.DecodeError:
        msg = "token认证失败"
    except jwt.InvalidTokenError:
        msg = "token非法"
    return payload, msg


