<template>
  <el-container style="height: 100vh;width: 100vw;">
    <el-header style="padding: 0;">
      <Header />
    </el-header>
    <el-container>
      <el-aside
        v-if="showAside"
        width="200px"
        style="background-color: #D3DCE6;"
      >
        <Aside />
      </el-aside>
      <el-main>
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
