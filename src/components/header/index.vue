<template>
  <div
    class="header"
    style="height: 100%; display: flex; align-items: center; justify-content: space-between;"
  >
    <h1 class="header__title">
      超市进销存管理系统
    </h1>
    <div
      v-if="userName"
      class="header__user"
      style="display: flex; align-items: center; justify-content: space-between;"
    >
      <el-avatar
        :size="40"
        src="../../assets/imgs/user.svg"
      />
      <span>{{ userName }}</span>
      <el-divider direction="vertical" />
      <el-link type="primary">
        个人中心
      </el-link>
      <el-divider direction="vertical" />
      <span>退出</span>
    </div>
    <el-link
      v-else
      @click="$router.replace({path: '/loginOrRegister/login'})"
    >
      登录/注册
    </el-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Header',
  setup () {
    return {
      // circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  computed: {
    userName () {
      return this.$store.state.user.userName
    }
  }
})
</script>

<style>

</style>
