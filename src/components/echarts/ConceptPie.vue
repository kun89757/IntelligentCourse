<template>
  <div id="pie" style="width: 100%;height:100%;" ref="pie"></div>
</template>

<script>
  import * as echarts from 'echarts'
export default {
  data() {
    return {
      roleId: localStorage.getItem('roleId'),
      conceptList: [],
      option: {
        title: {
          text: '概念前三名',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '观看数',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:[]
          }
        ]
      }
    }
  },
  created() {
      this.getConceptTopN();
    },
    watch: {
      option: {
        handler(newVal, oldVal) {
          if (this.charts) {
            if (newVal) {
              this.charts.setOption(newVal);
            } else {
              this.charts.setOption(oldVal);
            }
          } else {
            this.show();
          }
        },
        deep: true
      }
    },
    methods: {
      show() {
        this.charts = echarts.init(this.$refs.pie)
        this.charts.setOption(this.option, true);
        window.addEventListener('resize', () => {
          this.charts.resize();
        })
      },
      getConceptTopN() {
      let data = {
        n : 3
      }
      if (this.roleId == 1) {
        this.$store.dispatch('admin/getConceptTopN', data)
        .then(res => {
          if (res.code === 200) {
            console.log(res);
            let list = res.data;
            list.forEach(item => {
              this.conceptList.push({
                value: item.visCnt,
                name: item.conceptName,
              })
            });
            this.option.series[0].data = this.conceptList;
          } else {
            this.$message.error(res.message);
          }
        }).catch(error => {
          console.log(error);
        })
      } else {
        this.$store.dispatch('admin/getMyConceptTopN', data)
        .then(res => {
          if (res.code === 200) {
            console.log(res);
            let list = res.data;
            list.forEach(item => {
              this.conceptList.push({
                value: item.visCnt,
                name: item.conceptName,
              })
            });
            this.option.series[0].data = this.conceptList;
          } else {
            this.$message.error(res.message);
          }
        }).catch(error => {
          console.log(error);
        })
      }
    },
    }
  }
</script>
<style scoped>

</style>