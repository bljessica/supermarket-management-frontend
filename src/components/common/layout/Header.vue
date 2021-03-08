<template>
  <div
    class="header"
    style="height: 100%; display: flex; align-items: center; justify-content: space-between;"
  >
    <h1 class="header__title">
      超市进销存管理系统
    </h1>
    <div
      v-if="username"
      class="header__user"
      style="display: flex; align-items: center; justify-content: space-between;"
    >
      <div
        class="avatar-container"
        style="background: #CCC;border-radius: 50%;width: 30px;height: 30px;text-align: center;"
      >
        <SvgIcon
          name="user"
          :size="24"
          color="#8a8a8a"
          style="cursor: pointer;verticle-align: middle;"
          :hover-change-color="false"
        />
      </div>
      <span style="margin-left: 8px;">{{ username }}</span>
      <el-divider direction="vertical" />
      <el-link type="primary">
        个人中心
      </el-link>
      <el-divider direction="vertical" />
      <span
        style="cursor: pointer;"
        @click="logout"
      >登出</span>
    </div>
    <el-link
      v-else
      @click="$router.push({path: '/loginOrRegister/login'})"
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

    }
  },
  computed: {
    username () {
      return this.$store.state.user.username
    }
  },
  methods: {
    logout () {
      this.$store.commit('setUser', {})
      localStorage.setItem('userInfo', '')
      this.$router.replace({ path: '/loginOrRegister/login' })
    }
  }
})
</script>

<style>

</style>
