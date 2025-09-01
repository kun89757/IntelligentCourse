<template>
  <div style="background-color: white;">
    <router-link to="/admin/courseAudition"><img src="@/assets/back.png" style="position: fixed;" width="50px" v-if="roleId == 1 && unchecked == 'true'"></router-link>
    <div id="top-wrapper" style="display: flex; padding-top: 1%;">
        <img :src="courseImg" alt="" width="35%" height="35%" style="border-radius: 8px; margin-right: 2%; object-fit: cover;  aspect-ratio: 16/9;">
        <div style="display: flex; flex-direction: column; margin-left: 3%;" id="start-container">
            <div style="text-align: left; margin-left: 3%; margin-bottom: 5%; font-weight: 800;">{{ subjectName }}</div>
            <div style="text-align: left; margin-left: 3%; margin-bottom: 1%;" class="course-name">{{ courseName }}</div>
            <div id="inner-box">
                <el-select v-model="chapter" placeholder="请选择章节" id="selecter">
                    <el-option
                    v-for="video in videoList"
                    :key="video.videoId"
                    :label="video.videoName"
                    :value="video.videoId"
                    style="width: 200px;">
                    </el-option>
                </el-select>
            <el-link type="info" style="text-align: left; margin-bottom: 5%; margin-left: 3%;" @click="continueCourse">继续上一节课程</el-link>
            </div>
            <el-button id="start-course" @click="startCourse">开始课程</el-button>
        </div>
    </div>
    <div id="down-wrapper" style="display: flex; min-height: 60vh;">
        <div id="course-intro">
            <h3>课程概述</h3>
            <p v-html="courseIntro"></p>
        </div>
        <div id="recommendation-container" style="display: flex; flex-direction: column; align-items: center; ">
        <div id="title" style="margin-top: 8%; margin-bottom: 2%;"><span id="rec-title">可能感兴趣的知识概念</span></div>
        <el-collapse v-model="activeName" accordion style="width: 80%; box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);" @change="handleChange">
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
</template>

<script>

