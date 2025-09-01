<template>
  <div style="background-color: white; margin: 1%; border-radius: 12px;">
    <div style="display: flex; flex-flow: row wrap;">
      <div style="display: flex; flex-direction: row; background-color: white; margin: 1%; padding: 2%; height: 20%; border-radius: 12px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25); width: 35%; height: 10vh;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 33%;">
          <i class="el-icon-user" style="font-size: 30px; color: #409EFF;"></i>        
          <span style="font-size: 30px;">{{ teacherCount }}个</span>        
          <span>活跃教师</span>        
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; width: 33%;">
          <i class="el-icon-s-order" style="font-size: 30px; color: #409EFF;"></i>        
          <span style="font-size: 30px;">{{ courseCount }}个</span>        
          <span>已发布课程</span>        
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; width: 33%;">
          <i class="el-icon-s-flag" style="font-size: 30px; color: #409EFF;"></i>      
          <span style="font-size: 30px;">{{ videoViews }}次</span>        
          <span>课程观看</span>
        </div>
      </div>
      <div style="display: flex; flex-direction: row; background-color: white; margin: 1%; padding: 2%; height: 20%; border-radius: 12px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25); width: 53%; height: 10vh;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
          <i class="el-icon-user" style="font-size: 30px; color: #409EFF;"></i>        
          <span style="font-size: 22px;">李明</span>        
          <span>最受欢迎教师</span>        
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
          <i class="el-icon-s-order" style="font-size: 30px; color: #409EFF;"></i>        
          <span style="font-size: 22px; text-align: center;">微机原理与接口技术</span>        
          <span>最多好评课程</span>        
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
          <i class="el-icon-s-order" style="font-size: 30px; color: #409EFF;"></i>        
          <span style="font-size: 22px;">微机原理与接口技术</span>        
          <span>最受欢迎课程</span>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; width: 25%;">
          <i class="el-icon-s-order" style="font-size: 30px; color: #409EFF;"></i>        
          <span style="font-size: 22px;">微机原理与接口技术</span>        
          <span>完结最多课程</span>        
        </div>
      </div>
      <div style="background-color: white; width: 60%; height: 70vh; margin: 1%; border-radius: 12px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);">
        <WordCloud></WordCloud>
      </div>
      <!-- <div style="background-color: white; width: 20%; height: 70vh; margin: 1%; border-radius: 12px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);">
        <VideoBar></VideoBar>
      </div>
      <div style="background-color: white; width: 20%; height: 70vh; margin: 1%; border-radius: 12px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);">
        <CourseBar></CourseBar>
      </div> -->
      <div style="margin: 1%; width: 31%;">
        <div style="background-color: white; width: 100%; height: 35vh; padding: 2%; margin-bottom: 1vh; border-radius: 12px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);">
          <ConceptPie></ConceptPie>
        </div>
        <div style="background-color: white; width: 100%; height: 30vh; padding: 2%; border-radius: 12px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);">
          <ConceptBar></ConceptBar>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import VLine from '@/components/echarts/Line.vue'
import VPie from '@/components/echarts/Pie.vue';
import ConceptBar from '@/components/echarts/ConceptBar.vue';
import VideoBar from '@/components/echarts/VideoBar.vue';
import CourseBar from '@/components/echarts/CourseBar.vue';
import WordCloud from '@/components/echarts/WordCloud.vue';
import ConceptPie from '@/components/echarts/ConceptPie.vue';
export default {
  components: {
    VLine,
    VPie,
    ConceptBar,
    VideoBar,
    CourseBar,
    WordCloud,
    ConceptPie
  },
  data() {
    return {
      roleId: localStorage.getItem('roleId'),
      conceptTopN: [],
      myConceptTopN: [],
      videoTopN: [],
      myVideoTopN: [],
      courseTopN: [],
      myCourseTop: [],
      videoViews: 0,
      teacherCount: 0,
      courseCount: 0,
      mostPopularTeacher: '',
      mostPopularCourse: '',
      // courseOption: {
      //   title: {
      //     text: '课程完成情况',
      //     left: 'center'
      //   },
      //   tooltip: {
      //     trigger: 'item'
      //   },
      //   legend: {
      //     orient: 'vertical',
      //     left: 'left'
      //   },
      //   series: [
      //     {
      //       type: 'pie',
      //       radius: '50%',
      //       data: [
      //         { value: 210, name: '完成学习' },
      //         { value: 735, name: '>70%' },
      //         { value: 580, name: '50%~70%' },
      //         { value: 484, name: '30%~50%' },
      //         { value: 300, name: '<30%' }
      //       ],
      //       emphasis: {
      //         itemStyle: {
      //           shadowBlur: 10,
      //           shadowOffsetX: 0,
      //           shadowColor: 'rgba(0, 0, 0, 0.5)'
      //         }
      //       }
      //     }
      //   ]
      // },
    }
  },
  created() {
    this.getAnalysis();
  },
  methods: {
    getAnalysis() {
      this.$store.dispatch('admin/getVideoViews')
      .then(res => {
        if (res.code === 200) {
          console.log(res);
          this.videoViews = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(error => {
        console.log(error);
      })
      this.$store.dispatch('admin/getTeacherCount')
      .then(res => {
        if (res.code === 200) {
          console.log(res);
          this.teacherCount = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(error => {
        console.log(error);
      })
      this.$store.dispatch('admin/getCourseCount')
      .then(res => {
        if (res.code === 200) {
          console.log(res);
          this.courseCount = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(error => {
        console.log(error);
      })
      this.$store.dispatch('admin/getMostPopularTeacher')
      .then(res => {
        if (res.code === 200) {
          console.log(res);
          this.mostPopularTeacher = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(error => {
        console.log(error);
      })
      this.$store.dispatch('admin/getMostPopularCourse')
      .then(res => {
        if (res.code === 200) {
          console.log(res);
          this.mostPopularCourse = res.data;
        } else {
          this.$message.error(res.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
  }
}
</script>

<style>

</style>