from flask import Flask,request
from Util.token import create_token, validate_token
from Database.database import Data
import json

app = Flask(__name__)
data = Data()

@app.route('/front',methods=["GET"])
def indexs():
    return

@app.route('/backend',methods=["GET"])
def index():
    return

@app.route('/api/user/meeting',methods=["GET"])
def messages():
    forumid = data.get_task(1)
    key = []
    for id in forumid:
        result = data.get_forum(id)
        subkey = {
            "time":result['time'],
            "arrange":result['issue']
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

@app.route('/api/user/forum/message',methods=["POST"])
def message():
    p = request.get_json()
    token = p["token"]
    pay,msg = validate_token(token)
    user_id = pay["user_id"]
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

@app.route('/api/user/forum/list',methods=["POST"])
def forum_list():
    token = request.form["token"]
    pay,msg = validate_token(token)
    user_id = pay["user_id"]
    setx = data.all_forum()
    keyset = data.forum_list(user_id)
    rex= []
    for key in setx:
        flag = 0
        for subgu in keyset:
            if key["sub_forum_id"] == subgu["sub_forum_id"]:
                flag = 1
            if flag == 0:
                subset = {
                    "follow":flag,
                    "forum":subgu['issue'],
                    "id":key["sub_forum_id"]
                }
                rex.append(subset)
            else:
                subset = {
                    "follow":flag,
                    "forum":subgu['issue'],
                    "id":key["sub_forum_id"]
                }
                rex.append(subset)
    result = {
        "error_code":0,
        "data":rex
    }
    return json.dumps(result)

@app.route('/api/user/follow/',methods=["POST"])
def follow():
    token = request.form["token"]
    pay,msg = validate_token(token)
    user_id = pay["user_id"]
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

@app.route('/api/user/register',methods=["POST"])
def register():
    username = request.form["username"]
    password = request.form["password"]
    email = request.form["email"]
    data.add_user(language="0",email=email,password=password,username=username)
    rex = {
        "error_code":0,
    }
    return json.dumps(rex)

@app.route('/api/user/login',methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]
    result = data.get_user(email,password)
    if result is None:
        rex = {
            "error_code":1
        }
        return json.dumps(rex)
    token = create_token(result['user_id'])
    username = result['username']
    first = result['status']
    rex = {
        "error_code":0,
        "data":{
            "token":token,
            "username":username,
            "first": first
        }
    }
    return json.dumps(rex)

@app.route('/api/admin/login',methods=["POST"])
def logins():
    email = request.form["email"]
    password = request.form["password"]
    result,type = data.get_admin(email,password)
    if result is not None:
        token = create_token(result['user_id'])
        username = result['username']
        rex = {
            "error_code": 0,
            "data": {
                "token": token,
                "username": username,
                "type": type
            }
        }
        return json.dumps(rex)
    rex = {
        "error_code":1
    }
    return json.dumps(rex)

@app.route('/api/admin/stastic',methods=["POST"])
def statics():
    token = request.form["token"]
    pay,msg = validate_token(token)
    user_id = pay["user_id"]
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

@app.route('/api/admin/getParticipant',methods=["POST"])  #1
def getpatica():
    token = request.form["token"]
    pay,msg = validate_token(token)
    user_id = pay["user_id"]
    result = data.get_participant(user_id)
    res = []
    if result is not None:
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
    else:
        resultx = {
            "error_code":1
        }
    return json.dumps(resultx)

@app.route('/api/admin/publish',methods=["POST"])
def podcast():
    id = request.form["id"]
    content = request.form["content"]
    token = request.form["token"]
    pay,msg = validate_token(token)
    user_id = pay["user_id"]
    data.publish_message(id,content,user_id)
    rex = {
        "error_code":0
    }
    return json.dumps(rex)

@app.route('/api/admin/forums',methods=["POST"])
def forums():
    token = request.form["token"]
    pay,msg = validate_token(token)
    user_id = pay["user_id"]
    result = data.get_forum_charge(user_id)
    res = {
        "error_code":0,
        "data":result
    }
    return json.dumps(res)

@app.route('/api/user/query/follow',methods=["POST"])
def queryf():
    id = request.form["id"]
    token = request.form["token"]
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
