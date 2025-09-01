<template>
    <div class="wrapper">
      <div id="poster">
          <div class="login-container" label-position="left" label-width="0px">
            <el-button type='text' id="register"> 注册</el-button>
          </div>
          <div id="account" class="input">
            <el-input v-model="username" placeholder="请输入账号"></el-input>
          </div>
          <div id="password" class="input">
            <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>
        <div id="ensurePassword" class="input">
            <el-input v-model="ensurePassword" placeholder="请再次输入密码" show-password></el-input>
          </div>
          <div id="phone" class="input">
            <el-input v-model="phone" placeholder="请输入手机号" id="phone-input"></el-input>
          </div>
          <div id="email" class="input">
            <el-input v-model="email" placeholder="请输入邮箱" id="email-input"></el-input>
          </div>
          <div style="margin-bottom: 10px;">
            <el-input style="width: 100px; margin-right: 150px;" v-model="verCode" placeholder="验证码"></el-input>
            <el-button style="width: 100px; text-align: center;" @click="sendCode" :disabled="buttonDisabled" > {{ buttonText }}</el-button>
        </div>
          <div class="down-button"><el-button id="login-btn" @click="register">确认注册</el-button></div>
      </div>
    </div>
  </template>

<script>

export default {
    data () {
        return {
            username: '',
            password: '',
            ensurePassword: '',
            email: '',
            verCode: '',
            buttonText: '发送验证码',
            buttonDisabled: false,
            phone: '',
        }
    },
    methods: {
        register() {
            if (!this.username) {
                this.$message.error('请输入账号');
            } else if (!this.password) {
                this.$message.error('请输入账号');
            } else if (!this.ensurePassword) {
                this.$message.error('请输入确认密码');
            } else if (this.password !== this.ensurePassword) {
                this.$message.error('两次密码不一致');
            } else if (this.checkEmail()) {
                if (!this.verCode) {
                    this.$message.error('请输入验证码');
                }
                let username = this.username;
                let password = this.$md5(this.password);
                let phone = this.phone;
                let email = this.email;
                let roleId = 3;
                let verCode = this.verCode;
                let form = {
                    username,
                    password,
                    phone,
                    email,
                    roleId,
                    verCode
                };
                this.$store.dispatch('login/register', form)
                .then((response) => {
                    console.log(response.code);
                    if (response.code === 200) {
                        this.$message.success("请前往登录");
                        this.$router.push('login');
                    } else {
                        this.$message.error(response.message);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        },
        sendCode() {
            if (!this.username) {
                this.$message.error('请输入账号');
            } else if (!this.password) {
                this.$message.error('请输入账号');
            } else if (!this.ensurePassword) {
                this.$message.error('请输入确认密码');
            } else if (this.password !== this.ensurePassword) {
                this.$message.error('两次密码不一致');
            } else if (this.checkEmail()) {
                let email = this.email;
                let data = {
                    email,
                };
                this.$store.dispatch('login/sendCode', data)
                .then((response) => {
                    console.log(response.code);
                    if (response.code === 200) {
                        console.log("nihao")
                        let time = 60;
                        this.buttonText = time + "秒后重发";
                        this.buttonDisabled = true;
                        let timer = setInterval(() => {
                            time--;
                            this.buttonText = time + "秒后重发";
                            if (time === 0) {
                                clearInterval(timer);
                                this.buttonText = "发送验证码";
                                this.buttonDisabled = false;
                            }
                        }, 1000);
                    }
                }).catch((error) => {
                    console.log(error);
                })
            }
        },
        checkEmail() {
            if (!this.email) {
                this.$message.error("请输入邮箱！");
                return false;
            } else {
                let reg =
                /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                if (!reg.test(this.email)) {
                this.$message.error("请输入有效的邮箱！");
                return false;
                }
                return true;
            }
        }
    }
}
  </script>

<style>
#register {
    display: flex;
    opacity: 1;
    font-size: 20px;
    letter-spacing: 0px;
    line-height: 0px;
    color: rgba(222, 71, 71, 1);
    text-align: left;
    width: 350px;
    height: 40px;
    justify-content: center;
    align-items: center;
}

.down-button {
    margin-bottom: 15px;
}

</style>