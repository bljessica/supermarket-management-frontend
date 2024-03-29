<template>
  <div>
    <el-card
      class="product-card-container"
    >
      <template #header>
        <div class="product-card-title">
          <el-tooltip
            class="item"
            effect="dark"
            :content="product.productName"
            placement="bottom"
          >
            <h3
              style="color: #909399;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 180px;cursor: pointer;"
              @click="$router.push({path: '/productDetail/' + product._id})"
            >
              {{ product.productName }}
            </h3>
          </el-tooltip>
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
      <div
        class="product-card-content"
        @mouseenter="showHoverActions && (actionsShow = true)"
        @mouseleave="showHoverActions && (actionsShow = false)"
      >
        <img
          class="product-card-content__img"
          style="grid-area: a / a / r / r;width: 90%;height: 90%;"
          :src="product.image || defaultImgUrl.default"
        >
        <span style="grid-area: c">进价</span>
        <span style="grid-area: d">{{ product.purchasePrice }}</span>
        <span style="grid-area: g">售价</span>
        <span style="grid-area: h">{{ product.price }}</span>
        <span style="grid-area: k">单位：</span>
        <span style="grid-area: l">{{ product.unit }}</span>
        <span style="grid-area: o">库存量：</span>
        <span style="grid-area: p">{{ product.inventory }}</span>
        <span style="grid-area: s">库存上限：</span>
        <span style="grid-area: t">{{ product.inventoryCeiling }}</span>
        <transition name="fade">
          <div
            v-show="actionsShow"
            class="mask"
          >
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              :disabled="!hasAuth('EDIT_PRODUCT')"
              @click="$emit('editProduct')"
            />
            <el-popconfirm
              title="确定删除此商品吗？"
              confirm-button-text="确定"
              cancel-button-text="取消"
              @confirm="deleteProduct"
            >
              <template #reference>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  :disabled="!hasAuth('EDIT_PRODUCT')"
                />
              </template>
            </el-popconfirm>
          </div>
        </transition>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import authMixin from '@/mixins/authMixin'

export default defineComponent({
  name: 'ProductCard',
  mixins: [authMixin],
  props: {
    product: {
      type: Object,
      required: true
    },
    showHoverActions: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const actionsShow = ref<boolean>(false)
    return {
      actionsShow,
      defaultImgUrl: require('@/assets/imgs/product.png')
    }
  },
  computed: {
    productStatus (): string {
      return this.product.inventory === 0 ? '售罄' : '正常'
    }
  },
  methods: {
    async deleteProduct () {
      await this.$api.deleteProduct({
        _id: this.product._id,
        productName: this.product.productName
      })
      this.$emit('getProducts')
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
  height: 120px;
  display: grid;
  grid-template-areas: "a b c d"
                       "e f g h"
                       "i j k l"
                       "m n o p"
                       "q r s t";
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 8px;
  font-size: 12px;
  position: relative;
}
.mask {
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  left: -20px;
  right: -20px;
  top: -20px;
  bottom: -20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
