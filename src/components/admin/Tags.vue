<template>
  <div>
    <div style="display: flex; flex-direction: column; width: auto;">
      <div style="display: flex; flex-direction: column;">
        <div style="display: flex; flex-direction: row; align-items: center;">
          <h4 style="margin-right: 20%;">标签</h4>
          <div id="search">
              <el-input placeholder="请输入内容" v-model="searchForm.tagName" clearable id="search-bar">
                  <el-button slot="append" icon="el-icon-search" @click="search" id="search-btn"></el-button>
              </el-input>
          </div>
        </div>
        <div>
          <el-tag
          v-for="tag in tags"
          :key="tag.tagName"
          closable
          @close="closeTag(tag)"
          style="margin: 1%"
          type="danger">
          {{tag.tagName}}
          </el-tag>
        </div>
      </div>
      <div>
        <el-tag v-for="tag in tagList" :key="tag.tagId" :disable-transitions="true" @click="addTag(tag)"
         style="margin: 1%;">{{ tag.tagName }}</el-tag>
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
    this.getTags();
  },
  data() {
    return {
      labelPosition: 'right',
      tags: [],
      count: 0,
      pageSize: 20,
      currentPage: 1,
      tagList: [],
      searchForm: {
        tagName: ''
      }
    }
  },
  methods: {
    getTags() {
      let size = this.pageSize;
      let page = this.currentPage;
      let form = {
        page,
        size
      };
      this.$store.dispatch('admin/getTags', form)
      .then(response => {
        console.log(response.code)
        if (response.code === 200) {
          console.log(response);
          this.tagList = response.data.list;
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
      this.getTags();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTags();
    },
    addTag(tag) {
      if (this.tags.length === 0 || !this.tags.find(item => {
        return item === tag;
      })) {
        this.tags.push(tag);
      }
    },
    closeTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    submit() {
      this.$emit('getTags', this.tags);
    },
    search() {
      let size = this.pageSize;
      let page = this.currentPage;
      let tagName = this.searchForm.tagName;
      let form = {
        page,
        size,
        tagName
      };
      this.$store.dispatch('admin/getTags', form)
      .then(response => {
        console.log(response.code)
        if (response.code === 200) {
          console.log(response);
          this.tagList = response.data.list;
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