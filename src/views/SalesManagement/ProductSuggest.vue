<template>
  <div
    v-loading="loading"
    class="product-suggest-container"
  >
    <ProductRank
      title="销量排行榜"
      :list="salesVolumnRankList"
    />
    <ProductRank
      title="总销售额排行榜"
      :list="totalAmountRankList"
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
      return list.length > 3 ? list.slice(0, 3) : list
    },
    totalAmountRankList () {
      const list = this.list.slice()
      list.sort((a, b) => (b.amount - a.amount))
      return list.length > 3 ? list.slice(0, 3) : list
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
