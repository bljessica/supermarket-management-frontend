export default {
  title: {
    text: '一周内日销售额和利润变化（单位：元）'
  },
  tooltip: {
    trigger: 'axis'
  },
  toolbox: {
    show: true
  },
  legend: {
    right: 30,
    data: ['销售额', '利润']
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value} 元'
    }
  },
  series: [
    {
      name: '销售额',
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
    },
    {
      name: '利润',
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
