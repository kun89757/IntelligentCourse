<template>
  <div style="background-color: white; margin: 0.5%; border-radius: 12px; padding: 1%; height: calc(100vh - 30px); display: flex; flex-direction: column;">
    <el-form label-position="right" label-width="80px" :model="formLabelAlign" style="width: 60%;">
    <el-form-item label="课程名称">
        <el-input v-model="formLabelAlign.name"></el-input>
    </el-form-item>
    <el-form-item label="课程学科">
      <el-popover
        placement="bottom"
        width="400"
        trigger="click">
        <Subject @getSubjects="getSubjectsFromSubject"></Subject>
        <el-input slot="reference" v-model="formLabelAlign.subject"></el-input>
      </el-popover>
    </el-form-item>
    <el-form-item label="课程标签">
      <el-popover
        placement="bottom"
        width="400"
        trigger="click">
        <Tags @getTags="getTagsFromTag"></Tags>
        <el-input slot="reference" v-model="formLabelAlign.tag"></el-input>
      </el-popover>
    </el-form-item>
    <el-form-item label="课程封面">
      <el-upload
      action="http://localhost:8888/image/upload"
      :data="coverData"
      :on-success="coverSuccess"
      :before-upload="beforeUpload"
      :headers="headers"
      list-type="picture-card"
      :limit="1">
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="课程简介">
      <el-input type="textarea" v-model="formLabelAlign.intro"></el-input>
    </el-form-item>
    <el-form-item label="课程视频">
      <el-upload
        class="upload-demo"
        action="http://localhost:8888/video/upload"
        :data="videoData"
        :file-list="fileList"
        :before-upload="handleBefore"
        :on-success="handleSuccess"
        :show-file-list="false"
        :headers="headers"
        :multiple="true">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-form-item>
    </el-form>
    <div>
      <draggable
        class="list-group"
        tag="ul"
        v-model="fileList"
        v-bind="{
          animation: 200,
          group: 'description',
          disabled: false,
          ghostClass: 'ghost'
        }">
          <div
            class="list-group-item"
            v-for="element in fileList"
            :key="element.uuid"
            style="display: flex; width: 30%; align-items: center;">
            {{ element.name }}
            <el-button type="text" style="-webkit-text-fill-color: rgba(222, 71, 71, 1);" @click="deleteVideo(element)">删除</el-button>
            <el-popover
              placement="right"
              width="600"
              trigger="click">
              <el-form :label-position="labelPosition" label-width="80px" :model="form">
                <!-- <el-form-item label="视频名称">
                  <el-input v-model="form.videoName"></el-input>
                </el-form-item> -->
                <el-form-item>
                  <div style="display: flex; flex-direction: row;">
                    <el-input v-model="searchForm.content" placeholder="请输入关键字"></el-input>
                    <el-button type="primary" icon="el-icon-search" @click="getConcept">搜索</el-button>
                  </div>
                  <div>
                    <el-tag
                      v-for="tag in concepts"
                      :key="tag.id"
                      closable
                      @close="closeTag(tag)"
                      style="margin: 1%"
                      type="danger">
                      {{tag.conceptName}}
                    </el-tag>
                  </div>
                  <div>
                    <el-tag v-for="tag in conceptList" :key="tag.id" :disable-transitions="true" @click="addTag(tag)"
                    style="margin: 1%;">{{ tag.conceptName }}</el-tag>
                  </div>
                  <el-pagination
                    background
                    layout="prev, pager, next"
                    :page-size="searchForm.pageSize"
                    :total="searchForm.count"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    style="align-self: center; justify-items: center;">
                  </el-pagination>
                </el-form-item>
              </el-form>
              <el-button slot="reference"
            style="background: rgba(222, 71, 71, 1); -webkit-text-fill-color: white;" @click="setUp(element)">设置视频</el-button>
            <el-button style="margin-left: 50%;" @click="submitVideoIntro(element)">确认</el-button>
            </el-popover>
          </div>
      </draggable>
      <div>
        <el-button style="margin-left: 5%;" size="small" @click="submitUpload">确认提交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/admin/Tags.vue'
import draggable from 'vuedraggable'
import Subject from '@/components/admin/Subject.vue'
import Concept from '@/components/admin/Concept.vue'
import axios from 'axios'


