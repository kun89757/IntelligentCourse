<template>
  <div id="bar" style="width: 100%;height:100%;" ref="bar"></div>
</template>
<script>
  import * as echarts from 'echarts'
  export default {
    data() {
      return {
        xValue: [],
        yValue: [],
        roleId: localStorage.getItem('roleId'),
        option: {
          title: {
            text: '当日点击量前三',
            left: 'center'
          },
          color: ['#d84430'],
          tooltip: {
            show: true
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              inside: true,
              verticalAlign: 'bottom',
              lineHeight: 40,
              color: '#d84430',
              formatter: function (value, index) {
                if (index > 2) {
                  return '{first|' + value + '}'
                } else {
                  return '{other|' + value + '}'
                }
              },
              rich: {
                other: {
                  color: '#f38237',
                  opacity: 0.57
                },
                first: {
                  color: '#e2aa20'
                }
              }
            },
            data: this.yValue
          },
          xAxis: {
            nameTextStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              align: 'right'
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.8)'
            },
          },
          grid: {
            top: '0%',
            bottom: '0%',
            left: '0%',
            right: '0%'
          },
          series: [{
            name: '观看排行',
            barWidth: 15,
            type: 'bar',
            data: this.xValue,
            itemStyle: {
              normal: {
                borderRadius: [3, 20, 20, 3],
                color: function (params) {   // 设置柱形图的颜色
                  if (params.dataIndex === 2) {
                    return '#d84430'
                  } else if (params.dataIndex === 1) {
                    return '#f38237'
                  } else if (params.dataIndex === 0) {
                    return '#e2aa20'
                  } else {
                    return '#608289'
                  }
                }
              },
            }
          }]
        }
      };
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
        this.charts = echarts.init(this.$refs.bar)
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
            this.conceptTopN = res.data;
            let value = [];
            this.conceptTopN.forEach(item => {
              value.push({
                xValue: item.visCnt,
                yValue: item.conceptName
              })
            })
            value.sort((a, b) => {
              return a.visCnt > b.visCnt;
            })
            value.reverse();
            value.forEach(item => {
              this.xValue.push(item.xValue);
              this.yValue.push(item.yValue);
            })
            console.log(value)
            this.option.series[0].data = this.xValue;
            this.option.yAxis.data = this.yValue;
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
            this.conceptTopN = res.data;
            let value = [];
            this.conceptTopN.forEach(item => {
              value.push({
                xValue: item.visCnt,
                yValue: item.conceptName
              })
            })
            value.sort((a, b) => {
              return a.visCnt > b.visCnt;
            })
            value.reverse();
            value.forEach(item => {
              this.xValue.push(item.xValue);
              this.yValue.push(item.yValue);
            })
            console.log(value)
            this.option.series[0].data = this.xValue;
            this.option.yAxis.data = this.yValue;
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
