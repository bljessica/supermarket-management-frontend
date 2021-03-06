<template>
  <div class="table-display-container">
    <el-table
      :data="products"
      border
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
  props: {
    refresh: {
      type: Boolean
    }
  },
  setup () {
    const products = ref([])
    return {
      columns,
      products
    }
  },
  watch: {
    refresh: {
      async handler () {
        await this.getProducts()
      },
      immediate: true
    }
  },
  async created () {
    await this.getProducts()
  },
  methods: {
    async getProducts () {
      const res = await (this as any).$api.getAllProducts()
      this.products = res.data
    }
  }
})
</script>

<style>

</style>
