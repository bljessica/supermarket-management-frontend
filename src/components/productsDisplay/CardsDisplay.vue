<template>
  <div class="cards-display-container">
    <ProductCard
      v-for="i in 20"
      :key="i"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProductCard from './ProductCard.vue'

export default defineComponent({
  name: 'CardsDisplay',
  components: {
    ProductCard
  }
})
</script>

<style lang="scss">
.cards-display-container {
  box-sizing: border-box;
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}
</style>
