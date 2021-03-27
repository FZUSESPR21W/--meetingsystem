from flask import Flask

from backend.Util.token import create_token, validate_token

app = Flask(__name__)


@app.route('/')
def hello_world():
    token = create_token(123)
    payload = validate_token(token)
    return payload


if __name__ == '__main__':
    app.run()
