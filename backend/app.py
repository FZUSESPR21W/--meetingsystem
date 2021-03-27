from flask import Flask,request
from backend.Util.token import create_token, validate_token
from backend.Database.database import Data

app = Flask(__name__)
data = Data()

@app.route('/front',methods="GET")
def index():
    return

@app.route('/backend',methods="GET")
def index():
    return

@app.route('/api/user/meeting',methods="GET")
def message():
    return

@app.route('/api/user/forum/message',methods="POST")
def message():
    token = request.form.get("token")
    page = request.form.get("page")
    id = request.form.get("id")
    if id is None:
        return
    return

@app.route('/api/user/query/follow',methods="POST")
def ask_follow():
    token = request.form.get("token")
    id = request.form.get("id")
    return

@app.route('/api/user/forum/list',methods="POST")
def forum_list():
    token = request.form.get("token")
    return

@app.route('/api/user/follow/',methods="POST")
def follow():
    token = request.form.get("token")
    follow_key = request.form.get("follow_key")
    ids = request.form.get("ids")
    return

@app.route('/api/user/register',methods="POST")
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    email = request.form.get("email")
    return

@app.route('/api/user/login',methods="POST")
def login():
    email = request.form.get("email")
    password = request.form.get("password")
    return

@app.route('/api/admin/login',methods="POST")
def login():
    email = request.form.get("email")
    password = request.form.get("password")
    return

@app.route('/api/admin/stastic',methods="POST")
def static():
    token = request.form.get("token")
    return









if __name__ == '__main__':
    app.run()
