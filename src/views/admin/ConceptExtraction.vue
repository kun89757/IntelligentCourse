<template>
  <div style="background: white; width: 70vw; height: 70vh; margin-top: 10vh; margin-left: 10vw; border-radius: 24px; box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25); display: flex; flex-direction: column;">
    <div style="width: 50%; align-self: center; margin-top: 5%; display: flex; flex-direction: column;">
      <el-input
      type="textarea"
      :rows="15"
      placeholder="请输入非结构化文本"
      v-model="textarea"
      resize="none"
      style="box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.25); border-radius: 12px;">
      </el-input>
      <el-button style="align-self: center; margin-top: 5%; background: rgba(222, 71, 71, 1); color: aliceblue;" @click="extract">抽取</el-button>

      <el-dialog :visible.sync="outerVisible" width="20%" title="查看抽取结果" :modal="false" class="dialog">
        <el-dialog
          v-el-drag-dialog
          v-if="innerVisible"
          class="dialog"
          width="27%"
          title="抽取结果"
          :visible.sync="innerVisible"
          :modal="false"
          append-to-body
          :close-on-click-modal="false">
          <el-table
            :data="splitConceptList"
            border
            style="width: 100%;
            justify-content: center;">
            <el-table-column
              prop="index"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="conceptName"
              label="概念名">
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="size"
            :total="count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="align-self: center; margin-top: 2%; justify-content: center;"
            align="center">
          </el-pagination>
          <el-button style="background: rgba(222, 71, 71, 1); color: aliceblue; margin-left: 40%; margin-top: 10%;" @click="close">确定</el-button>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
          <el-button @click="outerVisible = false">取 消</el-button>
          <el-button type="primary" @click="innerVisible = true, outerVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import elDragDialog from '@/utils/directive/el-dragDialog'
export default {
  directives: {
    elDragDialog
  },
  data() {
    return {
      textarea: '',
      conceptList: [],
      size: 10,
      count: 0,
      outerVisible: false,
      innerVisible: false,
      splitConceptList: [],
      list:[],
    }
  },
  methods: {
    extract() {
      if (!this.textarea) {
        this.$message.error('请输入非结构化文本');
        return;
      }
      let text = this.textarea;
      let data = {
        text
      }
      this.$store.dispatch('admin/extract', data)
      .then(res => {
        if (res.code === 200) {
          console.log(res);
          this.list = [];
          this.conceptList = res.data;
          this.count = this.conceptList.length;
          this.conceptList.forEach(item => {
            this.list.push({
              index: this.conceptList.indexOf(item) + 1,
              conceptName: item
            })
          })
          this.$notify.info({
            title: '提示',
            message: '请耐心等待'
          })
          setTimeout(() => {
            this.outerVisible = true;
          }, 3000)
          this.splitConceptList = this.list.slice(0, this.size);
        } else {
          this.$message.error(res.message);
        }
      }).catch(error => {
        console.log(error);
      })
    },
    handleSizeChange(val) {
      this.size = val;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.splitConceptList = this.list.slice((val - 1) * this.size, val * this.size);
    },
    close() {
      this.innerVisible = false;
      this.outerVisible = false;
    }
  }
}
</script>

<style lang="less" scoped>
.dialog {
  /deep/.el-dialog {
    border-radius: 20px;
  }
}
</style>