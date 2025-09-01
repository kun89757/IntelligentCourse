<template>
  <div style="background-color: white; height: calc(100vh - 50px); display: flex; flex-direction: column;">
    <div style="margin-left: 10%; margin-top: 1%; font-size: 24px; font-weight: 800;">
      <span>{{ this.$route.query.conceptName }}</span>
    </div>
    <div class="videos">
      <div class="single-video" v-for="video in videoList" :key="video.videoId" @click="toVideo(video)"
      style="display: flex; flex-direction: column; align-items: center; justify-items: center; width: 16%; height: 10%; margin: 0.5%;">
      <div><img :src="video.coverURL" width="100%" height="100%" style="border-radius: 12px 12px 0px 0px;  object-fit: cover;  aspect-ratio: 16/9;"></div>
        <div id="course-info" style="height: 200%; width: 100%;">
          <span style="width: 90%; margin: 3%; font-size: 16px; font-weight: 800; overflow-x: hidden; white-space: nowrap; text-overflow: ellipsis;">{{ video.videoName }}</span>
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
</template>

<script>

export default {
  data() {
    return {
      page: 1,
      size: 15,
      count: 0,
      videoList: []
    }
  },
  created() {
    this.getVideoList();
    console.log(this.$route.query.conceptId)
  },
  methods: {
    getVideoList() {
      let page = this.page;
      let size = this.size;
      let conceptId = this.$route.query.conceptId;
      let ruleForm = {
        page,
        size,
        conceptId
      }
      this.$store.dispatch('concept/getVideoListByConceptId', ruleForm)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.videoList = response.data.list;
          this.count = response.data.count;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    handleSizeChange(val) {
      this.size = val;
      this.getVideoList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getVideoList();
    },
    toVideo(video) {
      localStorage.setItem('videoId', video.videoId);
      localStorage.setItem('courseId', video.courseId);
      console.log(video.courseId);
      this.$router.push({ path: '/startCourse/:path', query: { path: video.videoURL, courseId: video.courseId }});
    }
  }
}
</script>

<style scoped>
.videos {
  display: flex;
  flex-flow: row wrap;
  border-radius: 12px;
  background-color: white;
  margin-top: 3%;
  justify-content: center;
}

</style>