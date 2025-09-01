<template>
  <div style="background-color: white; margin: 0.5%; border-radius: 12px; padding: 1%;">
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="display: flex; flex-direction: row;" >
          <el-form :model="searchForm" style="display: flex; flex-direction: row;">
              <el-form-item style="margin-left: 1%;">
                  <el-input v-model="searchForm.username" placeholder="请输入用户名" clearable></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 1%;">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              </el-form-item>
          </el-form>
        </div>
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
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex;">
                <div>
                  <el-button size="small" class="edit-btn" @click="getUserConceptList(scope.row)">查看推荐</el-button>
                </div>
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
        <el-card class="rec-card" v-show="click">
          <div slot="header" class="clearfix">
            <span>系统推荐</span> <span><el-button @click="click = false" style="margin-left: 57%;">返回</el-button></span>
          </div>
          <div v-loading="loading">
            <div v-for="concept in userConcept" :key="concept.conceptId" class="text item" style="display: flex; justify-content: space-between; align-items: center;">
              <span>{{ concept.conceptName }}</span>
              <el-button @click="modify(concept.id)">删除</el-button>
            </div>
          </div>
        </el-card>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form label-position="right" label-width="80px" :model="conceptForm">
            确认删除吗
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="ensureModify">确 定</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import Clickoutside from 'element-ui/src/utils/clickoutside'

export default {
  directives: {
    Clickoutside
  },

  data() {
    return {
      dialogVisible: false,
      userList: [{
      }],
      count: 0,
      pageSize: 13,
      currentPage: 1,
      userConcept: [],
      searchForm: {
        username: ''
      },
      click: false,
      editId: -1,
      modifyId: -1,
      conceptForm: {
        conceptName: ''
      },
      loading: true,
    }
  },
  methods: {
    getUserList(p) {
      let size = this.pageSize;
      let page = this.currentPage;
      if (p) {
        page = 1;
      }
      let username = this.searchForm.username;
      let form = {
        page,
        size,
        username
      };
      this.$store.dispatch('admin/getUserList', form)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.userList = response.data.list;
          this.count = response.data.count;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      }) 
    },
    getUserConceptList(row) {
      this.click = true;
      this.editId = row.userId;
      let userId = row.userId;
      let data = {
        userId
      }
      this.$store.dispatch('admin/getTop50', data)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.userConcept = response.data;
          this.loading = false;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    },
    search() {
      this.getUserList(1);
    },
    modify(id) {
      this.dialogVisible = true;
      this.modifyId = id;
    },
    ensureModify() {
      let conceptId = this.modifyId;
      console.log(this.modifyId)
      let userId = this.editId;
      let ruleForm = {
        userId,
        conceptId,
      }
      this.$store.dispatch('admin/conceptRecommendDel', ruleForm)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          let row = {
            editId: this.editId,
            userId: userId
          }
          this.$message.success('删除成功');
          this.getUserConceptList(row);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
      this.dialogVisible = false;
      this.conceptForm.conceptName = '';
      let data = {
        userId
      }
      this.$store.dispatch('admin/getTop50', data)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.userConcept = response.data;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
  },
  created() {
    this.getUserList();
  }
}
</script>

<style>
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
.rec-card {
  position: absolute;
  top: 20%;
  left: 40%;
  width: 20vw; 
  height: 60vh;
  overflow-y: scroll;
}
.text {
    font-size: 14px;
  }

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>