<template>
  <div>
    <div
      v-if="products.length || loading"
      v-loading="loading"
      class="cards-display-container"
    >
      <ProductCard
        v-for="product in products"
        :key="product.productName"
        :product="product"
        @getProducts="getProducts"
        @editProduct="$emit('editProduct', product)"
      />
    </div>
    <el-pagination
      v-if="products.length || loading"
      style="margin-top: 20px;"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :current-page="pagination.pageIdx"
      @current-change="getProducts($event)"
    />
    <el-empty
      v-else
      description="暂无商品信息"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import productsDisplayMixin from '@/mixins/productsDisplayMixin'

export default defineComponent({
  name: 'CardsDisplay',
  components: {
    ProductCard
  },
  mixins: [productsDisplayMixin],
  setup () {
    const products = ref([])
    const loading = ref<boolean>(false)
    const pagination = {
      total: 0,
      pageIdx: 1,
      pageSize: 12
    }
    return {
      products,
      loading,
      pagination
    }
  }
})
</script>

<style lang="scss" scoped>
.cards-display-container {
  box-sizing: border-box;
  margin-top: 10px;
  display: grid;
  gap: 20px;
}
@media (min-width: 1500px) {
  .cards-display-container {
    grid-template-columns: repeat(4, 1fr);
  }
}
@media (min-width: 1180px) and (max-width: 1500px) {
  .cards-display-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (min-width: 920px) and (max-width: 1180px) {
  .cards-display-container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 920px) {
  .cards-display-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
