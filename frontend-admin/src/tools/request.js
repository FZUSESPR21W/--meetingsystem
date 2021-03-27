let root = "/"

const request = {
    // 登入
    login: async (data) => {
        console.log({"get req:": data});
        return {
            status: 200,
            token: "dhaishduisahfuisahduahsdhasudasuihdu",
            username: "测试用用户"
        }
    },
    // 论坛数据
    getStastic: async (data) => {
        console.log({"get req:": data});
        return {
            status: 200,
            stastic: [
                {
                    name: "total",
                    size: 100,
                },
                {
                    name: "subForum1",
                    size: 50,
                },
                {
                    name: "subForum2",
                    size: 50,
                },
            ]
        }
    },
    // 成员列表
    getParticipant: async (data) => {
        console.log({"get req:": data});
        return {
            status: 200,
            participant: [
                {
                    username: "成员名",
                    mail: "111@mail.com"
                }
            ]
        }
    },
    // 发送通知
    publish: async (data) => {
        console.log({"get req:": data});
        return {
            status: 200,
        }
    },
}

function axios_get(url,data){
    return new Promise((resolve,reject) => {
        axios({
            method: 'get',
            url: url,
            params: data
        })
        .then(function(res){
            resolve(res.data);
            //reject(res.data)
        })
        .catch(function(err){
            reject(err);
        })
    })
}

function axios_post(url,data){
    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            url: url,
            data: data
        })
        .then(function(res){
            resolve(res.data);
            //reject(res.data)
        })
        .catch(function(err){
            reject(err);
        })
    })
}

export default request;