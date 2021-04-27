<template>
  <div
    class="header"
    style="display: flex; align-items: center; justify-content: space-between;height: 70px;line-height: 70px;"
  >
    <h1
      class="header__title"
      style="color: #66b1ff;"
    >
      超市进销存管理系统
    </h1>
    <div class="header__item">
      <div
        v-if="username"
        class="header__item"
        style="cursor: default;"
      >
        <UserAvatar :avatar="$store.state.user.avatar" />
        <span>{{ username }}</span>
      </div>
      <el-divider direction="vertical" />
      <div
        class="header__item"
        @click="$router.push({name: routeName === 'personalCenter' ? 'index' : 'personalCenter'})"
      >
        <SvgIcon
          :name="routeName === 'personalCenter' ? 'home' : 'table'"
          size="20"
          color="#333"
          :hover-change-color="false"
        />
        <span>{{ routeName === 'personalCenter' ? '主页' : '个人中心' }}</span>
      </div>
      <el-divider direction="vertical" />
      <div
        class="header__item"
        @click="logout"
      >
        <SvgIcon
          name="exit"
          size="18"
          color="#333"
          :hover-change-color="false"
        />
        <span>登出</span>
      </div>
    </div>
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
.header__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  &>span {
    margin-left: 6px;
  }
}
</style>
