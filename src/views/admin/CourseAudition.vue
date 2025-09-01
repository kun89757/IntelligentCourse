<template>
  <div style="background-color: white; margin: 0.5%; border-radius: 12px; padding: 1%; height: calc(100vh - 60px);">
    <div style="display: flex; flex-direction: column; align-items: flex-start;">
        <div style="display: flex; flex-direction: row;" >
          <el-form :model="searchForm" style="display: flex; flex-direction: row;">
              <el-form-item style="margin-left: 1%;">
                  <el-input v-model="searchForm.courseName" placeholder="请输入课程名" clearable></el-input>
              </el-form-item>
              <el-form-item style="margin-left: 1%;">
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              </el-form-item>
          </el-form>
        </div>
        <el-table
          :data="courseList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="courseId"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="courseName"
            label="课程名">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <div style="display: flex;">
                <div><el-button @click="handleIntro(scope.row)" size="small" class="edit-btn">查看</el-button></div>
                <div><el-button slot="reference" type="text" size="small" @click="getId(scope.row.courseId)" class="delete-btn">审核</el-button></div>          
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
      <span>确认是否通过</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="audition(false)">不通过</el-button>
        <el-button type="primary" @click="audition(true)">通过</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Course from '../course/Course.vue';

export default {
  components: {
    Course
  },
  data() {
    return {
      courseList: [{
      }],
      count: 0,
      pageSize: 13,
      currentPage: 1,
      form: {
        courseId: '',
        courseName: '',
      },
      searchForm: {
        courseName: ''
      },
      dialogVisible: false,
      auditionId: 0,
      dialogTitle: '新概念',
    }
  },
  methods: {
    getCourseList(p) {
      let size = this.pageSize;
      let page = this.currentPage;
      if (p) {
        page = 1;
      }
      let courseName = this.searchForm.courseName;
      let form = {
        page,
        size,
        courseName
      };
      this.$store.dispatch('admin/getUncheckedList', form)
      .then(response => {
        console.log(response.code)
        if (response.code === 200) {
          console.log(response);
          this.courseList = response.data.list;
          this.count = response.data.count;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      }) 
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCourseList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCourseList();
    },
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    handleIntro(course) {
      this.$router.push({ path: '/course/:courseId/:unchecked?', query: { courseId: course.courseId, unchecked: true }});
    },
    getId(id) {
      this.dialogVisible = true;
      this.auditionId = id;
      console.log(id);
    },
    audition(auditionState) {
      this.dialogVisible = false;
      let courseId = this.auditionId;
      let passed = auditionState;
      let form = {
        courseId,
        passed
      };
      this.$store.dispatch('admin/courseAudition', form)
      .then(response => {
        if (response.code === 200) {
          this.$message.success(response.message);
          this.getCourseList();
          console.log(response);
        } else {
          this.getCourseList();
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    search() {
      this.getCourseList(1);
    }
  },
  created() {
    this.getCourseList();
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