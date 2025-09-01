<template>
  <div style="display: flex; overflow: auto; height:calc(100vh - 60px); background: white;" class="infinite-list">
    <div style="margin-left: 20%; margin-top: 1%; width: 60%;" v-infinite-scroll="load">
      <h3 style="padding: 1%;">历史课程</h3>
      <div
      v-for="history in courseList"
      :key="history.courseId"
      class="infinite-list-item"
      infinite-scroll-disabled="disabled"
      infinite-scroll-immediate="false"
      @click="toCourse(history.courseId)">
        <div style="width: 40%"><img :src="history.imageURL" class="cover" style="border-radius: 12px; object-fit: cover; aspect-ratio: 16/9; width: 100%; height: 100%;"></div>
        <div class="course-info" style="margin-left: 1%; width: 100%;">
          <span style="font-size: 20px;">{{ history.courseName }}</span>
          <div style="font-size: small; margin-top: 1%;">{{ history.createUserName }}</div>
          <div class="intro-area" v-html="history.courseIntro"></div>
        </div>
        <div style="align-self: self-end ; width: 40%;">
          {{ history.beginTime }}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  created() {
    this.getHistoryList();
  },
  data() {
    return {
      courseList:[],
      page: 1,
      size: 5
    }
  },
  methods: {
    getHistoryList() {
      let page = this.page;
      let size = this.size;
      let ruleForm = {
        page,
        size
      }
      this.$store.dispatch('user/getHistoryCourses', ruleForm)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.courseList.push(...response.data.list);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    load() {
      this.page++;
      this.getHistoryList();
    },
    toCourse(id) {
      this.$router.push({ path: '/course/:courseId', query: { courseId: id }});
    }
  }
}
</script>

<style scoped>
.infinite-list-item {
  background: white;
  padding: 1%;
  display: flex;
  flex-direction: row;
}
.infinite-list-item:hover {
  cursor: pointer;
}
.intro-area {
  margin-top: 1%;
  width: 80%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>