<template>
  <div class="table-display-container">
    <el-table
      :data="data"
      style="width: 100%"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
      />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import columns from './tableColumns'

export default defineComponent({
  name: 'TableDisplay',
  setup () {
    const data = ref([
      {
        name: 'product1',
        num: 50
      },
      {
        name: 'product1',
        num: 50
      }
    ])
    return {
      columns,
      data
    }
  }
})
</script>

<style>

</style>
