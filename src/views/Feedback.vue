<template>
  <div style="display: flex; flex-direction: column; background-color: white; height: calc(100vh - 60px);">
    <div style="margin-left: 20%; width: 50%;">
      <h3>意见反馈</h3>
      <el-divider></el-divider>
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请说明投诉事项以帮助我们了解您的意见与建议。"
        v-model="complainContent">
      </el-input>
      <div>
        <el-upload
        action="http://localhost:8888/complain/uploadImage"
        :data="imgData"
        :headers="headers"
        :on-success="imgSuccess"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        multiple
        list-type="picture-card"
        style="margin-top: 2%; margin-bottom: 2%;">
          <i class="el-icon-plus"></i>
        </el-upload>
        在此处上传图片,图片大小不能超过2M
      </div>
      <div>
        <el-upload
        class="upload-demo"
        action="http://localhost:8888/complain/uploadFile"
        :data="fileData"
        :headers="headers"
        :file-list="fileList"
        :before-upload="handleBefore"
        :on-success="handleSuccess"
        :on-remove="beforeRemove"
        :show-file-list="true"
        :multiple="true"
        style="margin-top: 2%; margin-bottom: 2%;">
        <el-button size="small" type="primary">点击上传其他材料</el-button>
      </el-upload>
      <div style="display: flex; flex-direction: row; align-items: center; justify-content:flex-end;">
        <el-button @click="submitComplain">提交投诉</el-button>
      </div>
      </div>
      <div class="block">
        <span class="demonstration">在此评分</span>
        <el-rate
          v-model="stars"
          :colors="colors">
        </el-rate>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请留下您的评价。"
          v-model="content"
          style="margin-top: 1%; margin-bottom: 1%;">
        </el-input>
        <div>
          <el-tag style="margin: 1%" v-for="tag in tags" :key="tag.id" @click="updateContent(tag)">{{ tag.content }}</el-tag>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center; justify-content:flex-end;">
          <el-button @click="rate">提交评价</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  computed: {
    headers() {
      return {
        token: localStorage.getItem('token')
      }
    },
    imgData() {
      return {
        uploadUUID: this.uploadUUID,
      }
    },
    fileData() {
      return {
        uploadUUID: this.uploadUUID,
      }
    }
  },
  data() {
    return {
      complainContent: '',
      uploadUUID: '',
      stars: 0,
      content: '',
      imageUUIDList: [],
      fileUUIDList: [],
      imageName: '',
      fileName: '',
      fileList: [],
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      tags: [
        {id: 1, content: '优质的课程内容'},
        {id: 2, content: '合理的交互性'},
        {id: 3, content: '推荐准确'},
        {id: 4, content: '界面干净美观'},
        {id: 5, content: '概念与视频间关联性强'},
        {id: 6, content: '很喜欢'},
      ],
    }
  },
  created() {
    this.startComplain();
  },
  methods: {
    startComplain() {
      this.$store.dispatch('concept/startComplain')
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.uploadUUID = response.data;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    beforeUpload(file) {
      this.imageName = file.name;
      this.imgData.imageName = this.imageName;
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG或PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    imgSuccess(response) {
      if (response.code === 200) {
        console.log(response);
        this.imageUUIDList.push(response.data);
        console.log(this.imageUUIDList)
      } else {
        this.$message.error(response.message);
      }
    },
    handleRemove(file) {
      console.log(this.imageUUIDList);
      this.imageUUIDList.splice(this.imageUUIDList.indexOf(file.response.data), 1);
      console.log(this.imageUUIDList);
    },
    handleBefore(file) {
      this.fileName = file.name;
      this.fileData.fileName = file.name;
    },
    handleSuccess(response) {
      if (response.code === 200) {
        console.log(response);
        this.fileUUIDList.push(response.data);
      } else {
        this.$message.error(response.message);
      }
    },
    beforeRemove(file) {
      this.fileUUIDList.splice(this.fileUUIDList.indexOf(file.response.data), 1);
    },
    submitComplain() {
      if (this.complainContent === '') {
        this.$message.info("意见区不得为空");
        return;
      }
      let complainContent = this.complainContent;
      let imageUUIDList = this.imageUUIDList;
      let uploadUUID = this.uploadUUID;
      let fileUUIDList = this.fileUUIDList;
      let data = {
        complainContent: complainContent,
        imageUUIDList: imageUUIDList,
        uploadUUID: uploadUUID,
        fileUUIDList: fileUUIDList
      };
      this.$http.post('http://localhost:8888/complain/submitComplain', data, {
          headers: {
            token: localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
      }).then(response => {
        if (response.data.code === 200) {
          this.$message.success('投诉成功');
          console.log(response);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    updateContent(tag) {
      this.content = this.content + tag.content + ' ';
    },
    rate() {
      let content = this.content;
      let stars = this.stars;
      let ruleForm = {
        content,
        stars
      }
      this.$store.dispatch('concept/rate', ruleForm)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.$message.success('评价成功');
        } else {
          this.$message.error(response.message);
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
