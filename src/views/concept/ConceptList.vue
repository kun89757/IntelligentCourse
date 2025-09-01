<template>
  <div style="background-color: white; display: flex; flex-direction: column; align-items: center; height: calc(100vh - 60px);">
    <div>
      <el-form ref="form" :model="form" class="search">
        <el-form-item>
          <el-input
            v-model="form.content"
            class="search-input"
            @keyup.enter.native="search">
          </el-input>
          <el-button
          icon="el-icon-search" 
          type="text" 
          style="margin-left: 5%;"
          @click="search"></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="concept-container">
      <el-table
      :data="splitOne"
      style="width: 100%"
      @row-click="toConcept">
      <el-table-column
        prop="id"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="conceptName"
        label="概念名"
        width="200">
      </el-table-column>
    </el-table>
    <el-table
      :data="splitTwo"
      style="width: 100%"
      @row-click="toConcept">
      <el-table-column
        prop="id"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="conceptName"
        label="概念名"
        width="200">
      </el-table-column>
    </el-table>
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
      form: {
        content: '',
      },
      page: 1,
      size: 24,
      count: 0,
      conceptList: [],
      splitOne: [],
      splitTwo: []
    }
  },
  created() {
    this.getConceptList();
  },
  methods: {
    search() {
      let conceptName = this.form.content;
      let page = 1;
      let size = this.size;
      let courseId = this.$route.query.courseId;
      let ruleForm = {
        page,
        size,
        courseId,
        conceptName
      }
      this.$store.dispatch('concept/getConceptListByCourseId', ruleForm)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.conceptList = response.data.list;
          this.count = response.data.count;
          this.splitOne = this.conceptList.slice(0, size / 2);
          this.splitTwo = this.conceptList.slice(size / 2, this.conceptList.length);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    getConceptList() {
      let page = this.page;
      let size = this.size;
      let courseId = this.$route.query.courseId;
      let ruleForm = {
        page,
        size,
        courseId
      }
      this.$store.dispatch('concept/getConceptListByCourseId', ruleForm)
      .then(response => {
        if (response.code === 200) {
          console.log(response);
          this.conceptList = response.data.list;
          this.count = response.data.count;
          this.splitOne = this.conceptList.slice(0, size / 2);
          this.splitTwo = this.conceptList.slice(size / 2, this.conceptList.length);
        } else {
          this.$message.error(response.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    handleSizeChange(val) {
      this.size = val;
      this.getConceptList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getConceptList();
    },
    toConcept(row) {
      this.$router.push({ path: '/conceptInfo/:conceptId', query: { conceptId: row.id, conceptName: row.conceptName }});
    }
  }
}
</script>

<style scoped>
.search {
  margin-top: 20%;
  width: 150%;
  margin-left: -25%;
  border-radius: 50px;
  padding: 0;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25);
}
.search-input {
  font-size: 24px;
  width: 80%;
  padding-left: 3%;
  padding-right: 3%;
}
.search-input>>>.el-input__inner {
  border: 0;
}
.concept-container {
  display: flex;
  flex-direction: row;
}
</style>