export default {
    props: ['courseId'],
    data () {
        return {
            courseImg: '',
            courseName: '',
            courseClassification: '',
            courseHistory: {},  
            videoList: [],
            courseIntro: '',
            courseChapter: [],
            chapter: '',
            recommendation: '',
            activeName: '',
            roleId: localStorage.getItem("roleId"),
            imgOne: '',
            imgTwo: '',
            subjectId: '',
            subjectName: '',
            imgOneValid: false,
            imgTwoValid: false,
            unchecked: this.$route.query.unchecked
        }
    },
    created() {
        this.getCourseInfo();
        console.log(this.unchecked);
        this.getHistory();
        this.$store.dispatch("course/getRecommendation")
        .then((response) => {
            if (response.code === 200) {
            console.log(response.data.recommendation);
            this.recommendation = response.data.slice(0, 8);
            }
        }).catch(error => {
            console.log(error.response);
        });
        if (this.courseId !== '') {
            this.$route.params.courseId = this.courseId;
        }
        console.log(this.$route.query.courseId);
        localStorage.setItem('courseId', this.$route.query.courseId)
    },
    methods: {
        getCourseInfo() {
            const courseId = this.$route.query.courseId;
            let data = {
                courseId
            }
            this.$store.dispatch('course/getCourseInfo', data)
            .then((response) => {
                if (response.code === 200) {
                    console.log(response);
                    this.courseImg = response.data.imageSrc;
                    this.courseName = response.data.courseName;
                    this.subjectId = response.data.subjectId;
                    this.subjectName = response.data.subject.subjectName
                    this.videoList = response.data.videoList;
                    this.videoList.forEach(item => {
                        this.courseChapter.push(item.videoName)
                    })
                    this.courseIntro = response.data.courseDescribe;
                    console.log(this.courseImg)
                } else {
                    this.$message.error(response.data.message);
                }
            }).catch(error => {
                console.log(error);
            })
        },
        startCourse() {
            if (this.chapter === '') {
                if (this.courseHistory === -1) {
                    let path = this.videoList[0].videoURL;
                    console.log(this.videoList);
                    localStorage.setItem('videoId', this.videoList[0].videoId);
                    this.$router.push({ path: '/startCourse/:path/:unchecked', query: { path: path, unchecked: this.unchecked } });
                } else {
                    let path = this.videoList[this.courseHistory].videoURL;
                    localStorage.setItem('videoId', this.courseHistory);
                    this.$router.push({ path: '/startCourse/:path/:unchecked', query: { path: path, unchecked: this.unchecked } });
                }
            } else {
                let videoId = this.chapter;
                let path = this.videoList.find(item => {
                    return item.videoId === videoId;
                }).videoURL;
                localStorage.setItem('videoId', videoId);
                this.$router.push({ path: '/startCourse/:path/:unchecked', query: { path: path, unchecked: this.unchecked } });
            }
        },
        continueCourse() {
            if (this.courseHistory === -1) {
                let path = this.videoList[0].videoURL;
                console.log(this.videoList);
                localStorage.setItem('videoId', this.videoList[0].videoId);
                this.$router.push({ path: '/startCourse/:path/:unchecked', query: { path: path, unchecked: this.unchecked } });
            } else {
                let path = this.videoList[this.courseHistory].videoURL;
                localStorage.setItem('videoId', this.courseHistory);
                this.$router.push({ path: '/startCourse/:path/:unchecked', query: { path: path, unchecked: this.unchecked } });
            }
        },
        toConceptVideo(rec, index) {
            localStorage.setItem('videoId', rec.video[index].videoId);
            localStorage.setItem('courseId', rec.video[index].courseId);
            this.$router.push({ path: '/startCourse/:path/:unchecked', query: { path: rec.video[index].videoURL, courseId: rec.courseId }});
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
                    return item.id == this.activeName;
                    })
                    console.log(recommendation)
                    this.recommendation.forEach(item => {
                    this.$set(item, 'video', res.data.list)
                    })
                    console.log(this.recommendation)
                    this.imgOneValid = res.data.list[0] ? true : false;
                    this.imgTwoValid = res.data.list[1] ? true : false;
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
    getHistory() {
        const courseId = this.$route.query.courseId;
        let data = {
            courseId: courseId
        }
        this.$store.dispatch('course/getLastVideoIndex', data)
        .then(res => {
            if (res.code === 200) {
                console.log(res);
                this.courseHistory = res.data;
            } else {
                this.$message.error(res.message);
            }
        }).catch(error => {
            console.log(error);
        })
    },
    getSubjectName() {
        console.log(this.subjectId);
        let data = {
            subjectId: this.subjectId
        }
        this.$store.dispatch('concept/getSubjectById', data)
            .then(res => {
                if (res.code === 200) {
                    console.log(res);
                    this.subjectName = res.data.subjectNam;
                } else {
                    this.$message.error(res.message);
                }
            }).catch(error => {
                console.log(error);
            })
    }
    }
}
</script>

<style>
#top-wrapper {
    margin-left: 20%;
}
.course-name {
    font-family: "PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 24px;
    font-weight: 800;
}
#start-container {
    width: 37%;
    padding-top: 1%;
    border-radius: 10px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: white;
}
#inner-box {
    display: flex;
    padding: 2%;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 3%;
    margin-right: 3%;
    background-color: rgb(250, 250, 250);
}
#start-course {
    margin-top: 3%;
    margin-left: 36%;
    width: 25%;
    border-radius: 24px;
    background: rgba(222, 71, 71, 1);
    -webkit-text-fill-color: aliceblue;
}
#selecter {
    margin-bottom: 5%;
}
#down-wrapper {
    margin-left: 20%;
    flex-direction: row;
}
#course-intro {
    background-color: white;
    text-align: left;
    width: 55%;
    height: 100%;
    margin-right: 2%;
    margin-top: 2%;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    padding: 12px;
    min-height: 44vh;
}
#recommedation {
    display: flex;
    flex-direction: column;
    width: 13%;
    align-items: center;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 2%;
    background: white;
    border-radius: 12px;
    padding-bottom: 1%;
}
/* p {
    font-size: 16px;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    *word-wrap: break-word;
    *white-space : normal ;
} */
</style>