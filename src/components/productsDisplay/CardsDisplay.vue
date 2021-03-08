<template>
  <div
    v-if="products.length"
    v-loading="loading"
    class="cards-display-container"
  >
    <ProductCard
      v-for="product in products"
      :key="product.productName"
      :product="product"
    />
  </div>
  <el-empty
    v-else
    description="暂无商品信息"
  />
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
    return {
      products,
      loading
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
