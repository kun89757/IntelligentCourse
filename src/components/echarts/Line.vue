<template>
  <div>
    <v-charts
    class="chart"
    :option="option"></v-charts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: this.getData(),
    }
  },
  computed: {
    option() {
      return {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          left: 'center',
          text: '日活量'
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'time',
          boundaryGap: false
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        series: [
          {
            name: '日活量',
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {},
            data: this.data
          }
        ]
      }
    }
  },
  methods: {
    getData() {
      let base = +new Date(2022, 12, 1);
      let oneDay = 24 * 3600 * 1000;
      let data = [];
      for (let i = 0; i < 100; i++) {
        let now = new Date((base += oneDay));
        data.push([+now, Math.round(Math.random()* 100 + 100)]);
      }
      return data;
    }
  },
  created() {
    this.data = this.getData();
  }
}
</script>
