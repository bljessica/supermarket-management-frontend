<template>
  <div>
    <el-menu
      default-active="week"
      mode="horizontal"
      @select="handleSelect"
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
    <!-- 报表 -->
    <el-table
      v-loading="loading"
      style="margin-top: 20px;"
      :data="salesReportData"
      border
    >
      <el-table-column
        v-for="column in salesReportTableColumns"
        :key="column.key"
        :width="column.width"
        :fixed="column.fixed"
        :label="column.label"
        :prop="column.key"
        show-overflow-tooltip
      />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import salesReportTableColumns from './salesReportTableColumns'

export default defineComponent({
  name: 'SalesReport',
  setup () {
    const loading = ref<boolean>(false)
    const type = ref<'week' | 'month' | 'year'>('week')
    const salesReportData = ref([])
    const handleSelect = (selectedType) => {
      type.value = selectedType
    }
    return {
      loading,
      type,
      salesReportData,
      handleSelect,
      salesReportTableColumns
    }
  },
  watch: {
    type: {
      async handler (type) {
        const res = await this.$api.getSalesReport({
          type
        })
        this.salesReportData = res.data
      },
      immediate: true
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  display: flex;
  justify-content: space-evenly;
}
</style>
