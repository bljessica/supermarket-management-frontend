<template>
  <el-card class="product-card-container">
    <template #header>
      <div class="product-card-title">
        <h3 style="color: #909399;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 180px;">
          {{ product.productName }}
        </h3>
        <span
          style="font-size: 12px;margin-right: 8px;"
        >状态：
          <el-tag
            size="mini"
            :type="product.status === '售罄' ? 'danger' : 'success'"
          >
            {{ product.status }}
          </el-tag>
        </span>
      </div>
    </template>
    <div class="product-card-content">
      <img
        style="grid-area: a / a / m / n;width: 120px;height: 100px;"
        :src="product.image"
      >
      <span style="grid-area: c">价格：</span>
      <span style="grid-area: d">{{ product.price }}</span>
      <span style="grid-area: g">单位：</span>
      <span style="grid-area: h">{{ product.unit }}</span>
      <span style="grid-area: k">库存量：</span>
      <span style="grid-area: l">{{ product.inventory }}</span>
      <span style="grid-area: o">库存上限：</span>
      <span style="grid-area: p">{{ product.inventoryCeiling }}</span>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    productStatus (): string {
      return this.product.inventory === 0 ? '售罄' : '正常'
    }
  }
})
</script>

<style lang="scss" scoped>
.product-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  height: 20px;
}
.product-card-content {
  display: grid;
  grid-template-areas: "a b c d" "e f g h" "i j k l" 'm n o p';
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
  font-size: 12px;
}
</style>
