<template>
    <div class="wrapper">
      <div id="poster">
          <el-steps :active="active" finish-status="success" align-center="" class="step" style="margin-bottom: 10px;">
          <el-step title="身份验证"></el-step>
          <el-step title="重置密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
        <div v-show="active === 0">
          <div id="email" class="input">
            <el-input v-model="email" placeholder="请输入邮箱" id="email-input"></el-input>
          </div>
          <div style="margin-bottom: 10px;">
            <el-input style="width: 100px; margin-right: 150px;" v-model="code" placeholder="验证码"></el-input>
            <el-button style="width: 100px; text-align: center;" @click="sendCode" :disabled="buttonDisabled"> {{ buttonText }}</el-button>
        </div>
          <div class="down-button"><el-button id="login-btn" @click="verifyCode">身份验证</el-button></div>
      </div>
      <div v-show="active === 1">
        <div>
          <div id="password" class="input">
            <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
          </div>
          <div id="ensure-password" class="input">
            <el-input v-model="ensurePassword" placeholder="请再次输入密码" show-password></el-input>
          </div>
          <div class="down-button"><el-button id="login-btn" @click="resetPassword">重置密码</el-button></div>
        </div>
      </div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      active: 0,
      buttonText: "发送验证码",
      email: '',
      code: '',
      buttonDisabled: false,
      password: '',
      ensurePassword: '',
      token: ''
    }
  },
  methods: {
    sendCode() {
      if (this.checkEmail()) {
        let email = this.email;
        let data = {
            email
        };
        this.$store.dispatch('login/resetPasswordEmailCaptcha', data)
        .then((response) => {
            console.log(response.code);
            if (response.code == 200) {
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
    verifyCode() {
      if (!this.email) {
        this.$message.error("请输入邮箱！");
      } else if (!this.code) {
        this.$message.error("请输入验证码！");
      } else {
        let email = this.email;
        let verCode = this.code;
        let data = {
          email,
          verCode
        };
        this.$store.dispatch("login/verifyCode", data)
        .then((response) => {
            if (response.code === 200) {
              this.active++;
              this.token = response.data;
            } else {
              this.$message.error(response.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
    },
    resetPassword() {
      if (!this.password) {
        this.$message.error("请输入新密码!");
      } else if (!this.ensurePassword) {
        this.$message.error("请输入确认密码!");
      } else if (this.password != this.ensurePassword) {
        this.$message.error("两次输入密码不一致!");
      } else {
        let token = this.token;
        let newPassword = this.$md5(this.password);
        let data = {
          newPassword,
          token
        };
        this.$store.dispatch("login/updatePassword", data)
        .then((response) => {
            console.log(response.code);
            if (response.code == 200) {
              this.active++;
              this.$message.success("请前往登录");
              this.$router.push("login");
            } else {
              this.$message.error(response.message);
            }
          })
          .catch((error) => {
            console.log(error.response);
          });
      }
    }
}
}
</script>
