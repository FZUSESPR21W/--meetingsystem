<!--  -->
<template>
    <div class='publish'>
        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
            <h1>发布消息</h1>
            <div class="container">
                <a-alert type="error" message="输入信息不能为空" v-if="inputEmpty" banner />
                <div class="inputLine secondLine">
                    <span class="title">论坛名</span>
                    <a-select
                        class="inputer"
                        show-search
                        :value="forumSelect.forum"
                        placeholder="请输入论坛名"
                        :default-active-first-option="false"
                        :filter-option="false"
                        :not-found-content="null"
                        @search="handleSearch"
                        @change="handleChange"
                    >
                        <a-select-option v-for="forum in forums" :key="forum">
                            {{ forum.forum }}
                        </a-select-option>
                    </a-select>
                </div>
                <div class="inputLine secondLine">
                    <span class="title">消息</span>
                    <a-textarea @change="editMsg" class="inputer" v-model="message" placeholder="请输入要发送的消息" :rows="4" />
                </div>
                <div class="inputLine secondLine btnLine">
                    <a-button type="primary" :loading="messaging" @click="publish">发送</a-button>
                </div>
            </div>
        </a-layout-content>
    </div>
</template>

<script>
import request from '../tools/request';

export default {
    name: 'Publish',
    components: {},
    data () {
        return {
            forums: [],
            forumSelect: {
                forum: "",
                id: ""
            },
            message: "",
            inputEmpty: false,
            messaging: false
        }
    },
    methods: {
        publish() {

            if(this.forumSelect.forum=="" || this.forumSelect.id=="" || this.message=="") {
                this.inputEmpty = true;
                return;
            }
            let that = this;
            request.publish({
                id: that.forumSelect.id,
                content: that.message,
                token: localStorage.getItem("token")
            })
            .then((res)=>{
                
                if(res.error_code!=0) {
                    this.$message.error('发送失败，请重试');
                }
                else {
                    this.$message.success('已发送成功');
                }
                that.messaging = fasle;
            })
        },
        getForumList() {
            let that = this;
            request.getForumList({
                token: localStorage.getItem("token")
            })
            .then((res)=>{
                that.forums = res.data;
            })
        },
        handleSearch(value) {
            console.log({"search":value});
            // this.getForumList();
        },
        handleChange(value) {
            // console.log({"change": value});
            this.inputEmpty = false;
            this.forumSelect = value;
        },
        editMsg() {
            this.inputEmpty = false;
        }
    },
    mounted() {
        this.getForumList();
    }
}
</script>
<style lang='scss' scoped>
//@import url();
.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 32px;
}
.inputLine {
    display: flex;
    align-items: center;
    .title {
        text-align: justify;
        text-align-last: justify;
        width: 48px;
        margin-right: 12px;
    }
    .inputer {
        width: auto;
        flex-grow: 1;
    }
}
.secondLine {
    align-items: flex-start;
    margin-top: 12px;
}
.btnLine {
    justify-content: center;
    margin-top: 24px;
}
</style>