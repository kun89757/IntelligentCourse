<template>
  <div style="background-color: white; display: flex; flex-direction: column; align-items: center; height: calc(100vh - 60px);">
    <div>
      <el-form ref="form" :model="form" class="search">
        <el-form-item>
          <el-input
            v-model="form.content"
            class="search-input"
            @keyup.enter.native="search">
          </el-input>
          <el-button
          icon="el-icon-search" 
          type="text" 
          style="margin-left: 5%;"
          @click="search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="courses" v-loading="loading">
      <div class="single-course" v-for="course in courseList" :key="course.courseId"
      style="display: flex; flex-direction: column; align-items: center; justify-items: center; width: 16%; margin: 0.5%;">
      <div style="width: 100%;"><img :src="course.imageURL" width="100%" height="100%" style="border-radius: 12px 12px 0px 0px; object-fit: cover;  aspect-ratio: 16/9;" @click="toConcept(course.courseId)"></div>
        <div id="course-info">
          <span style="margin: 3%; font-size: 20px; font-weight: 800; height: 50%;">{{ course.courseName }}</span>
          <span style="margin: 3%;">{{ course.createUserName }}</span>
          <span style="margin: 3%;">共{{ course.videoCount }}节课</span>
        </div>
      </div>
    </div>
    <div style="background-color: white; width: 100%; justify-content: center; align-self: center;">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="size"
        :total="count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        style="margin-top: 2%; margin-left: 40%;">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        content: '',
      },
      page: 1,
      size: 15,
      count: 0,
      courseList: [],
      loading: true,
    }
  },
  created() {
    this.getCourseList();
  },
  methods: {
    search() {
      let courseName = this.form.content;
      let page = 1;
      let size = this.size;
      let ruleForm = {
        page,
        size,
        courseName
      }
      this.$store.dispatch('course/getCourseList', ruleForm)
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
      this.size = val;
      this.getCourseList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getCourseList();
    },
    getCourseList() {
      let page = this.page;
      let size = this.size;
      let ruleForm = {
        page,
        size,
      }
      this.$store.dispatch('course/getCourseList', ruleForm)
      .then(response => {
        console.log(response.code)
        if (response.code === 200) {
          console.log(response);
          this.courseList = response.data.list;
          this.count = response.data.count;
          this.loading = false;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      })
    },
    toConcept(id) {
      this.$router.push({ path: '/conceptList/:courseId', query: { courseId: id }});
    }
  }
}
</script>

<style scoped>
.search {
  margin-top: 20%;
  width: 150%;
  margin-left: -25%;
  border-radius: 50px;
  padding: 0;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}
.search-input {
  font-size: 24px;
  width: 80%;
  padding-left: 3%;
  padding-right: 3%;
}
.search-input>>>.el-input__inner {
  border: 0;
}
.courses {
  display: flex;
  flex-flow: row wrap;
  border-radius: 12px;
  background-color: white;
  margin-top: 3%;
  justify-content: center;
  width: 100%;
  height: auto;
}
</style>