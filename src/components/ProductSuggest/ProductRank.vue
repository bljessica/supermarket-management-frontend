<template>
  <div
    class="product-rank-container"
    style="text-align: center;margin-bottom: 40px;overflow: hidden;"
  >
    <h3
      v-if="showTitle"
      class="product-rank__title"
    >
      {{ title }}
    </h3>
    <div
      class="rank-list-container"
      style="display: flex;align-items: flex-end;justify-content: center;margin-top: 30px;"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="rank-list__item"
        style="position: relative;margin: 0 5px;display: flex;flex-direction: column;align-items: center;justify-content: flex-end;"
        :style="{width: 200 * getScale(i) + 'px', cursor: list[getIdx(i)]?.id && 'pointer'}"
        @click=" list[getIdx(i)]?.id && $router.push({path: '/productDetail/' + list[getIdx(i)].id})"
      >
        <img
          :src="list[getIdx(i)]?.image || defaultImgUrl.default"
          style="display: block;border: 1px solid #ddd;border-radius: 20px;overflow: hidden;"
          :style="{width: 200 * getScale(i) + 'px', height: 240 * getScale(i) + 'px'}"
        >
        <div style="margin-top: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width: 100%;">
          {{ (getIdx(i) + 1) + '. ' + (list[getIdx(i)]?._id || '暂无') }}
        </div>
        <SvgIcon
          name="crown"
          :color="crownColor[getIdx(i)]"
          :hover-change-color="false"
          style="transform: translateX(-50%) translateY(-50%) rotate(-45deg);position: absolute;left: 0;top: 0;"
        />
      </div>
    </div>
    <div
      ref="moreList"
      class="more-list-container"
      :style="{display: list.length <= 3 ? 'block' : 'grid',
               gridTemplateColumns: list.length < 7 ? 'repeat(' + (list.length - 3) + ', 1fr)' : 'repeat(4, 1fr)'}"
    >
      <div
        v-for="(item, idx) in list.slice(3)"
        :key="item._id"
        class="more-list__item"
        :style="{textAlign: list.length < 7 ? 'center' : 'left',}"
        @click="$router.push({path: '/productDetail/' + item.id})"
      >
        {{ (4 + idx) + '. ' + item._id }}
      </div>
      <div
        v-if="list.length <= 3"
        style="padding-top: 10px;font-size: 14px;color: #999;"
      >
        暂无更多商品
      </div>
    </div>
    <span
      class="show-more"
      @click="showMoreList = !showMoreList"
    >
      <span>{{ showMoreList ? '收起' : '查看更多' }}</span>
      <SvgIcon
        class="show-more__icon"
        name="up-arrow"
        :hover-change-color="false"
        color="rgb(71, 174, 243)"
        :style="{transform: showMoreList ? 'rotate(0)' : 'rotate(180deg)'}"
      />
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const showMoreList = ref(false)
    return {
      defaultImgUrl: require('@/assets/imgs/product.png'),
      crownColor: ['#f2c105', '#cccccc', '#935a15'],
      showMoreList
    }
  },
  watch: {
    showMoreList: {
      handler (val) {
        if (val) {
          this.$nextTick(() => {
            this.$refs.moreList.style.maxHeight = '200px'
          })
        } else {
          this.$nextTick(() => {
            this.$refs.moreList.style.maxHeight = 0
          })
        }
      },
      immediate: true
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

<style lang="scss" scoped>
.show-more {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  margin-top: 10px;
  color: rgb(71, 174, 243);
  cursor: pointer;
  .show-more__icon {
    transition: all .3s ease-in-out;
  }
}
.more-list-container {
  gap: 10px;
  width: 80%;
  margin: 10px auto 0;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
}
.more-list__item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  text-align: left;
}
</style>
