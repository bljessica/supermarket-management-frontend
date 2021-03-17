export default {
  title: {
    text: '一月内日销售额变化',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    show: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 元'
    }
  },
  series: [
    {
      type: 'line',
      data: [],
      markPoint: {
        data: [
          { type: 'max', name: '最大值' },
          { type: 'min', name: '最小值' }
        ]
      },
      markLine: {
        data: [
          { type: 'average', name: '平均值' }
        ]
      }
    }
  ]
}
