<template>
  <div class="admin-wrapper">
    <div style="margin-left: 10%; width: 100%;">
        <el-upload
            class="avatar-uploader"
            action="http://localhost:8888/image/setAvatar"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="headers">
            <img v-if="avatarURL !== ''" :src="avatarURL" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
    <div style="display: flex; flex-direction: row; margin-left: 10%; width: 100%;">
      <div style="margin-top: 5%; margin-right: 15%;">
        <el-form ref="form" :model="formOne" label-width="80px">
          <el-form-item class="profile" label="用户ID">
            <el-input v-model="formOne.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="profile" label="用户昵称">
            <el-input v-model="formOne.nickname"></el-input>
          </el-form-item>
          <el-form-item class="profile" label="用户角色">
            <el-input v-model="formOne.role" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item class="profile" label="手机号">
            <el-input v-model="phone"></el-input>
          </el-form-item>
          <el-form-item class="profile" label="邮箱">
            <el-input v-model="formOne.email" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-button style="background: rgba(222, 71, 71, 1); color: aliceblue; margin-left: 5%;" @click="updateNickname">提交</el-button>
      </div>
      <div style="width: 25%;">
        <h3>修改密码</h3>
        <el-form ref="formTwo" :model="formTwo">
          <el-form-item label="旧密码">
            <el-input v-model="formTwo.oldPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="formTwo.newPassword" show-password></el-input>
          </el-form-item>
          <el-form-item label="重复密码">
            <el-input v-model="formTwo.repeatPassword" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button style="background: rgba(222, 71, 71, 1); color: aliceblue;" @click="updatePassword">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
            nickname: '',
            avatarURL: '',
            username: '',
            email: '',
            phone: '',
            role: ['未知', '管理员', '教师', '普通用户'],
            formOne: {
              username: '',
              nickname: '',
              role: ''
            },
            formTwo: {
              oldPassword: '',
              newPassword: '',
              repeatPassword: ''
            },
            roleId: '',
            headers: {
              token: localStorage.getItem('token')
            }
        }
    },
    created() {
      this.getUserInfo();
    },
    mounted() {

    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.avatarURL = URL.createObjectURL(file.raw);
        this.$store.commit('user/setAvatar', this.avatarURL);
        if (res.code === 200) {
            console.log(res);
            this.$message.success('头像修改成功');
            this.$router.go(0);
        } else {
            this.$message.error(res.message);
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      getUserInfo() {
        this.$store.dispatch("user/getCurrentUserDetail")
        .then((response) => {
          if (response.code === 200) {
            console.log(response.data);
            this.avatarURL = response.data.avatarURL;
            this.username = response.data.username;
            this.nickname = response.data.nickname;
            this.email = response.data.email;
            this.phone = response.data.phone;
            this.roleId = response.data.roleId;
            this.formOne.username = response.data.username;
            this.formOne.nickname = response.data.nickname;
            this.formOne.email = response.data.email;
            this.formOne.phone = response.data.phone;
            this.formOne.role = this.role[response.data.roleId];
          }
        }).catch(error => {
          console.log(error);
        });
      },
      updateNickname() {
        if (!this.formOne.nickname) {
          this.$message.error('昵称不能为空');
          return;
        } else if (!this.phone) {
          this.$message.error('手机号不能为空');
          return;
        }
        let data = {
          nickname: this.formOne.nickname,
          phone: this.phone
        }
        this.$store.dispatch('user/updateNickname', data)
        .then(res => {
          if (res.code === 200) {
            console.log(res);
            this.$message.success('信息修改成功');
          } else {
            this.$message.error(res.message);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      updatePassword() {
        if (!this.formTwo.oldPassword) {
          this.$message.error('请输入旧密码');
          return;
        } else if (!this.formTwo.newPassword) {
          this.$message.error('请输入新密码');
          return;
        } else if (!this.formTwo.repeatPassword || this.formTwo.newPassword !== this.formTwo.repeatPassword) {
          this.$message.error('两次密码必须一致');
          return;
        }
        let oldPassword = this.$md5(this.formTwo.oldPassword);
        let newPassword = this.$md5(this.formTwo.newPassword);
        let data = {
          oldPassword,
          newPassword
        }
        this.$store.dispatch('user/changePassword', data)
        .then(res => {
          if (res.code === 200) {
            console.log(res);
            this.$message.success('密码修改成功');
            this.logout();
          } else {
            this.$message.error(res.message);
          }
        }).catch(error => {
          console.log(error)
        })
      },
      logout() {
            this.$store.dispatch('login/logout')
            .then(response => {
                if (response.code === 200) {
                    console.log(response);
                } else {
                    this.$message.error(response.message);
                }
            }).catch(error => {
                console.log(error);
            })
            localStorage.clear();
            this.$router.go(0);
        },
    }
}
</script>

<style>
.admin-wrapper {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-items: center;
    height: 80vh;
    width: 60vw;
    margin-left: 20vw;
    margin-top: 5vh;
    padding: 1%;
    border-radius: 24px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .profile {
    margin-bottom: 15%;
  }
</style>