export default {
  components: {
    draggable,
    Tags,
    Subject,
    Concept
  },
  watch: {
  },
  computed: {
    coverData() {
      return {
        uploadUUID : this.uploadUUID,
      }
    },
    videoData() {
      return {
        uploadUUID: this.uploadUUID,
      }
    }
  },
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        subject: '',
        type: '',
        intro: '',
        tag: ''
      },

      index: 0,
      drag: false,
      coverUploaded: false,
      tags: [],
      subjects: [],
      tagId: [],
      subjectId: [],
      uploadUUID:'',
      form: {
        videoName: ''
      },
      fileName: '',
      fileList: [],
      searchForm: {
        videoName: '',
        currentPage: 1,
        count: 0,
        pageSize: 15,
        content: ''
      },
      conceptList:[],
      concepts:[],
      conceptIdList: [],
      headers: {
        token: localStorage.getItem('token')
      },
    }
  },
  created() {
    this.startUpload();
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      if (response.code === 200) {
        console.log(response);
        file.uuid = response.data;
        console.log(fileList)
      } else {
        this.$message.error(response.message);
      }
    },
    coverSuccess(response, file, fileList) {
      if (response.code === 200) {
          console.log(response);
        } else {
          this.$message.error(response.message);
        }
        this.coverUploaded = true;
    },
    beforeUpload(file) {
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
    handleBefore(file) {
      this.fileName = file.name;
      this.videoData.videoName = this.fileName;
      if (
        [
          "video/mp4",
          "video/ogg",
          "video/flv",
          "video/avi",
          "video/wmv",
          "video/rmvb",
          "video/mov",
          "video/mkv",
        ].indexOf(file.type) === -1
      ) {
        this.$message({
          type: "info",
          message: "请上传正确的视频格式"
        });
        return false;
      }
    },
    onStart(){
      this.drag = true;
    },
    onEnd() {
      this.drag = false;
    },
    getTagsFromTag(data) {
      this.tags = data;
      console.log(this.tags);
      let text = "";
      for (const tag of this.tags) {
        this.tagId.push(tag.id);
        text += tag.tagName + " ";
      }
      this.formLabelAlign.tag = text;
    },
    getSubjectsFromSubject(data) {
      console.log(data);
      this.subjects = data;
      console.log(this.subjects);
      let text = "";
      for (const subject of this.subjects) {
        this.subjectId = subject.id;
        text = subject.subjectName;
      }
      console.log(this.subjectId);
      this.formLabelAlign.subject = text;
    },
    startUpload() {
      this.$store.dispatch('admin/startUpload')
      .then(response => {
        if (response.code === 200) {
          this.uploadUUID = response.data;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    submitUpload() {
      if (!this.formLabelAlign.name) {
        this.$message.error("请填写课程名称!");
        return;
      } else if (!this.formLabelAlign.subject) {
        this.$message.error("请填写课程学科!");
        return;
      } else if (!this.formLabelAlign.tag) {
        this.$message.error("请填写课程标签!");
        return;
      } else if (!this.coverUploaded) {
        this.$message.error("请上传课程封面!");
        return;
      } else if (!this.formLabelAlign.intro) {
        this.$message.error("请填写课程简介!");
        return;
      } else if (!this.fileList) {
        this.$message.error("请上传视频列表!");
        return;
      }
      let conceptsList = [];
      let videoUUIDList = [];

      for (let file of this.fileList) {
        let conceptId = [];
        console.log(file.concepts);
        if (file.concepts) {
          for (let concept of file.concepts) {
            conceptId.push(concept.id);
            console.log(concept);
          }
        }
        conceptsList.push(conceptId);
        videoUUIDList.push(file.uuid);
      }
      console.log(conceptsList);
      console.log(videoUUIDList);
      const tagIdList = this.tagId;
      const subjectId = this.subjectId;
      const courseName = this.formLabelAlign.name;
      const courseDescribe = this.formLabelAlign.intro;
      const uploadUUID = this.uploadUUID;
      let data = {
        uploadUUID: uploadUUID,
        courseName: courseName,
        courseDescribe: courseDescribe,
        subjectId: subjectId,
        tagIdList: tagIdList,
        videoUUIDList: videoUUIDList,
        conceptsList :conceptsList
      }
      axios.post('http://localhost:8888/course/submitUpload', data, {
        headers: {
          token: localStorage.getItem('token'),
          contentType: 'application/json'
        }
      }).then(response => {
        console.log(response.data.code)
        if (response.data.code === 200) {
          console.log(response);
          this.$message.success("上传成功");
        } else {
          this.$message.error(response.data.message);
        }
      }).catch(error => {
        console.log(error);
      })

    },
    deleteVideo(video) {
      this.fileList.splice(this.fileList.indexOf(video), 1);
    },
    getConcept() {
      const size = this.searchForm.pageSize;
      const page = this.searchForm.currentPage;
      const conceptName = this.searchForm.content;
      const data = {
        page,
        size,
        conceptName
      }
      this.$store.dispatch('admin/getConceptList', data)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.conceptList = response.data.list;
          this.searchForm.count = response.data.count;
        }
      })
    },
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getConcept();
    },
    handleCurrentChange(val) {
      this.searchForm.currentPage = val;
      this.getConcept();
    },
    addTag(tag) {
      if (this.concepts.length === 0 || !this.concepts.find(item => {
        return item === tag;
      })) {
        this.concepts.push(tag);
      }
    },
    closeTag(tag) {
      this.concepts.splice(this.concepts.indexOf(tag), 1);
    },
    setUp(element) {
      this.form.videoName = element.name;
      if (!element.concepts) {
        this.concepts = [];
      } else {
        this.concepts = element.concepts;
      }
      this.getConcept();
    },
    submitVideoIntro(element) {
      if (!this.form.videoName) {
        this.$message.error("请输入视频名称");
        return;
      } else if (!this.concepts) {
        this.$message.error("请选择视频概念");
        return;
      }
      element.concepts = this.concepts;
      element.name = this.form.videoName;
      console.log(element);
    },
  }
}
</script>

<style>

.list-group-item {
  cursor: move;
  justify-content: space-between;
}
</style>
