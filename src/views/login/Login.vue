<template>
  <div class="wrapper">
    <div id="poster">
        <div class="login-container" label-position="left">
            <el-button type="text" id="stu-btn" @click="refocus($event)">学生登陆</el-button>
            <el-button type="text" id="tea-btn" @click="refocus($event)">教师登陆</el-button>
            <el-button type="text" id="admin-btn" @click="refocus($event)">管理员登陆</el-button>
        </div>
        <div id="account" class="input">
          <el-input v-model="username" :placeholder="placeholder"></el-input>
        </div>
        <div id="password" class="input">
          <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
        </div>
        <div id="check-and-forget">
          <router-link to="../forgetPassword" id="forget">忘记密码</router-link>
        </div>
        <div class="down-button"><el-button id="login-btn" @click="login()">登录</el-button></div>
        <div class="down-button"><el-button id="register-btn" type="text" @click="toRegister()">注册</el-button></div>
        <div style="display: flex; align-items: center; justify-content: center;">
          <i class="el-icon-message" style="font-size: 36px;" @click="loginByMail"></i>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      checked: false,
      placeholder: '请输入账号',
      roleId: '',
    }
  },
  methods: {
    refocus(e) {
      let id = e.currentTarget.id;
      if (id === 'stu-btn') {
        e.currentTarget.style.color = "rgba(222, 71, 71, 1)";
        let element = document.getElementById("tea-btn");
        let element2 = document.getElementById("admin-btn");
        element.style.color = "rgba(115, 109, 109, 1)";
        element2.style.color = "rgba(115, 109, 109, 1)";
        this.placeholder = '请输入账号';
      } else if (id === 'tea-btn') {
        e.currentTarget.style.color = "rgba(222, 71, 71, 1)";
        let element = document.getElementById("stu-btn");
        let element2 = document.getElementById("admin-btn");
        element.style.color = "rgba(115, 109, 109, 1)";
        element2.style.color = "rgba(115, 109, 109, 1)";
        this.placeholder = '请输入教师账号';
      } else {
        e.currentTarget.style.color = "rgba(222, 71, 71, 1)";
        let element = document.getElementById("tea-btn");
        let element2 = document.getElementById("stu-btn");
        element.style.color = "rgba(115, 109, 109, 1)";
        element2.style.color = "rgba(115, 109, 109, 1)";
        this.placeholder = '请输入管理员账号';
      }
    },
    login() {
      if (this.placeholder === '请输入账号') {
        this.roleId = 3;
      } else if (this.placeholder === '请输入教师账号') {
        this.roleId = 2;
      } else {
        this.roleId = 1;
      }
      localStorage.setItem('roleId', this.roleId);
      if (!this.username) {
        this.$message.error('请输入账号!');
      } else if (!this.password) {
        this.$message.error('请输入密码');
      } else {
        let username = this.username;
        let password = this.password;
        password = this.$md5(password);
        let roleId = this.roleId;
        let data = {
          username,
          password,
          roleId
        };
        this.$store.dispatch("login/login", data)
        .then(response => {
          console.log(response.code);
          if (response.code === 200) {
            localStorage.setItem("token", response.data);
            if (roleId === 3) {
              this.$store.commit('user/setRoleId', roleId);
              console.log(response);
            //   this.$router.push("/home");
            //   setInterval(() => {
            //   location.reload();
            // }, 1000);
            } else {
              this.$store.commit('user/setRoleId', roleId);

            }
          } else {
            this.$message.error(response.message);
          }
          }).catch((error) => {
            console.log(error);
          })
        }
      },
      toRegister() {
        this.$router.push('/register');
      },
      loginByMail() {
        this.$router.push('/loginByEmail');
      },
      loginByPhone() {
        this.$router.push('/loginByPhone');
      }
    }
}
</script>

<style>
#wrapper {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
}

#poster {
  border-radius: 15px;
  margin-left: 40%; 
  width: 350px;
  margin: 180px auto;
  padding-top: 30px;  
  padding-left: 30px;  
  padding-right: 30px;
  padding-bottom: 10px;
  border-radius: 12px;
  opacity: 1;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(129, 129, 130, 1); 
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}
.login-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 5%;
}
#stu-btn {
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(222, 71, 71, 1);
  text-align: left;
  vertical-align: top;
  opacity: 1;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
}

#tea-btn {
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(115, 109, 109, 1);
  text-align: left;
  vertical-align: top;
  opacity: 1;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
}

#admin-btn {
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(115, 109, 109, 1);
  text-align: left;
  vertical-align: top;
  opacity: 1;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
}

#forget {
  margin-left: 275px;
}

.input {
  margin-bottom: 10px;
}

#check-and-forget {
  margin-bottom: 10px;
}

#check {
  -webkit-text-fill-color: black;
  margin-right: 150px;
}

#login-btn {
  opacity: 1;
  font-size: 24px;
  letter-spacing: 0px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  vertical-align: top;
  border-radius: 25px;
  background: rgba(222, 71, 71, 1);
  width: 350px;
}

#register-btn {
  display: flex;
  opacity: 1;
  font-size: 24px;
  letter-spacing: 0px;
  line-height: 0px;
  color: rgba(222, 71, 71, 1);
  text-align: left;
  width: 350px;
  height: 40px;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  color: black
}

i:hover {
  cursor: pointer;
}
</style>