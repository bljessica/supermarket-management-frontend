<template>
  <div class="header" style="height: 100%; display: flex; align-items: center; justify-content: space-between;">
    <h1 class="header__title">超市进销存管理系统</h1>
    <div class="header__user" style="display: flex; align-items: center; justify-content: space-between;">
      <el-avatar :size="40" :src="circleUrl"></el-avatar>
      <span>名字</span>
      <el-divider direction="vertical"></el-divider>
      <el-link type="primary">个人中心</el-link>
      <el-divider direction="vertical"></el-divider>
      <span>退出</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  }
})
</script>

<style>

</style>
