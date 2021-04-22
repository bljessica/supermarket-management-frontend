<template>
  <div
    v-loading="loading"
    class="product-suggest-container"
  >
    <ProductRank
      title="月销量排行榜"
      :list="salesVolumnRankList"
    />
    <ProductRank
      title="月总销售额排行榜"
      :list="totalAmountRankList"
    />
    <ProductRank
      title="月总利润排行榜"
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
    return {
      loading,
      list
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

<style>

</style>
