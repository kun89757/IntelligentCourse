<template>
  <div class="main-container" style="display: flex; flex-direction: column;">
    <i class="el-icon-headset"
    style="font-size: 25px; position: fixed; margin-left: 98%; margin-top: 40%;"
    @click="toFeedback">
    </i>
    <div class="topArea">
      <div class="banner" style="position: absolute; margin-left: 32%; height: 51.47px; background: white; opacity: 1; z-index: 100;" v-show="show[0]"  @mouseenter="drawOut(0)" @mouseleave="drawIn(0)">
        <el-link :underline="false" @click="toLink(1)" class="link" type="danger" style="margin-left: 10%;">冲刺课</el-link>
        <el-link :underline="false" @click="toLink(2)" class="link" type="danger">复习课</el-link>
        <el-link :underline="false" @click="toLink(3)" class="link" type="danger">精品好课</el-link>
        <el-link :underline="false" @click="toLink(4)" class="link" type="danger">专业课</el-link>
      </div>
      <div class="banner" style="position: absolute; margin-left: 32%; height: 51.47px; margin-top: 51.47px; background: white; opacity: 1; z-index: 100;" v-show="show[1]" @mouseenter="drawOut(1)" @mouseleave="drawIn(1)">
        <el-link :underline="false" @click="toLink(5)" class="link" type="danger" style="margin-left: 10%;">通识课</el-link>
        <el-link :underline="false" @click="toLink(6)" class="link" type="danger">互动课</el-link>
        <el-link :underline="false" @click="toLink(7)" class="link" type="danger">认证课</el-link>
        <el-link :underline="false" @click="toLink(8)" class="link" type="danger">好评过千</el-link>
      </div>
      <div class="banner" style="position: absolute; margin-left: 32%; height: 51.47px; margin-top: 102.94px; background: white; opacity: 1; z-index: 100;" v-show="show[2]" @mouseenter="drawOut(2)" @mouseleave="drawIn(2)">
        <el-link :underline="false" @click="toSubject(1)" class="link" type="danger" style="margin-left: 10%;">计算机科学技术</el-link>
        <el-link :underline="false" @click="toSubject(2)" class="link" type="danger">管理科学技术</el-link>
        <el-link :underline="false" @click="toSubject(3)" class="link" type="danger">物理学</el-link>
        <el-link :underline="false" @click="toSubject(4)" class="link" type="danger">数学</el-link>
      </div>
      <div class="banner" style="position: absolute; margin-left: 32%; height: 51.47px; margin-top: 154.41px; background: white; opacity: 1; z-index: 100;" v-show="show[3]" @mouseenter="drawOut(3)" @mouseleave="drawIn(3)">
        <el-link :underline="false" @click="toSubject(5)" class="link" type="danger" style="margin-left: 10%;">医学</el-link>
        <el-link :underline="false" @click="toSubject(6)" class="link" type="danger">电子学</el-link>
        <el-link :underline="false" @click="toSubject(7)" class="link" type="danger">电气工程</el-link>
        <el-link :underline="false" @click="toSubject(8)" class="link" type="danger">机械工程</el-link>
      </div>
      <div class="banner" style="position: absolute; margin-left: 32%; height: 51.47px; margin-top: 205.88px; background: white; opacity: 1; z-index: 100;" v-show="show[4]" @mouseenter="drawOut(4)" @mouseleave="drawIn(4)">
        <el-link :underline="false" @click="toSubject(9)" class="link" type="danger" style="margin-left: 10%;">自然辩证法</el-link>
        <el-link :underline="false" @click="toSubject(10)" class="link" type="danger">材料科学技术</el-link>
        <el-link :underline="false" @click="toSubject(11)" class="link" type="danger">建筑学</el-link>
        <el-link :underline="false" @click="toSubject(12)" class="link" type="danger">语言学</el-link>
      </div>
      <div class="banner" style="position: absolute; margin-left: 32%; height: 51.47px; margin-top: 257.35px; background: white; opacity: 1; z-index: 100;" v-show="show[5]" @mouseenter="drawOut(5)" @mouseleave="drawIn(5)">
        <el-link :underline="false" @click="toSubject(13)" class="link" type="danger" style="margin-left: 10%;">化学</el-link>
        <el-link :underline="false" @click="toSubject(14)" class="link" type="danger">地理学</el-link>
        <el-link :underline="false" @click="toSubject(15)" class="link" type="danger">教育学</el-link>
        <el-link :underline="false" @click="toSubject(16)" class="link" type="danger">地质学</el-link>
      </div>
      <div class="banner" style="position: absolute; margin-left: 32%; height: 51.47px; margin-top: 308.82px; background: white; opacity: 1; z-index: 100;" v-show="show[6]" @mouseenter="drawOut(6)" @mouseleave="drawIn(6)">
        <el-link :underline="false" @click="toSubject(17)" class="link" type="danger" style="margin-left: 10%;">心理学</el-link>
        <el-link :underline="false" @click="toSubject(18)" class="link" type="danger">农学</el-link>
        <el-link :underline="false" @click="toSubject(19)" class="link" type="danger">免疫学</el-link>
        <el-link :underline="false" @click="toSubject(20)" class="link" type="danger">世界历史</el-link>
      </div>
      <div id="classification">
        <div class="drawer-btn" style="border-top-left-radius: 10px;border-top-right-radius: 10px;" @mouseenter="drawOut(0)" @mouseleave="drawIn(0)">冲刺课/复习课/精品好课</div>
        <div class="drawer-btn" @mouseenter="drawOut(1)" @mouseleave="drawIn(1)">通识课/互动课/认证课...</div>
        <div class="drawer-btn" @mouseenter="drawOut(2)" @mouseleave="drawIn(2)">计算机科学技术/管理科...</div>
        <div class="drawer-btn" @mouseenter="drawOut(3)" @mouseleave="drawIn(3)">医学/电子学/电气工程/机...</div>
        <div class="drawer-btn" @mouseenter="drawOut(4)" @mouseleave="drawIn(4)">自然辩证法/材料科学技术...</div>
        <div class="drawer-btn" @mouseenter="drawOut(5)" @mouseleave="drawIn(5)">化学/地理学/教育学/地质...</div>
        <div class="drawer-btn" style="border-bottom-left-radius: 10px;border-bottom-right-radius: 10px;" @mouseenter="drawOut(6)" @mouseleave="drawIn(6)">心理学/农学/免疫学/世界...</div>
      </div>
      <div id="carousel">
        <el-carousel indicator-position="outside" height="360px" width="100%">
        <el-carousel-item v-for="item in carousel" :key="item.id" style="text-align: center;">
          <img :src="item.imageURL"  height="360px" alt="" @click="toCourse(item.courseId)" style="border-radius: 8px; object-fit: cover;  aspect-ratio: 16/9;">
        </el-carousel-item>
      </el-carousel>
      </div>
      <div id="profile">
        <div style="display: flex; margin-top: 20px;">
          <el-avatar ref="avatar" style="margin: auto;" :src="avatar" :size="100"></el-avatar>
        </div>
        <div style="display: flex; margin-top: 10px;"><span style="margin: auto; margin-bottom: 2%;">{{ nickname }}</span></div>
        <div>
          <div class="history-container" v-for="history in historyCourses" :key="history.courseId"><el-button type="text" id="course" v-show="isLogin" @click="toCourse(history.courseId)">{{ history.courseName }}</el-button></div>
          <router-link to="historyCourse"><div style="display: flex; margin-top: 20px;"><el-button style="margin: auto;" v-show="isLogin" id="down-btn">课程学习</el-button></div></router-link>
          <div style="display: flex; margin-top: 140px;"><el-button style="margin: auto;" v-show="!isLogin" id="down-btn" @click="toLogin">登录/注册</el-button></div>
        </div>
      </div>
      <div id="recommendation-container" v-show="isLogin" style="display: flex; flex-direction: column; align-items: center; z-index: 9999;">
        <div id="title" style="margin-bottom: 2%;"><span id="rec-title">可能感兴趣的知识概念</span></div>
        <el-collapse v-model="activeName" accordion style="width: 80%;" @change="handleChange">
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
    <div id="elaborate">
      <div id="title" style="margin-bottom: 10px; margin-left: 20%;">
        <span id="elaborate-title">精品好课</span>
        <span id="more" style="margin-left: 14%" @click="moreEla">查看更多</span>
      </div>
      <div id="elaborate-course">
        <div class="ela" v-for="ela in elaborateCourses" :key="ela.courseId"
         style="display: flex; flex-direction: column; align-items: center; justify-items: center; width: 20%;; margin: 2.5%;">
         <div style="width: 100%;"><img :src="ela.imageURL" width="100%" height="100%" style="border-radius: 12px 12px 0px 0px; object-fit: cover;  aspect-ratio: 16/9;" alt="" @click="toCourse(ela.courseId)"></div>
         <div id="course-info">
          <span style="margin: 3%; font-size: 20px; font-weight: 800; height: 50%;">{{ ela.courseName }}</span>
          <span style="margin: 3%;">{{ ela.createUserName }}</span>
          <span style="margin: 3%;">共{{ ela.videoCount }}节课</span>
        </div>
        </div>
      </div>
    </div>
    <div id="elaborate">
      <div id="title" style="margin-bottom: 10px; margin-left: 20%;">
        <span id="elaborate-title">冲刺佳课</span>
        <span id="more" style="margin-left: 14%" @click="moreRace">查看更多</span>
      </div>
      <div id="elaborate-course">
        <div class="ela" v-for="ela in racingCourses" :key="ela.courseId"
         style="display: flex; flex-direction: column; align-items: center; justify-items: center; width: 20%;; margin: 2.5%;">
         <div style="width: 100%;"><img :src="ela.imageURL" width="100%" height="100%" style="border-radius: 12px 12px 0px 0px; object-fit: cover; aspect-ratio: 16/9;" alt="" @click="toCourse(ela.courseId)"></div>
         <div id="course-info">
          <span style="margin: 3%; font-size: 20px; font-weight: 800; height: 50%;">{{ ela.courseName }}</span>
          <span style="margin: 3%;">{{ ela.createUserName }}</span>
          <span style="margin: 3%;">共{{ ela.videoCount }}节课</span>
        </div>
        </div>
      </div>
    </div>
    <div id="elaborate">
      <div id="title" style="margin-bottom: 10px; margin-left: 20%;">
        <span id="elaborate-title">好评如潮</span>
        <span id="more" style="margin-left: 14%" @click="moreGoodComment">查看更多</span>
      </div>
      <div id="elaborate-course">
        <div class="ela" v-for="ela in goodCommentCourses" :key="ela.courseId"
         style="display: flex; flex-direction: column; align-items: center; justify-items: center; width: 20%;; margin: 2.5%;">
         <div style="width: 100%;"><img :src="ela.imageURL" width="100%" height="100%" style="border-radius: 12px 12px 0px 0px; object-fit: cover;  aspect-ratio: 16/9;" alt="" @click="toCourse(ela.courseId)"></div>
         <div id="course-info">
          <span style="margin: 3%; font-size: 20px; font-weight: 800; height: 50%;">{{ ela.courseName }}</span>
          <span style="margin: 3%;">{{ ela.createUserName }}</span>
          <span style="margin: 3%;">共{{ ela.videoCount }}节课</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import qs from 'qs'
