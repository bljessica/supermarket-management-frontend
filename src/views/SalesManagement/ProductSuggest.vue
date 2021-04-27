<template>
  <div
    v-loading="loading"
    class="product-suggest-container"
  >
    <el-menu
      default-active="salesVolumn"
      mode="horizontal"
      @select="typeShow = $event"
    >
      <el-menu-item index="salesVolumn">
        月销量排行榜
      </el-menu-item>
      <el-menu-item index="totalAmount">
        月总销售额排行榜
      </el-menu-item>
      <el-menu-item index="totalProfit">
        月总利润排行榜
      </el-menu-item>
    </el-menu>
    <ProductRank
      v-if="typeShow === 'salesVolumn'"
      :list="salesVolumnRankList"
    />
    <ProductRank
      v-if="typeShow === 'totalAmount'"
      :list="totalAmountRankList"
    />
    <ProductRank
      v-if="typeShow === 'totalProfit'"
      :list="totalProfitRankList"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductRank from '@/components/ProductSuggest/ProductRank.vue'

export default defineComponent({
  name: 'ProductSuggest',
  components: {
    ProductRank
  },
  setup () {
    const loading = ref(false)
    const list = ref([])
    const typeShow = ref('salesVolumn')
    return {
      loading,
      list,
      typeShow
    }
  },
  computed: {
    salesVolumnRankList () {
      const list = this.list.slice()
      list.sort((a, b) => (b.num - a.num))
      return list
    },
    totalAmountRankList () {
      const list = this.list.slice()
      list.sort((a, b) => (b.amount - a.amount))
      return list
    },
    totalProfitRankList () {
      const list = this.list.slice()
      list.sort((a, b) => (b.profit - a.profit))
      return list
    }
  },
  async created () {
    this.loading = true
    const res = await this.$api.productSuggest()
    this.list = res.data
    this.loading = false
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  display: flex;
  justify-content: space-evenly;
}
</style>
