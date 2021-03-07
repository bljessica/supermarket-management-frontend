<template>
  <div class="table-display-container">
    <el-table
      :data="products"
      border
    >
      <el-table-column
        type="selection"
        width="50"
      />
      <el-table-column
        v-for="column in columns"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        width="150"
      >
        <Auth
          size="small"
          text="编辑"
          action-auth="EDIT_PRODUCT"
        />
        <Auth
          size="small"
          text="删除"
          action-auth="EDIT_PRODUCT"
        />
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import columns from './tableColumns'
import Auth from '@/components/common/Auth'

export default defineComponent({
  name: 'TableDisplay',
  components: {
    Auth
  },
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
