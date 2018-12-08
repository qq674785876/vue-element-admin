<template>
  <div id="lineChart" class="chart-container"/>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'Chart',
  components: { echarts },
  props: {
    lineChartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      myChart: null
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    resize() {
      const _this = this
      setTimeout(function() {
        _this.myChart.resize()
      }, 100)
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.myChart = echarts.init(document.getElementById('lineChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: this.lineChartData.legend
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.lineChartData.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: this.lineChartData.series
      })
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: 340px;
}
</style>

