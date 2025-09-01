<template>
  <div>
    <div style="display: flex; margin-top: 1%;">
      <router-link to="/admin/courseAudition"><img src="@/assets/back.png" style="position: fixed;" width="50px" v-if="roleId == 1 && unchecked == 'true'"></router-link>
      <div class="player-container" style="display: flex; flex-direction: column;" ref="playerContainer">
        <d-player ref="player" id="dplayer" :options="options"></d-player>
        <h3>{{ videoName }}</h3>
        <div class="concept-container">
          <h3>本章节所含知识概念</h3>
          <el-tag type="danger" v-for="concept in conceptList" :key="concept.conceptId" style="margin-right: 1%; font-size: 20px; border-radius: 12px;" @click="toConcept(concept)" class="tag">{{ concept.conceptName }}</el-tag>
        </div>
        <div id="course-intro" style="width: 98%;">
          <h3>课程概述</h3>
          <p v-html="courseIntro"></p>
        </div>
      </div>
      <div class="right-side" style="display: flex; flex-direction: column; width: 20%; margin-left: 1%;">
        <div class="video-list" ref="videoList" id="videos">
          <div style="margin-left: 3%;"><h2>{{ courseName }}</h2></div>
          <el-divider></el-divider>
          <div class="video-card scroller">
            <div
            v-for="(video, index) in videoList"
            :key="video.videoId"
            class="video"
            :class="{'selected': currentVideoId === video.videoId}"
            @click="select(video)"> P{{ index + 1 + " " + video.videoName }}</div>
          </div>
        </div>
        <div id="recommendation-container" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
          <div id="title" style="margin-top: 8%; margin-bottom: 2%;"><span id="rec-title">可能感兴趣的知识概念</span></div>
          <el-collapse v-model="activeName" accordion style="width: 100%;" @change="handleChange">
            <el-collapse-item v-for="rec in recommendation" :title="rec.conceptName" :key="rec.id" style="text-align: center;" :name="rec.id">
              <div>
                <span style="margin-left: 75%;" id="more" @click="toConceptVideoList(rec)">查看更多</span>
                <img v-if="imgOneValid" :src="imgOne" width="45%" height="45%" style="margin: 1%; object-fit: cover; aspect-ratio: 16/9;" @click="toConceptVideo(rec, 0)">
                <img v-if="imgTwoValid" :src="imgTwo" width="45%" height="45%" style="margin: 1%; object-fit: cover; aspect-ratio: 16/9;" @click="toConceptVideo(rec, 1)">
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
</div>
</template>

<script>

