<template>
  <div id="wordCloud" style="width: 100%;height:100%;" ref="wordCloud"></div>
</template>

<script>
  import * as echarts from 'echarts'
  import '@/utils/wordCloud.js'
  export default {
    data() {
      return {
        roleId: localStorage.getItem('roleId'),
        conceptTopN: [],
        option: {
          series: [{
            type: 'wordCloud',
            sizeRange: [15, 80],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 8,
            shape: 'diamond',
            width: '100%',
            height: '100%',
            textStyle: {
              color() {
                return 'rgb(' + [
                  Math.round(Math.random() * 250),
                  Math.round(Math.random() * 250),
                  Math.round(Math.random() * 250)
                ].join(',') + ')';
              },
            },
            data: this.conceptTopN
        }]
        }
      }
    },
    created() {
      this.getConceptTopN();
    },
    methods: {
      show() {
        this.charts = echarts.init(this.$refs.wordCloud);
        this.charts.setOption(this.option, true);
        window.addEventListener('resize', () => {
          this.charts.resize();
        })
      },
      getConceptTopN() {
        let data = {
          n : 30
        };
        if (this.roleId == 1) {
        this.$store.dispatch('admin/getConceptTopN', data)
        .then(res => {
          if (res.code === 200) {
            console.log(res);
            let list = res.data;
            list.forEach(item => {
              this.conceptTopN.push({
                name: item.conceptName,
                value: item.visCnt
              })
            })
            this.option.series[0].data = this.conceptTopN;
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
              this.conceptTopN.push({
                name: item.conceptName,
                value: item.visCnt
              })
            })
            this.option.series[0].data = this.conceptTopN;
          } else {
            this.$message.error(res.message);
          }
        }).catch(error => {
          console.log(error);
        })
      }
      },
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
}
</script>