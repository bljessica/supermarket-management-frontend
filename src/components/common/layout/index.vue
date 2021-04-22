<template>
  <el-container style="height: 100vh;width: 100vw;">
    <el-header style="height: unset;border-bottom: 1px solid #ddd;">
      <Header />
    </el-header>
    <el-container style="height: 100%;">
      <el-aside
        v-if="showAside"
        width="220px"
        style="background-color: #fff;border-right: 1px solid #ddd;"
      >
        <Aside />
      </el-aside>
      <el-main style="height: calc(100vh - 71px);overflow: auto;">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './Header.vue'
import Aside from './Aside.vue'

export default defineComponent({
  name: 'Layout',
  components: {
    Header,
    Aside
  },
  props: {
    showAside: {
      type: Boolean,
      default: true
    }
  }
})
</script>

<style lang="scss" scoped>
.el-aside :deep(.el-menu) {
  border-right: none !important;
}
</style>
