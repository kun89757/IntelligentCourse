<template>
  <div>
    <div id="poster">
      <div id="email" class="input">
      <el-input v-model="email" placeholder="请输入邮箱" id="email-input"></el-input>
    </div>
    <div style="margin-bottom: 10px;">
      <el-input style="width: 100px; margin-right: 150px;" v-model="code" placeholder="验证码"></el-input>
      <el-button style="width: 100px; text-align: center;" @click="sendCode" :disabled="buttonDisabled"> {{ buttonText }}</el-button>
    </div>
    <div class="down-button"><el-button id="login-btn" @click="verifyEmail">登录</el-button></div>
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
    sendCode() {
      if (this.checkEmail()) {
        let email = this.email;
        let data = {
            email
        };
        this.$store.dispatch('login/sendEmail', data)
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
    verifyEmail() {
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
        this.$store.dispatch("login/verifyEmail", data)
        .then((response) => {
            if (response.code === 200) {
              localStorage.setItem("token", response.data.token);
              this.$store.commit('user/setRoleId', response.data.roleId);
              this.$message.success('登陆成功');
              if (response.data.roleId == '3') {
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
            console.log(error);
          });
      }
    },
  }
}
</script>

<style>

</style>