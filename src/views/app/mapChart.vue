<template>
  <div id="mapChart" class="chart-container"/>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'

export default {
  name: 'Chart',
  components: { echarts },
  props: {
    mapChartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      myChart: null,
      option: {
        backgroundColor: '#fff',
        // 标题
        title: {
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        // 地图上圆点的提示
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            return params.name + ' : ' + params.value[2]
          }
        },
        // 图例按钮 点击可选择哪些不显示
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'bottom',
          data: ['地区热度'],
          textStyle: {
            color: '#fff'
          },
          show: false
        },
        // 地理坐标系组件
        geo: {
          map: 'china',
          label: {
            // true会显示城市名
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            // 地图背景色
            normal: {
              areaColor: '#f7f7f7',
              borderColor: '#ccc'
            },
            // 悬浮时
            emphasis: {
              areaColor: '#8796B4'
            }
          }
        },
        // 系列列表
        series: [
          {
            name: '地区热度',
            // 表的类型 这里是散点
            type: 'scatter',
            // 使用地理坐标系，通过 geoIndex 指定相应的地理坐标系组件
            coordinateSystem: 'geo',
            data: this.mapChartData,
            // 标记的大小
            symbolSize(val) {
              // val[2] / 10
              let size = 0
              if (val[2] * 3 > 60) {
                size = 50
              } else {
                size = val[2] * 3
              }
              return size
            },
            // 鼠标悬浮的时候在圆点上显示数值
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                  offset: 0,
                  color: 'rgb(251, 118, 123)'
                }, {
                  offset: 1,
                  color: 'rgb(204, 46, 72)'
                }])
              },
              // 鼠标悬浮的时候圆点样式变化
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    mapChartData: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          this.option.series[0].data = this.mapChartData
          // for(let i = 0 ; i < this.mapChartData.length; i++){
          //   this.option.series[0].data[i].value[2] = i * 30
          // }
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
      const myChart = this.myChart = echarts.init(document.getElementById('mapChart'))
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
  height: 500px;
}
</style>

