<!--  -->
<template>
    <div class='coat'>
        <a-layout id="components-layout-demo-custom-trigger">
            <a-layout-sider id="asider" v-model="collapsed" :trigger="null" collapsible>
                <div class="logo" />
                <a-menu mode="inline" :default-selected-keys="['brief']" @click="route">
                <a-menu-item key="brief">
                    <a-icon type="global" />
                    <span>会议概况</span>
                </a-menu-item>
                <a-menu-item key="participant">
                    <a-icon type="unordered-list" />
                    <span>会议成员</span>
                </a-menu-item>
                <a-menu-item key="publish">
                    <a-icon type="line-chart" />
                    <span>发布通知</span>
                </a-menu-item>
                </a-menu>
            </a-layout-sider>
            <a-layout>
                <a-layout-header class="header" style="background: #fff; padding: 0">
                <a-icon
                    class="trigger"
                    :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                    @click="() => (collapsed = !collapsed)"
                />
                <span style="padding-right: 24px">{{username}}</span>
                </a-layout-header>
                <a-layout-content :style="{ minHeight: '280px' }" >
                <router-view></router-view>
                </a-layout-content>
            </a-layout>
        </a-layout>
    </div>
</template>

<script>

export default {
    name: 'Coat',
    components: {},
    data () {
        return {
            collapsed: false,
            username: "",
        }
    },
    methods: {
        route({ item, key, keyPath }) {
        this.$router.push("/center/"+key);
        }
    },
    mounted() {
        this.$router.push("/center/brief");
        this.username = localStorage.getItem("username");
    },
}
</script>
<style lang='scss' scoped>

.coat {
    width: 100%;
    height: 100%;
}

#asider {
  background-color: #ffffff;
  box-shadow: 1px 0 2px #eeeeee;
}

#components-layout-demo-custom-trigger {
  width: 100%;
  height: 100%;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: #aaaaaa;
  margin: 16px;
}

.header {
    display: flex;
    justify-content: space-between;
}
</style>