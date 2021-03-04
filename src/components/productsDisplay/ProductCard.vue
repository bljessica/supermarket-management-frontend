<template>
  <el-card
    class="product-card-container"
    style="width: 100%;height: 220px;"
  >
    <template #header>
      <div class="product-card-title">
        <h3>poduct1</h3>
        <span style="font-size: 12px;">状态：售罄</span>
      </div>
    </template>
    <div class="product-card-content">
      <span style="grid-area: a">简介</span>
      <span style="grid-area: b">这是一个商品...</span>
      <span style="grid-area: c">数量</span>
      <span style="grid-area: d">poduct1</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ProductCard'
})
</script>

<style lang="scss" scoped>
.product-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}
.product-card-content {
  height: 100px;
  margin-top: 10px;
  display: grid;
  grid-template-areas: 'a b' 'c d';
  grid-template-columns: 1fr 2fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
  font-size: 12px;
}
</style>