export default {
  data() {
    return {
      courseName: '',
      videoList: [],
      videoName: '',
      videoConcepts: [],
      currentVideoId: '',
      recommendation: [],
      activeName: '',
      isSelected: false,
      // videoURL: this.$route.query.path,
      videoURL: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      conceptList: [],
      courseIntro: '',
      courseChapter: [],
      autoHeight: {
        maxHeight: ''
      },
      playerHeight: '',
      imgOne: '',
      imgTwo: '',
      roleId: localStorage.getItem('roleId'),
      imgOneValid: false,
      imgTwoValid: false,
      unchecked: this.$route.query.unchecked
    }
  },
  computed: {
    options() {
      return {
        container: document.getElementById('dplayer'),
        mutex: false,
        theme: '#b7daff',
        lang: 'zh-cn',
        screenShot: true,
        hotkey: true,
        preload: "auto",
        volumn: 1,
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2, 3],
        video: {
          url: this.videoURL,
          headers: {
            'token' : localStorage.getItem('token')
          }
        },
        headers : {
          'token' : localStorage.getItem('token')
        }
      }
    }
  },
  mounted() {
    let player = document.getElementsByClassName('dplayer-video-wrap')[0];
    let height = window.getComputedStyle(player).height;
    console.log(height)
    this.playerHeight = height;
    let element = document.getElementById('videos');
    element.style.maxHeight = height;
  },
  created() {
    console.log(this.$route.query.path);
    console.log(this.$route.query.unchecked);
    this.currentVideoId = localStorage.getItem('videoId');
    this.getCourseDetail();
    this.getConcept();
    this.$store.dispatch("course/getRecommendation")
    .then((response) => {
        if (response.code === 200) {
        console.log(response.data.recommendation);
        this.recommendation = response.data.slice(0, 8);
        }
    }).catch(error => {
        console.log(error.response);
    });
  },
  methods: {
    getCourseDetail() {
      let courseId = localStorage.getItem('courseId');
      let data = {
        courseId
      }
      this.$store.dispatch('course/getCourseInfo', data)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
            this.courseImg = response.data.imageSrc;
            this.courseName = response.data.courseName;
            this.courseClassification = response.data.courseClassification;
            this.courseHistory = response.data.courseHistory;
            this.videoList = response.data.videoList;
            this.videoList.forEach(item => {
              this.courseChapter.push(item.videoName)
            })
            this.courseIntro = response.data.courseDescribe;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    getConcept() {
      let videoId = localStorage.getItem('videoId');
      let data = {
        videoId
      }
      this.$store.dispatch('course/getConceptByVideoId', data)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.conceptList = response.data.slice(0, 8);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    select(video) {
      this.currentVideoId = video.videoId;
      this.videoURL = video.videoURL;
      let path = this.videoURL;
      localStorage.setItem('videoId', this.currentVideoId);
      this.$router.push({ path: '/startCourse/:path', query: { path: path }});
      this.$router.go(0);
    },
    toConceptVideo(rec, index) {
      localStorage.setItem('videoId', rec.video[index].videoId);
      localStorage.setItem('courseId', rec.video[index].courseId);
      this.$router.push({ path: '/startCourse/:path', query: { path: rec.video[index].videoURL, courseId: rec.courseId }});
      this.$router.go(0);
    },
    toConceptVideoList(rec) {
      this.$router.push({ path: '/conceptInfo/:conceptId', query: { conceptId: rec.id, conceptName: rec.conceptName }});
    },
    handleChange() {
      this.getVideos();
    },
    getVideos() {
      let conceptId = this.activeName
      let data = {
        page: 1,
        size: 2,
        conceptId
      }
      if (conceptId) {
        this.$store.dispatch('concept/getVideoListByConceptId', data)
          .then(res => {
            if (res.code === 200) {
              console.log(res);
              let recommendation = this.recommendation.find(item => {
                return item.id === this.activeName;
              })
              console.log(recommendation)
              this.recommendation.forEach(item => {
                this.$set(item, 'video', res.data.list)
              })
              console.log(this.recommendation)
              this.imgOneValid = !!res.data.list[0];
              this.imgTwoValid = !!res.data.list[1];
              this.imgOne = this.imgOneValid ? res.data.list[0].coverURL : null;
              this.imgTwo = this.imgTwoValid ? res.data.list[1].coverURL : null;
            } else {
              this.$message.error(res.message);
            }
          }).catch(error => {
            console.log(error);
          })
      }
    },
    toConcept(concept) {
      this.$router.push({ path: '/conceptInfo/:conceptId', query: { conceptId: concept.id, conceptName: concept.conceptName }});
    }
  }
}

</script>

<style scoped>
.player-container {
  margin-left: 9%;
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.video-card {
  overflow-y: scroll;
  height: 85%;
  border-radius: 12px;
}
.video {
  padding: 3%;
}
.video:hover {
  cursor: pointer;
  background-color: rgb(240, 240, 240);
}
.scroller::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.video-list {
  border-radius: 12px;
  background-color: white;
  overflow-y: hidden;
}

.scroller::-webkit-scrollbar-track {
  background-color:transparent;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
.scroller::-webkit-scrollbar-thumb {
  background-color: rgb(147,147,153,0.5);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius:2em;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin: 0px 0;
}
.selected {
  background-color: rgb(223, 225, 235);
}
.tag:hover {
  cursor: pointer;
}
</style>
