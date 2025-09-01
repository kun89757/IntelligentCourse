<template>
    <div style="background-color: white; margin: 0.5%; border-radius: 12px; padding: 1%;">
      <div style="display: flex; flex-direction: column; align-items: flex-start;">
          <div style="display: flex; flex-direction: row;">
            <el-button class="add" @click="handleAdd" style="height: 100%;">新增概念</el-button>
            <el-form :model="searchForm" style="display: flex; flex-direction: row;">
                <el-form-item style="margin-left: 1%;">
                    <el-input v-model="searchForm.conceptName" placeholder="请输入概念名" clearable></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 1%;">
                  <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
          </div>
          <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" id="dialog" style="align-self: center;" width="30%">
          <el-form :model="form">
            <el-form-item label="编号" :label-width="formLabelWidth"  v-show="dialogTitle === '编辑概念'">
              <el-input v-model="form.conceptId" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="概念名" :label-width="formLabelWidth">
              <el-input v-model="form.conceptName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属学科" :label-width="formLabelWidth">
              <el-popover
                placement="bottom"
                width="400"
                trigger="click">
                <Subject @getSubjects="getSubjectsFromSubject"></Subject>
                <el-input v-model="form.subject" autocomplete="off" slot="reference"></el-input>
              </el-popover>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
          </div>
        </el-dialog>
          <el-table
            :data="conceptList"
            stripe
            style="width: 100%">
            <el-table-column
              prop="id"
              label="编号">
            </el-table-column>
            <el-table-column
              prop="conceptName"
              label="概念名">
            </el-table-column>
            <el-table-column
              prop="subjectName"
              label="所属学科">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <div style="display: flex;">
                  <div><el-button @click="handleEdit(scope.row)" size="small" class="edit-btn">编辑</el-button></div>
                  <div><el-button slot="reference" type="text" size="small" @click="getId(scope.row.id)" class="delete-btn">删除</el-button></div>          
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            :total="count"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="align-self: center;">
          </el-pagination>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>确定删除吗</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="deleteConcept">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import Subject from '@/components/admin/Subject.vue';
  export default {
    components: {
      Subject
    },
    data() {
      return {
        conceptList: [{
        }],
        count: 0,
        pageSize: 13,
        currentPage: 1,
        dialogFormVisible: false,
        form: {
          conceptId: '',
          conceptName: '',
          subject: ''
        },
        searchForm: {
          conceptName: ''
        },
        formLabelWidth: '120px',
        dialogVisible: false,
        deleteId: 0,
        dialogTitle: '新概念',
        subjectId: '',
        subject: ''
      }
    },
    methods: {
      getConceptList(p) {
        let size = this.pageSize;
        let page = this.currentPage;
        if (p) {
          page = 1;
        }
        let conceptName = this.searchForm.conceptName;
        let form = {
          page,
          size,
          conceptName
        };
        this.$store.dispatch('admin/getConceptList', form)
        .then(response => {
          console.log(response.code)
          if (response.code === 200) {
            console.log(response);
            this.conceptList = response.data.list;
            this.count = response.data.count;
            this.getConceptSubject()
            console.log(this.conceptList)
          } else {
            this.$message.error(response.message);
          }
        }).catch(error => {
          console.log(error.response);
        }) 
      },
      getConceptSubject() {
        this.conceptList.forEach(item => {
          let subjectId = item.subjectId;
          let data = {
            subjectId
          }
          this.$store.dispatch('concept/getSubjectById', data)
          .then(res => {
            if (res.code === 200) {
              this.$set(item, 'subjectName', res.data.subjectName);
            } else {
              this.$message.error(res.message);
            }
          }).catch(error => {
            console.log(error);
          })
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getConceptList();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getConceptList();
      },
      submit() {
        if (this.dialogTitle === '新概念') {
          this.dialogFormVisible = false;
          if (!this.form.conceptName) {
            this.$message.error("概念名不能为空!");
            this.form.conceptName = '';
            return;
          } else if (!this.form.subject) {
            this.$message.error("所属学科不能为空!");
            this.form.subject = '';
            return;
          }
          const conceptName = this.form.conceptName;
          const subjectId = this.subjectId;
          const ruleForm = {
            conceptName,
            subjectId
          };
          this.$store.dispatch('admin/addConcept', ruleForm)
          .then(response => {
            if (response.code === 200) {
              console.log(response);
              this.$message.success("新增成功");
              this.getConceptList();
            } else {
              this.$message.error(response.message);
            }
          }).catch(error => {
            console.log(error);
          })
          this.form.conceptName = '';
        } else {
          this.dialogFormVisible = false;
          const conceptId = this.form.conceptId;
          const subjectId = this.subjectId;
          const conceptName = this.form.conceptName;
          console.log(subjectId);
          console.log(conceptId);
          const ruleForm = {
            conceptId,
            subjectId,
            conceptName
          };
          this.$store.dispatch('admin/editConcept', ruleForm)
          .then(response =>  {
            if (response.code === 200) {
              console.log(response);
              this.$message.success("编辑成功");
              this.getConceptList();
            } else {
              this.$message.error(response.message);
            }
          }).catch(error => {
            console.log(error);
          })
        }
      },
      handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
      getId(id) {
        this.dialogVisible = true;
        this.deleteId = id;
        console.log(id);
      },
      deleteConcept() {
        this.dialogVisible = false;
        let conceptId = this.deleteId;
        let form = {
          conceptId
        };
        this.$store.dispatch('admin/deleteConcept', form)
        .then(response => {
          if (response.code === 200) {
            console.log(response);
            this.$message.success("删除成功");
            this.getConceptList();
          }
        }).catch(error => {
          console.log(error);
        })
      },
      handleAdd() {
        this.form.conceptName = '';
        this.dialogFormVisible = true;
        this.dialogTitle = '新概念';
      },
      handleEdit(row) {
        this.dialogFormVisible = true;
        this.dialogTitle = '编辑概念';
        this.form.conceptId = row.id;
        this.form.conceptName = row.conceptName;
        this.form.subject = row.subjectName;
      },
      search() {
        this.getConceptList(1);
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
        this.form.subject = text;
        console.log(this.subjectId);
      },
    },
    created() {
      this.getConceptList();
    },
  }
  </script>
  
  <style>
  .add {
    background: rgba(222, 71, 71, 1);
     color: aliceblue;
  }
  .edit-btn {
    background: rgba(222, 71, 71, 1);
    color: aliceblue;
  }
  .delete-btn {
    -webkit-text-fill-color: rgba(222, 71, 71, 1);
    margin-left: 100%;
  }
  .edit-btn:hover {
    background: rgba(222, 71, 71, 1);
     color: aliceblue;
  }
  .add:hover {
    background: rgba(222, 71, 71, 1);
     color: aliceblue;
  }
  </style>