<template>
  <div
    class="product-rank-container"
    style="text-align: center;margin-bottom: 40px;overflow: hidden;"
  >
    <h3 class="product-rank__title">
      {{ title }}
    </h3>
    <div
      class="rank-list-container"
      style="display: flex;align-items: flex-end;justify-content: center;"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="rank-list__item"
        style="width: 160px;position: relative;margin: 0 5px;display: flex;flex-direction: column;align-items: center;justify-content: flex-end;"
        :style="{width: 160 * getScale(i) + 'px', cursor: list[getIdx(i)]?.id && 'pointer'}"
        @click=" list[getIdx(i)]?.id && $router.push({path: '/productDetail/' + list[getIdx(i)].id})"
      >
        <img
          :src="list[getIdx(i)]?.image || defaultImgUrl.default"
          style="width: 160px;height: 200px;display: block;border: 1px solid #ccc;border-radius: 20px;overflow: hidden;"
          :style="{width: 160 * getScale(i) + 'px', height: 200 * getScale(i) + 'px'}"
        >
        <div style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;">
          {{ list[getIdx(i)]?._id || '暂无' }}
        </div>
        <SvgIcon
          name="crown"
          :color="crownColor[getIdx(i)]"
          :hover-change-color="false"
          style="transform: translateX(-50%) translateY(-50%) rotate(-45deg);position: absolute;left: 0;top: 0;"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    return {
      defaultImgUrl: require('../../assets/imgs/product.jpg'),
      crownColor: ['#f2c105', '#cccccc', '#935a15']
    }
  },
  methods: {
    getIdx (idx: number) {
      return idx === 2 ? 0 : (idx === 1 ? 1 : 2)
    },
    getScale (idx: number) {
      return idx === 1 ? 0.9 : (idx === 2 ? 1 : 0.8)
    }
  }
})
</script>

<style>

</style>
