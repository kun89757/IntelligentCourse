<template>
  <div style="background-color: white; margin: 0.5%; border-radius: 12px; padding: 1%;">
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
      <div style="display: flex; flex-direction: row;" >
        <el-button class="add" @click="handleAdd" style="height: 100%;">新增用户</el-button>
        <div style="margin-left: 10%">
            <el-form :model="searchForm" style="display: flex; flex-direction: row;">
                <el-form-item style="margin-left: 1%;">
                    <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 1%;">
                    <el-input v-model="searchForm.nickname" placeholder="请输入用户昵称" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 1%;">
                    <el-select v-model="searchForm.classification" placeholder="请选择用户类型" clearable="">
                        <el-option label="普通用户" value="普通用户"></el-option>
                        <el-option label="教师" value="教师"></el-option>
                        <el-option label="管理员" value="管理员"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item style="margin-left: 1%;">
                    <el-input v-model="searchForm.email" placeholder="请输入用户邮箱" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 1%;">
                    <el-input v-model="searchForm.phone" placeholder="请输入用户手机号" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 1%;">
                  <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
            </div>
          </div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" id="dialog" style="align-self: center;" width="30%">
        <el-form :model="form">
          <el-form-item label="编号" :label-width="formLabelWidth"  v-show="dialogTitle === '编辑用户'">
            <el-input v-model="form.userId" autocomplete="off" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户类别" :label-width="formLabelWidth">
            <el-select v-model="form.classification" placeholder="请选择用户类型">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="教师" value="教师"></el-option>
              <el-option label="管理员" value="管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="fakePassword" autocomplete="off" show-password oncopy="return false" @click.native="empty"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
      </el-dialog>
        <el-table
          :data="userList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="userId"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="classification"
            label="用户类别">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex;">
                <div><el-button @click="handleEdit(scope.row)" size="small" class="edit-btn">编辑</el-button></div>
                <div><el-button slot="reference" type="text" size="small" @click="getId(scope.row.userId)" class="delete-btn">删除</el-button></div>          
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="align-self: center;">
        </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>确定删除吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      userList: [{
      }],
      count: 0,
      pageSize: 13,
      currentPage: 1,
      dialogFormVisible: false,
      form: {
        userId: '',
        username: '',
        nickname: '',
        email: '',
        classification: '',
        password: '',
        phone: ''
      },
      formLabelWidth: '120px',
      dialogVisible: false,
      deleteId: 0,
      dialogTitle: '新用户',
      searchForm: {
        username: '',
        email: '',
        classification: [
          '普通用户',
          '教师',
          '管理员'
        ],
        phone: '',
        nickname: ''
      },
      classification: ['未知', '管理员', '教师', '普通用户'],
      fakePassword: '123456789',
      isModified: false
    }
  },
  methods: {
    getUserList(username, nickname, roleId, email, phone) {
      if (roleId === -1) {
        roleId = null;
      }
      let size = this.pageSize;
      let page = this.currentPage;
      let form = {
        page,
        size,
        username: username,
        nickname: nickname,
        roleId: roleId,
        email: email,
        phone: phone
      };
      this.$store.dispatch('admin/getUserList', form)
      .then(response => {
        console.log(response.code)
        if (response.code === 200) {
          console.log(response);
          this.userList = response.data.list;
          this.count = response.data.count;
          this.userList.forEach(item => {
            this.$set(item, 'classification', this.classification[item.roleId])
          })
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      }) 
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserList(this.searchForm.username, this.searchForm.nickname, this.classification.indexOf(this.searchForm.classification), this.searchForm.email, this.searchForm.phone);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList(this.searchForm.username, this.searchForm.nickname, this.classification.indexOf(this.searchForm.classification), this.searchForm.email, this.searchForm.phone);
    },
    submit() {
      if (this.dialogTitle === '新用户') {
        this.dialogFormVisible = false;
        if (!this.form.username) {
          this.$message.error("用户名不能为空!");
          this.form.username = '';
          return;
        } else if (!this.form.nickname) {
          this.$message.error('昵称不能为空');
          this.form.nickname = '';
          return;
        } else if (!this.form.classification) {
          this.$message.error("用户类型不能为空!");
          this.form.classification = '';
          return;
        } else if (!this.checkEmail()) {
          this.$message.error("请输入正确的邮箱!");
          this.form.email = ''
          return;
        } else if (!this.form.phone) {
          this.$message.error("手机号不能为空!");
          this.form.phone = '';
          return;
        } else if (!this.fakePassword) {
          this.$message.error("密码不能为空!");
          this.fakePassword = '';
          return;
        }
        const username = this.form.username;
        const roleId = this.classification.indexOf(this.form.classification);
        const email = this.form.email;
        const phone = this.form.phone;
        const nickname = this.form.nickname;
        const password = this.$md5(this.fakePassword);
        const ruleForm = {
          username,
          nickname,
          roleId,
          email,
          phone,
          password
        };
        this.$store.dispatch('admin/addUser', ruleForm)
        .then(response => {
          if (response.code === 200) {
            console.log(response);
            this.getUserList();
            this.$message.success('新增成功');
          } else {
            this.$message.error(response.message);
          }
        }).catch(error => {
          console.log(error);
        })
        this.form.username = '';
        this.form.nickname = '';
        this.form.email = '';
        this.form.classification = '';
        this.form.password = '';
        this.form.phone = '';
      } else {
        this.dialogFormVisible = false;
        const userId = this.form.userId;
        const username = this.form.username;
        const nickname = this.form.nickname;
        const roleId = this.classification.indexOf(this.form.classification);
        const email = this.form.email;
        const phone = this.form.phone;
        let password = null;
        if (this.isModified && this.fakePassword === '') {
          password = null;
        } else if (this.isModified && this.fakePassword !== '') {
          password = this.$md5(this.fakePassword);
        } else {
          password = null;
        }
        let ruleForm = {
          userId,
          username,
          nickname,
          roleId,
          email,
          phone,
          password
        };
        this.$store.dispatch('admin/editUser', ruleForm)
        .then(response =>  {
          if (response.code === 200) {
            console.log(response);
            this.$message.success('编辑成功');
            this.getUserList(null, nickname);
          } else {
            this.$message.error(response.message);
          }
        }).catch(error => {
          console.log(error);
        })
      }
    },
    checkEmail() {
      if (!this.form.email) {
          return false;
      } else {
          let reg =
          /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(this.form.email)) {
          return false;
          }
          return true;
      }
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    getId(id) {
      this.dialogVisible = true;
      this.deleteId = id;
    },
    deleteUser() {
      this.dialogVisible = false;
      let userId = this.deleteId;
      console.log(userId);
      let form = {
        userId
      };
      this.$store.dispatch('admin/deleteUser', form)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.$message.success("用户删除成功");
          this.getUserList(this.searchForm.username, this.searchForm.nickname, this.searchForm.classification, this.searchForm.email, this.searchForm.phone);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    handleAdd() {
      this.form.username = '';
      this.form.nickname = '';
      this.form.email = '';
      this.form.classification = '';
      this.fakePassword = '';
      this.form.phone = '';
      this.dialogFormVisible = true;
      this.dialogTitle = '新用户';
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.dialogTitle = '编辑用户';
      this.form.userId = row.userId;
      this.form.username = row.username;
      this.form.nickname = row.nickname;
      this.form.classification = row.classification;
      this.form.email = row.email;
      this.form.phone = row.phone;
      this.form.password = row.password;
    },
    search() {
      let size = this.pageSize;
      let page = 1;
      let username = this.searchForm.username;
      let nickname = this.searchForm.nickname;
      let roleId = this.classification.indexOf(this.searchForm.classification);
      let email = this.searchForm.email;
      let phone = this.searchForm.phone;
      let form = {
        page,
        size,
        username,
        nickname,
        roleId,
        email,
        phone
      };
      if (this.searchForm.classification == '') {
        form = {
          page,
          size,
          username,
          nickname,
          email,
          phone
        };
      }
      this.$store.dispatch('admin/getUserList', form)
      .then(response => {
        console.log(response.code)
        if (response.code === 200) {
          console.log(response);
          this.userList = response.data.list;
          this.count = response.data.count;
          this.userList.forEach(item => {
            this.$set(item, 'classification', this.classification[item.roleId])
          })
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      })
    },
    empty() {
      this.fakePassword = '';
      this.isModified = true;
    }
  },
  created() {
    this.getUserList();
  }
}
</script>

<style>
.add {
  background: rgba(222, 71, 71, 1);
  color: aliceblue;
}
.edit-btn {
  background: rgba(222, 71, 71, 1);
  color: aliceblue;
}
.delete-btn {
  -webkit-text-fill-color: rgba(222, 71, 71, 1);
  margin-left: 100%;
}
.edit-btn:hover {
  background: rgba(222, 71, 71, 1);
  color: aliceblue;
}
.add:hover {
  background: rgba(222, 71, 71, 1);
  color: aliceblue;
}
</style>