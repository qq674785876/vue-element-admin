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
      myChart: null,
      option: {
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
          type: 'value',
          minInterval: 1
        },
        series: this.lineChartData.series
      }
    }
  },
  watch: {
    lineChartData: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          this.option.legend = this.lineChartData.legend
          this.option.xAxis.data = this.lineChartData.xAxis
          this.option.series = this.lineChartData.series
          this.myChart.setOption(this.option)
        }
      },
      deep: true
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
      myChart.setOption(this.option)
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

