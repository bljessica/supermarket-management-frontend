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
      style="margin-top: 20px;"
      :product="product"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import ProductCard from '@/components/productsDisplay/ProductCard'

export default defineComponent({
  name: 'ProductDetail',
  components: {
    ProductCard
  },
  setup () {
    const product = ref({})
    return {
      product
    }
  },
  async mounted () {
    const res = await this.$api.getProduct({ _id: this.$route.params._id })
    this.product = res.data
  }
})
</script>

<style lang="scss" scoped>
:deep(.product-card-title) h3 {
  width: 70% !important;
}
</style>
