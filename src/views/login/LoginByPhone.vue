<template>
    <div>
      <div id="poster">
        <div id="email" class="input">
        <el-input v-model="email" placeholder="请输入手机号" id="email-input"></el-input>
      </div>
      <div style="margin-bottom: 10px;">
        <el-input style="width: 100px; margin-right: 150px;" v-model="code" placeholder="验证码"></el-input>
        <el-button style="width: 100px; text-align: center;" @click="sendCode" :disabled="buttonDisabled"> {{ buttonText }}</el-button>
      </div>
      <div class="down-button"><el-button id="login-btn" @click="verifyPhone">登录</el-button></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttonText: "发送验证码",
        email: '',
        code: '',
        buttonDisabled: false,
      }
    },
    methods: {
      checkEmail() {
        if (!this.email) {
            this.$message.error("请输入手机号！");
            return false;
        } else {
            let reg =
            /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
            if (!reg.test(this.email)) {
            this.$message.error("请输入有效的手机号！");
            return false;
            }
            return true;
        }
      },
      sendCode() {
        if (this.checkEmail()) {
          let email = this.email;
          let data = {
              email
          };
          this.$store.dispatch('login/sendPhone', data)
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
      verifyPhone() {
        if (!this.email) {
          this.$message.error("请输入手机号！");
        } else if (!this.code) {
          this.$message.error("请输入验证码！");
        } else {
          let email = this.email;
          let code = this.code;
          let data = {
            email,
            code
          };
          this.$store.dispatch("login/verifyPhone", data)
          .then((response) => {
              console.log(response.code);
              if (response.code === 200) {
                localStorage.setItem("token", response.data.token);
                if (response.data.isCommonUser) {
                  this.$store.commit('user/setIsCommonUser', response.data.isCommonUser);
                  this.$router.push("/home"); 
                } else {
                  this.$router.push("/admin");
                }
                setInterval(() => {
                location.reload();
                }, 1000);
              } else {
                this.$message.error(response.message);
              }
            })
            .catch((error) => {
              console.log(error.response);
            });
        }
      },
    }
  }
  </script>
  
  <style>
  
  </style>