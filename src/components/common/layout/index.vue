<template>
  <el-container style="height: 100vh;width: 100vw;">
    <el-header style="background:#B3C0D1;">
      <Header />
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        style="background: #D3DCE6;"
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
  }
})
</script>
