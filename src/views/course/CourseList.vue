<template>
  <div style="display: flex; flex-direction: column; background-color: white; height: calc(100vh - 60px);">
    <div style="margin-top: 1%; display: flex; flex-direction: column;">
      <div style="display: flex; flex-direction: row; align-items: center;">
        <h2 style="margin-left: 8.5%">全部课程</h2>
        <el-input placeholder="请输入内容" v-model="content" clearable id="search-bar" style="margin-left:63%; width: 15%;">
            <el-button slot="append" icon="el-icon-search" @click="getList(content)" id="search-btn"></el-button>
        </el-input>
      </div>
      <div style="margin-left: 8.5%; display: flex; flex-direction: row; align-items: center; justify-self: center;">
        <h4 >标签：</h4>
        <span
        style="padding: 10px; border-radius: 12px;"
        :class="{'selected': selectedTagId == ''}"
        @click="getAll"
        class="all">全部</span>
        <span
        style="padding: 10px; border-radius: 12px; margin: 1%;"
        v-for="tag in tags"
        :key="tag.id"
        :class="{'selected': findId(tag.id)}"
        class="tag"
        @click="toggleTag(tag.id)">
        {{ tag.tagName }}
        </span>
      </div>
      <div style=" margin-left: 8.5%; display: flex; flex-direction: row; align-items: center; justify-self: center; height: 100%;">
        <h4 style="align-self: flex-start;">学科：</h4>
        <span
        style="margin-top: 10px; padding: 10px; border-radius: 12px; align-self: flex-start;"
        @click="getAllSubjects"
        :class="{'selected': subjectId === -1}"
        class="all">全部</span>
        <div style="display: flex; flex-direction: row; align-items: center; flex-wrap: wrap; width: 90%;">
          <span
          style="padding: 10px; border-radius: 12px; margin-left: 1%; margin-right: 1%; margin-top: 0.6%;"
          v-for="subject in subjects"
          :key="subject.id"
          :class="{'selected': subject.id == subjectId}"
          class="subject"
          @click="toggleSubject(subject.id)">
          {{ subject.subjectName }}
          </span>
        </div>
      </div>
      <div class="courses" v-loading="loading">
        <div class="single-course" v-for="course in courseList" :key="course.courseId"
        style="display: flex; flex-direction: column; align-items: center; justify-items: center; width: 16%; margin: 0.5%;">
        <div style="width: 100%;"><img :src="course.imageURL" width="100%" height="100%" style="border-radius: 12px 12px 0px 0px;  object-fit: cover;  aspect-ratio: 16/9;" @click="toCourse(course.courseId)"></div>
          <div id="course-info">
            <span style="margin: 3%; font-size: 20px; font-weight: 800; height: 50%;">{{ course.courseName }}</span>
            <span style="margin: 3%;">{{ course.createUserName }}</span>
            <span style="margin: 3%;">共{{ course.videoCount }}节课</span>
          </div>
        </div>
      </div>
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="size"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="align-self: center; margin-top: 2%;">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs'


export default {
  data() {
    return {
      tags: [],
      selectedTagId: [],
      subjectId: -1,
      subjects: [],
      page: 1,
      size: 15,
      courseList: [],
      count: 0,
      content: '',
      loading: true,
    }
  },
  created() {
    this.getTags();
    this.getList(decodeURI(this.$route.query.key), localStorage.getItem('tagId'));
    this.getSubjects();
    if (localStorage.getItem('tagId')) {
      this.selectedTagId.push(localStorage.getItem('tagId'));
      localStorage.removeItem('tagId');
    }
    if (localStorage.getItem('subjectId')) {
      this.subjectId = localStorage.getItem('subjectId');
      localStorage.removeItem('subjectId');
    }
  },
  methods: {
    getTags() {
      let page = 1;
      let size = 10;
      let ruleForm = {
        page,
        size
      }
      this.$store.dispatch('admin/getTags', ruleForm)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.tags = response.data.list;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    getList(name, tagId) {
      let tagIds = this.selectedTagId;
      let subjectId = this.subjectId;
      let page = this.page;
      let size = this.size;
      let courseName = name;
      if (name) {
        page = 1;
      }
      if (this.subjectId === -1) {
        subjectId = '';
      }
      if (tagId) {
        tagIds = [];
        tagIds.push(tagId);
      }
      axios.get('http://localhost:8888/course/getList', {
        params: {
          page: page,
          size: size,
          courseName: courseName,
          subjectId: subjectId,
          tagIds: tagIds
        },
        paramsSerializer: {
          serialize: function (params) {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          }
        },
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(response => {
        console.log(response);
        if (response.data.code === 200) {
          this.courseList = response.data.data.list;
          this.count = response.data.data.count;
          this.loading = false;
        } else {
          this.$message.error(response.data.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    getSubjects() {
      let page = 1;
      let size = 20;
      let form = {
        page,
        size
      };
      this.$store.dispatch('admin/getSubjects', form)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.subjects = response.data.list;
          this.count = response.data.count;
          console.log(this.subjects);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      })
    },
    toggleTag(id) {
      console.log(id)
      let found = this.selectedTagId.find(item => {
        return item === id;
      });
      if (!found) {
        this.selectedTagId.push(id);
      } else {
        this.selectedTagId.splice(this.selectedTagId.indexOf(found) , 1);
      }
      this.getList();
    },
    findId(id) {
      let found = this.selectedTagId.find(item => {
        return item == id;
      });
      if (!found) {
        return false;
      } else {
        return true;
      }
    },
    getAll() {
      this.selectedTagId = [];
      this.getList();
    },
    getAllSubjects() {
      this.subjectId = -1;
      this.getList();
    },
    toggleSubject(id) {
      console.log(id)
      this.subjectId = id;
      this.getList();
    },
    toCourse(id) {
      this.$router.push({ path: '/course/:courseId', query: { courseId: id }});
    },
    handleSizeChange(val) {
      this.size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
  }
}
</script>

<style scoped>
.selected {
  background: rgba(222, 71, 71, 1);
  -webkit-text-fill-color: white;
}
.tag:focus {
  background: rgba(222, 71, 71, 1);
  -webkit-text-fill-color: white;
}
.tag:hover {
  cursor: pointer;
}
.subject:focus {
  background: rgba(222, 71, 71, 1);
  -webkit-text-fill-color: white;
}
.subject:hover {
  cursor: pointer;
}
.all:hover {
  cursor: pointer;
}
.courses {
  display: flex;
  flex-flow: row wrap;
  border-radius: 12px;
  background-color: white;
  margin-top: 3%;
  justify-content: center;
}
</style>