export default {
  name: 'Home',
  watch: {
    avatarURL() {
      this.getAvatarUrl();
    }
  },
  data() {
    return {
      carousel: [],
      historyCourses: {},
      isLogin: localStorage.getItem("token"),
      avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '',
      nickname: '',
      elaborateCourses: [],
      racingCourses: [],
      goodCommentCourses: [],
      recommendation: [],
      activeName:'',
      show: [
        false, false, false, false, false, false, false
      ],
      elaborateId: 3,
      raceId: 1,
      goodCommentId: 8,
      avatarURL: '',
      token: localStorage.getItem('token'),
      imgOne: '',
      imgTwo: '',
      imgOneValid: false,
      imgTwoValid: false
    }
  },
  created() {
    this.$store.dispatch("course/getCarousel")
      .then((response) => {
        if (response.code === 200) {
          this.carousel = response.data;
        }
      }).catch(error => {
        console.log(error.response);
      });
      let page = 1;
      let size = 3;
      const ruleForm = {
        page,
        size
      }
      this.$store.dispatch("user/getHistoryCourses", ruleForm)
      .then((response) => {
        if (response.code === 200) {
          this.historyCourses = response.data.list;
        }
      }).catch(error => {
        console.log(error.response);
      });
      this.$store.dispatch("course/getRecommendation")
      .then((response) => {
        if (response.code === 200) {
          this.recommendation = response.data.slice(0, 8);
          console.log(this.recommendation)
          this.recommendation.forEach(item => {
            item.video = [{}, {}]
          })
        }
      }).catch(error => {
        console.log(error.response);
      });
      let tagIds = [];
      tagIds.push(this.elaborateId);
      page = 1;
      size = 8;
      axios.get('http://localhost:8888/course/getList', {
      params: {
        page: 1,
        size: 8,
        tagIds: tagIds
      },
      paramsSerializer: {
        serialize: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      },
      headers: {
        'token': localStorage.getItem('token')
      }
    }).then((response) => {
        if (response.data.code === 200) {
          this.elaborateCourses = response.data.data.list;
          console.log(this.elaborateCourses);
        }
        console.log(response)
      }).catch(error => {
        console.log(error);
      });

      tagIds = [];
      tagIds.push(this.raceId);
      page = 1;
      size = 8;
      axios.get('http://localhost:8888/course/getList', {
      params: {
        page: 1,
        size: 8,
        tagIds: tagIds
      },
      paramsSerializer: {
        serialize: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      },
      headers: {
        'token': localStorage.getItem('token')
      }
    }).then((response) => {
        if (response.data.code === 200) {
          this.racingCourses = response.data.data.list;
          console.log(this.elaborateCourses);
        }
        console.log(response)
      }).catch(error => {
        console.log(error);
      });
      tagIds = [];
      tagIds.push(this.goodCommentId);
      page = 1;
      size = 8;
      axios.get('http://localhost:8888/course/getList', {
      params: {
        page: 1,
        size: 8,
        tagIds: tagIds
      },
      paramsSerializer: {
        serialize: function (params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        },
      },
      headers: {
        'token': localStorage.getItem('token')
      }
    }).then((response) => {
        if (response.data.code === 200) {
          this.goodCommentCourses = response.data.data.list;
          console.log(this.elaborateCourses);
        }
        console.log(response)
      }).catch(error => {
        console.log(error);
      });
      if (this.isLogin) {
        this.$store.dispatch("user/getUserInfo")
        .then((response) => {
          if (response.code === 200) {
            console.log(response.data);
            this.avatar = response.data.avatarURL;
            this.username = response.data.username;
            this.nickname = response.data.nickname;
          }
        }).catch(error => {
          console.log(error.response);
        });
      }
  },
  methods: {
    toLogin() {
      this.$router.push('/login');
    },
    drawOut(index) {
      this.$set(this.show, index ,true)
    },
    drawIn(index) {
      this.$set(this.show, index ,false)
    },
    toCourse(id) {
      this.$router.push({ path: '/course/:courseId', query: { courseId: id }});
    },
    toConceptVideo(rec, index) {
      console.log(rec);
      localStorage.setItem('videoId', rec.video[index].videoId);
      localStorage.setItem('courseId', rec.video[index].courseId);
      this.$router.push({ path: '/startCourse/:path', query: { path: rec.video[index].videoURL, courseId: rec.courseId }});
    },
    toConceptVideoList(rec) {
      this.$router.push({ path: '/conceptInfo/:conceptId', query: { conceptId: rec.id, conceptName: rec.conceptName }});
    },
    moreEla() {
      localStorage.setItem('tagId', this.elaborateId);
      this.$router.push({ path: '/courseList/:key', query: { key: '' }});
    },
    moreRace() {
      localStorage.setItem('tagId', this.raceId);
      this.$router.push({ path: '/courseList/:key', query: { key: '' }});
    },
    moreGoodComment() {
      localStorage.setItem('tagId', this.goodCommentId);
      this.$router.push({ path: '/courseList/:key', query: { key: '' }});
    },
    toFeedback() {
      this.$router.push('/feedback');
    },
    getAvatarUrl() {
      Object.defineProperty(Image.prototype,"avatarURL",{
        configurable:true,
        writable:true,
        enumerable:true
      })
      let request = new XMLHttpRequest();
      request.responseType = 'blob';
      request.open('get', this.avatarURL, true);
      request.setRequestHeader('token', this.token);
      let avatarRef = this.$refs.avatar;
      request.onreadystatechange = e => {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
          avatarRef.src = URL.createObjectURL(request.response);
          avatarRef.onload = () => {
            URL.revokeObjectURL(avatarRef.src);
          }
        }
      }
      request.send(null);
    },
    handleChange() {
      this.getVideos();
    },
    getVideos() {
      let conceptId = this.activeName;
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
    toLink(tagId) {
      localStorage.setItem('tagId', tagId);
      this.$router.push({ path: '/courseList/:key', query: { key: '' }});
    },
    toSubject(subjectId) {
      localStorage.setItem('subjectId', subjectId);
      this.$router.push({ path: '/courseList/:key', query: { key: '' }});
    }
  }
}
</script>

