<template>
  <div style="display: flex;flex-direction: column;align-items: center;">
    <el-menu
      default-active="week"
      mode="horizontal"
      style="margin-bottom: 30px;"
      @select="typeShow = $event"
    >
      <el-menu-item index="week">
        周
      </el-menu-item>
      <el-menu-item index="month">
        月
      </el-menu-item>
      <el-menu-item index="year">
        年
      </el-menu-item>
    </el-menu>
    <div
      v-if="typeShow === 'week'"
      id="week-sales-chart"
      class="sales-chart"
    />
    <div
      v-if="typeShow === 'month'"
      id="month-sales-chart"
      class="sales-chart"
    />
    <div
      v-if="typeShow === 'year'"
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
    const typeShow = ref('week')
    return {
      weekSalesChartOption: weekSalesChartOptionRef,
      monthSalesChartOption: monthSalesChartOptionRef,
      yearSalesChartOption: yearSalesChartOptionRef,
      typeShow
    }
  },
  watch: {
    typeShow: {
      handler (val) {
        if (val === 'week') {
          this.initWeekChart('week', this.weekSalesChartOption)
        } else if (val === 'month') {
          this.initWeekChart('month', this.monthSalesChartOption)
        } else if (val === 'year') {
          this.initWeekChart('year', this.yearSalesChartOption)
        }
      },
      immediate: true
    }
  },
  methods: {
    initWeekChart (type: string, option) {
      this.$nextTick(async () => {
        const salesChartDom = document.getElementById(type + '-sales-chart')
        const salesChart = echarts.init(salesChartDom)
        const res = await this.$api.getTotalSales({ type })
        const data = res.data.map(item => item.totalSales)
        if (type !== 'week') {
          option.xAxis.data = res.data.map((item, idx) => (idx + 1))
        }
        option.series[0].data = data
        option.series[1].data = res.data.map(item => item.totalProfit)
        salesChart.setOption(option)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.sales-chart {
  width: 80%;
  height: 500px;
}
:deep(.el-menu) {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
}
</style>
