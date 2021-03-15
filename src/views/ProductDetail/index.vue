<template>
  <div>
    <el-button
      round
      plain
      icon="el-icon-arrow-left"
      size="small"
      @click="$router.go(-1)"
    >
      返回
    </el-button>
    <ProductCard
      :show-hover-actions="false"
      style="margin-top: 20px;"
      :product="product"
    />
    <el-table
      v-loading="tableLoading"
      style="margin-top: 20px;"
      :data="[]"
      border
    >
      <el-table-column
        v-for="column in inventoryChangeTableColumns"
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
import ProductCard from '@/components/productsDisplay/ProductCard.vue'
import inventoryChangeTableColumns from './inventoryChangeTableColumns'

export default defineComponent({
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  setup () {
    const product = ref({})
    const tableLoading = ref<boolean>(false)
    return {
      product,
      tableLoading,
      inventoryChangeTableColumns
    }
  },
  async mounted () {
    const res = await (this as any).$api.getProduct({ _id: this.$route.params._id })
    this.product = res.data
  }
})
</script>

<style lang="scss" scoped>
:deep(.product-card-title) h3 {
  width: 70% !important;
}
</style>