<style>
.topArea {
  display: flex;
  margin-top: 1%;
  height: 360px;
  margin-bottom: 1%;
}
#classification {
  margin-left: 20%;
  margin-right: 1%;
  width: 12%;
}
#classification:hover {
  cursor: pointer;
}
.drawer-btn {
  display: flex;
  height: 14.28%;
  background: rgba(222, 71, 71, 1);
  -webkit-text-fill-color: white;
  padding-left: 10%;
  align-items: center;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#carousel {
  width: 34%;
  margin-right: 1%;
  border-radius: 8px;
}
#profile {
  width: 12%;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}
.history-container {
  display: flex;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#course {
  margin: auto;
  -webkit-text-fill-color: rgba(222, 71, 71, 1);
}
#down-btn {
  background: rgba(222, 71, 71, 1);
  color: aliceblue;
  border-radius: 24px;
}
#rec-title {
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: 24px;
  font-weight: 800;
  color: rgba(35, 35, 35, 1);
  text-align: left;
  vertical-align: top;
}
#more {
  font-weight: 1000;
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  color: rgba(35, 35, 35, 1);
  text-align: left;
}
#more:hover {
  cursor: pointer;
}
#recommendation-container {
  width: 20%;
}
#recommendation-tag {
  border-radius: 10px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin-left: 0;
  width: 80%;
  margin-top: 1%;
}
#tag-btn {
  margin: 5%;
}

#elaborate-title {
  font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  margin-right: 50%;
  font-size: 24px;
  font-weight: 800;
  color: rgba(35, 35, 35, 1);
  text-align: left;
  vertical-align: top;
}
#elaborate-course {
  display: flex;
  flex-flow: row wrap;
  border-radius: 12px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin-left: 20%;
  width: 60%;
  margin-bottom: 1%;
}
#tag-btn:hover {
  cursor: pointer;
}
.ela {
  border-radius: 12px;
}
.ela:hover {
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
}
#course-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 12px 12px;
}
.el-collapse-item__header {
  padding-left: 5%;
}
img {
  cursor: pointer;
}
.banner {
  vertical-align: middle;
  line-height: 51.47px;
  width: 20%;
  background-color: aliceblue;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
}
.link {
  margin-left: 5%;
}
</style>
