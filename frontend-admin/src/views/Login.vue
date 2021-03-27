<!--  -->
<template>
    <div class='login'>
        <a-form
            id="components-form"
            :form="form"
            class="login-form"
            @submit="submitLogin"
        >
            <a-form-item>
            <a-input
                v-decorator="[
                'userName',
                { rules: [{ required: true, message: '请输入邮箱' }] },
                ]"
                placeholder="邮箱"
            >
                <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
            </a-form-item>
            <a-form-item>
            <a-input
                v-decorator="[
                'password',
                { rules: [{ required: true, message: '请输入密码' }] },
                ]"
                type="password"
                placeholder="密码"
            >
                <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
            </a-form-item>
            <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button">
                Log in
            </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>

export default {
    name: 'Login',
    components: {},
    data () {
        return {

        }
    },
    methods: {
        submitLogin(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ', values);
                }
            });
        },
    },
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },

}
</script>
<style lang='scss' scoped>
//@import url();
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #001529;
}
.login-form {
    width: 500px;
    padding: 48px;
    box-sizing: border-box;
    background-color: #ffffff;
}
#components-form .login-form-forgot {
  float: right;
}
#components-form .login-form-button {
  width: 100%;
}
</style>