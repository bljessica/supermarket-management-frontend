<template>
  <div style="display: flex;flex-direction: column;align-items: center;">
    <div
      id="week-sales-chart"
      class="sales-chart"
    />
    <div
      id="month-sales-chart"
      class="sales-chart"
    />
    <div
      id="year-sales-chart"
      class="sales-chart"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import weekSalesChartOption from './chartOptions/weekSalesChartOption'
import monthSalesChartOption from './chartOptions/monthSalesChartOption'
import yearSalesChartOption from './chartOptions/yearSalesChartOption'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'StatisticCharts',
  setup () {
    const weekSalesChartOptionRef = ref(weekSalesChartOption)
    const monthSalesChartOptionRef = ref(monthSalesChartOption)
    const yearSalesChartOptionRef = ref(yearSalesChartOption)
    return {
      weekSalesChartOption: weekSalesChartOptionRef,
      monthSalesChartOption: monthSalesChartOptionRef,
      yearSalesChartOption: yearSalesChartOptionRef
    }
  },
  mounted () {
    this.initWeekChart('week', this.weekSalesChartOption)
    this.initWeekChart('month', this.monthSalesChartOption)
    this.initWeekChart('year', this.yearSalesChartOption)
  },
  methods: {
    initWeekChart (type: string, option) {
      this.$nextTick(async () => {
        const salesChartDom = document.getElementById(type + '-sales-chart')
        const salesChart = echarts.init(salesChartDom)
        const res = await this.$api.getTotalSales({ type })
        const data = res.data.map(item => item.total)
        if (type !== 'week') {
          option.xAxis.data = res.data.map((item, idx) => (idx + 1))
        }
        option.series[0].data = data
        salesChart.setOption(option)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.sales-chart {
  width: 70%;
  height: 400px;
}
</style>
