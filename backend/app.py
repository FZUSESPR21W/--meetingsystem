from flask import Flask,request
from backend.Util.token import create_token, validate_token
from backend.Database.database import Data
import json

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
    forumid = data.get_task(1)
    key = []
    for id in forumid:
        result = data.get_forum(id)
        subkey = {
            "time":result[3],
            "arrange":result[2]
        }
        key.append(subkey)
    rex = {
        "error_code":0,
        "data":{
            "time":"2021-03-27 17:57:47",
            "chairman":"admin",
            "submeet":key
        }
    }
    return json.dumps(rex)

@app.route('/api/user/forum/message',methods="POST")
def message():
    token = request.form.get("token")
    user_id,msg = validate_token(token)
    user_id = user_id["user_id"]
    page = request.form.get("page")
    id = request.form.get("id")
    if id is None:  #timeline
        forumlist = data.forum_list(user_id)
        res = []
        total = 0
        for key in forumlist:
            mess,subt = data.get_message(key["sub_forum_id"],page)
            total += subt
            index = data.get_forum(key["sub_forum_id"])
            for me in mess:
                subres = {
                    "id":key["sub_forum_id"],
                    "content":me["content"],
                    "time":me["time"],
                    "chairman":index["chairman"],
                    "issue":index["issue"]
                }
                res.append(subres)
        resx = {
            "error_code":0,
            "data":{
                "page":page,
                "total":total,
                "result":res
            }
        }
        return json.dumps(resx)
    res = []
    result,total = data.get_message(id,page)               #详情页
    index = data.get_forum(id)
    for rek in result:
        subres = {
            "id": id,
            "content": rek["content"],
            "time": rek["time"],
            "chairman": index["chairman"],
            "issue": index["issue"]
        }
        res.append(subres)
    resx = {
        "error_code": 0,
        "data": {
            "page": page,
            "total": total,
            "result": res
        }
    }
    return json.dumps(resx)

@app.route('/api/user/forum/list',methods="POST")   #curd forum名 issue
def forum_list():
    token = request.form.get("token")
    user_id,msg = validate_token(token)
    user_id = user_id["user_id"]
    setx = data.all_forum()
    keyset = data.forum_list(user_id)
    rex= []
    for key in setx:
        flag = 0
        for subgu in keyset:
            if key[0] == subgu[0]:
                flag = 1
        if flag == 0:
            subset = {
                "follow":flag,
                "forum":key[1],
                "id":key[0]
            }
            rex.append(subset)
        else:
            subset = {
                "follow":flag,
                "forum":key[1],
                "id":key[0]
            }
            rex.append(subset)
    result = {
        "error_code":0,
        "data":rex
    }
    return json.dumps(result)

@app.route('/api/user/follow/',methods="POST")
def follow():
    token = request.form.get("token")
    user_id,msg = validate_token(token)
    user_id = user_id["user_id"]
    follow_key = request.form.get("follow_key")
    ids = request.form.get("ids")
    for id in ids:
        if follow_key == 1:
            data.is_like(user_id,id)
        else:
            data.like(user_id,id)
    rex = {
        "error_code":0
    }
    return json.dumps(rex)

@app.route('/api/user/register',methods="POST")
def register():
    username = request.form.get("username")
    password = request.form.get("password")
    email = request.form.get("email")
    data.add_user(language="0",email=email,password=password,username=username)
    rex = {
        "error_code":0,
    }
    return json.dumps(rex)

@app.route('/api/user/login',methods="POST")
def login():
    email = request.form.get("email")
    password = request.form.get("password")
    result = data.get_user(email,password)
    if result is None:
        rex = {
            "error_code":1
        }
        return json.dumps(rex)
    token = create_token(result[0])
    username = result[4]
    first = result[5]
    rex = {
        "error_code":0,
        "data":{
            "token":token,
            "username":username,
            "first": first
        }
    }
    return json.dumps(rex)

@app.route('/api/admin/login',methods="POST")
def login():
    email = request.form.get("email")
    password = request.form.get("password")
    result,type = data.get_admin(email,password)
    token = create_token(result[0])
    username = result[4]
    rex = {
        "error_code": 0,
        "data": {
            "token": token,
            "username": username,
            "type": type
        }
    }
    return json.dumps(rex)

@app.route('/api/admin/stastic',methods="POST")
def static():
    token = request.form.get("token")
    user_id,msg = validate_token(token)
    user_id = user_id["user_id"]
    result,total = data.get_statistics()
    res = []
    rex = {
        "name":"total",
        "size":total
    }
    res.append(rex)
    for re in result:
        rex = {
            "name":re["name"],
            "size":re["size"]
        }
        res.append(rex)
    resultx = {
        "error_code":0,
        "data":res
    }
    return json.dumps(resultx)

@app.route('/api/admin/getParticipant',methods="POST")  #curd
def getpatica():
    token = request.form.get("token")
    user_id,msg = validate_token(token)
    user_id = user_id["user_id"]
    result = data.get_participant(user_id)
    res = []
    for re in result:
        da = {
            "username":re["username"],
            "email":re["email"]
        }
        res.append(da)
    resultx = {
        "error_code":0,
        "data":res
    }
    return json.dumps(res)

@app.route('/api/admin/publish',methods="POST")
def podcast():
    id = request.form.get("id")
    content = request.form.get("content")
    token = request.form.get("token")
    user_id,msg = validate_token(token)
    user_id = user_id["user_id"]
    data.publish_message(id,content,user_id)
    rex = {
        "error_code":0
    }
    return json.dumps(rex)

@app.route('/api/admin/forums',methods="POST")
def forums():
    token = request.form.get("token")
    user_id,msg = validate_token(token)
    user_id = user_id["user_id"]
    result = data.get_forum_charge(user_id)
    res = {
        "error_code":0,
        "data":result
    }
    return json.dumps(res)

@app.route('/api/user/query/follow',methods="POST")
def queryf():
    id = request.form.get("id")
    token = request.form.get("token")
    user_id = validate_token(token)["user_id"]
    rex = {
        "error_code":0,
        "data":{
            "follow":data.is_followed(user_id,id)
        }
    }
    return json.dumps(rex)



if __name__ == '__main__':
    app.run()
