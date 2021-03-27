<!--  -->
<template>
    <div class='participant'>
        <a-layout-content
            :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
        >
            <a-spin size="large" :spinning="spinning" />
            <a-table 
                v-if="!spinning"
                :pagination="pager" 
                :columns="columns" 
                :data-source="participants"
                @change="handelChange"
            />
        </a-layout-content>
    </div>
</template>

<script>

import request from '../tools/request'

export default {
    name: 'Participant',
    components: {},
    data () {
        return {
            columns: [
                {
                    title: "成员名",
                    dataIndex: "username",
                    key: "username",
                    width: "25%",
                },
                {
                    title: "邮箱",
                    dataIndex: "email",
                    key: "email",
                }
            ],
            participants: [],
            pager: {
                total: 1,
                current: 1,
            },
            spinning: true,
        }
    },
    methods: {
        getParticipants(pagenum) {
            this.spinning = true;
            let that = this;
            request.getParticipant({
                page: pagenum,
                token: localStorage.getItem("token")
            })
            .then((res)=>{
                if(res.error_code != 0) {
                    that.$message.error('请求错误');
                    this.spinning = false;
                }
                else {
                    that.participants = res.data;
                    that.pager.total = res.data.length;
                    this.spinning = false;
                }
            })
        },
        handelChange(page) {
            // console.log(page.current);
            this.pager.current = page.current;
            this.getParticipants(page.current);
        }
    },
    mounted() {
        this.getParticipants(1);
    }
}
</script>
<style lang='scss' scoped>
//@import url();
</style>