<!--  -->
<template>
    <div class='Brief'>
        <a-spin size="large" :spinning="spinning" />
        <div class="container">
            <div class="block" v-for="forum in forums" :key="forum">
                <a-statistic :title="forum.name" :value="forum.size" />
            </div>
        </div>
    </div>
</template>

<script>

import request from '../tools/request'

export default {
    name: 'Brief',
    components: {},
    data () {
        return {
            forums: [],
            spinning: true
        }
    },
    methods: {

    },
    mounted() {
        this,this.spinning = true;
        let that = this;
        request.getStastic({
            token: localStorage.getItem("token")
        })
        .then((res)=>{
            // console.log(res);
            that.forums = res.data;
            that.spinning = false;
        })  
    }
}
</script>
<style lang='scss' scoped>
//@import url();
.container {
    display: flex;
    flex-wrap: wrap;
    margin: 12px;
}
.block {
    display: flex;
    align-items: center;
    width: 15%;
    height: 156px;
    margin: 6px;
    padding: 12px;
    background-color: #ffffff;
}
</style>