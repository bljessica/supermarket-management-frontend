<template>
  <div
    v-if="products.length"
    class="cards-display-container"
  >
    <ProductCard
      v-for="product in products"
      :key="product.productName"
      :product="product"
    />
  </div>
  <el-card v-else>
    暂无商品数据
  </el-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ProductCard from './ProductCard.vue'

export default defineComponent({
  name: 'CardsDisplay',
  components: {
    ProductCard
  },
  props: {
    refresh: {
      type: Boolean
    }
  },
  setup () {
    const products = ref([])
    return {
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
