<template>
  <div
    class="header"
    style="height: 100%; display: flex; align-items: center; justify-content: space-between;padding: 0 20px;background-color:#B3C0D1;"
  >
    <h1 class="header__title">
      超市进销存管理系统
    </h1>
    <div
      v-if="username"
      class="header__user"
      style="display: flex; align-items: center; justify-content: space-between;"
    >
      <UserAvatar :avatar="$store.state.user.avatar" />
      <span style="margin-left: 8px;">{{ username }}</span>
      <el-divider direction="vertical" />
      <span
        class="header__link"
        @click="$router.push({name: routeName === 'personalCenter' ? 'index' : 'personalCenter'})"
      >
        {{ routeName === 'personalCenter' ? '主页' : '个人中心' }}
      </span>
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
import UserAvatar from '../UserAvatar.vue'

export default defineComponent({
  name: 'Header',
  components: {
    UserAvatar
  },
  computed: {
    username () {
      return this.$store.state.user.username
    },
    routeName () {
      return this.$route.name
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

<style lang="scss" scoped>
.header__link {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
