<template>
  <el-card class="product-card-container">
    <template #header>
      <div class="product-card-title">
        <h3 style="color: #909399">
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
      <span style="grid-area: a">简介：</span>
      <span
        style="
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          grid-area: b/b/d/d;
        "
      >
        {{ product.description || '暂无' }}
      </span>
      <span style="grid-area: e">价格：</span>
      <span style="grid-area: f">{{ product.price }}</span>
      <span style="grid-area: g">单位：</span>
      <span style="grid-area: h">{{ product.unit }}</span>
      <span style="grid-area: i">库存量：</span>
      <span style="grid-area: j">{{ product.inventory }}</span>
      <span style="grid-area: k">库存上限：</span>
      <span style="grid-area: l">{{ product.inventoryCeiling }}</span>
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
  margin-top: 10px;
  display: grid;
  grid-template-areas: "a b c d" "e f g h" "i j k l";
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  font-size: 12px;
}
</style>
