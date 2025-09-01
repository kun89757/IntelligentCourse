<template>
  <div>
    <div style="display: flex; flex-direction: column; width: auto;">
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: row; align-items: center;">
          <h4 style="margin-left: 1%; margin-right: 20%;">学科</h4>
          <div id="search">
              <el-input placeholder="请输入内容" v-model="searchForm.subjectName" clearable id="search-bar">
                  <el-button slot="append" icon="el-icon-search" @click="search" id="search-btn"></el-button>
              </el-input>
          </div>
        </div>
        <div>
          <el-tag
          v-for="subject in subjects"
          :key="subject.subjectName"
          closable
          @close="closeSubject(subject)"
          style="margin: 1%"
          type="danger">
          {{subject.subjectName}}
          </el-tag>
        </div>
      </div>
      <div>
        <el-tag v-for="subject in subjectList" :key="subject.id" :disable-transitions="true" @click="addSubject(subject)"
         style="margin: 1%;">{{ subject.subjectName }}</el-tag>
      </div>
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="count"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="align-self: center;">
        </el-pagination>
        <el-button style="text-align: center; width: 20%; align-self: center;" @click="submit">确定</el-button>
    </div>
  </div>
</template>

<script>

export default {
  created() {
    this.getSubjects();
  },
  data() {
    return {
      labelPosition: 'right',
      subjects: '',
      count: 0,
      pageSize: 20,
      currentPage: 1,
      subjectList: [],
      searchForm: {
        subjectName: ''
      }
    }
  },
  methods: {
    getSubjects() {
      let size = this.pageSize;
      let page = this.currentPage;
      let form = {
        page,
        size
      };
      this.$store.dispatch('admin/getSubjects', form)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.subjectList = response.data.list;
          this.count = response.data.count;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getSubjects();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSubjects();
    },
    addSubject(subject) {
      if (this.subjects.length === 0 || !this.subjects.find(item => {
        return item === subject;
      })) {
        this.subjects = [];
        this.subjects.push(subject);
      }
    },
    closeSubject(subject) {
      this.subjects.splice(this.subjects.indexOf(subject), 1);
    },
    submit() {
      this.$emit('getSubjects', this.subjects);
    },
    search() {
      let size = this.pageSize;
      let page = this.currentPage;
      let subjectName = this.searchForm.subjectName;
      let form = {
        page,
        size,
        subjectName
      };
      this.$store.dispatch('admin/getSubjects', form)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.subjectList = response.data.list;
          this.count = response.data.count;
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error.response);
      })
    }
  }
}
</script>

<style>

</style>