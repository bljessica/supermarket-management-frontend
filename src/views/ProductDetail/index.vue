<template>
  <div class="product-detail">
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
      :data="productInventoryChangeTableData"
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
      <el-table-column
        label="类型"
        width="100"
      >
        <template #default="scope">
          <el-tag :type="(scope.row.type === '购入') ? 'success' : 'warning'">
            {{ scope.row.type }}
          </el-tag>
        </template>
      </el-table-column>
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
    const productInventoryChangeTableData = ref([])
    return {
      product,
      tableLoading,
      inventoryChangeTableColumns,
      productInventoryChangeTableData
    }
  },
  async mounted () {
    let res = await this.$api.getProduct({ _id: this.$route.params._id })
    this.product = res.data
    this.tableLoading = true
    res = await this.$api.getProductInventoryChange({ _id: this.$route.params._id })
    this.productInventoryChangeTableData = res.data
    this.tableLoading = false
  }
})
</script>

<style lang="scss" scoped>
.product-detail {
  :deep(.product-card-title) h3 {
    width: 70% !important;
  }
  :deep(.product-card-content__img) {
    width: 220px !important;
  }
}
</style>
