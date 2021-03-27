let root = "/api/admin/"

const request = {
    // 登入
    login: async (data) => {
        let url = root + 'login';
        console.log({"get req:": data});
        // return {
        //     error_code: 0,
        //     data: {
        //         token: "dhaishduisahfuisahduahsdhasudasuihdu",
        //         username: "测试用用户",
        //         type: 3,
        //     }
        // }
        return await axios_post(url, data);
    },
    // 论坛数据
    getStastic: async (data) => {
        let url = root + 'stastic';
        console.log({"get req:": data});
        // return {
        //     error_code: 0,
        //     data: [
        //         {
        //             name: "会议总人数",
        //             size: 100,
        //         },
        //         {
        //             name: "分论坛1",
        //             size: 50,
        //         },
        //         {
        //             name: "分论坛2",
        //             size: 50,
        //         },
        //     ]
        // }
        return await axios_post(url, data);
    },
    // 成员列表
    getParticipant: async (data) => {
        let url = root + 'getParticipant';
        console.log({"get req:": data});
        // return {
        //     error_code: 0,
        //     totalpage: 120,
        //     data: [
        //         {
        //             username: "成员名",
        //             email: "111@mail.com"
        //         },
        //     ]
        // }
        return await axios_post(url, data);
    },
    // 获取论坛列表
    getForumList : async (data) => {
        let url = root + 'forums';
        console.log({"get req:": data});
        // return {
        //     error_code: 0,
        //     data: [
        //         {
        //             forum: "分论坛名",
        //             id: "asajigduiashduias"
        //         }
        //     ]
        // }
        return await axios_post(url, data);
    },
    // 发送通知
    publish: async (data) => {
        let url = root + 'publish';
        console.log({"get req:": data});
        // return {
        //     error_code: 0,
        // }
        return await axios_post(url, data);
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
            data: data,
            transformRequest: [function (data) {
                //transform data from text to form
                let ret = ''
                for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                }
                return ret
            }],
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
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