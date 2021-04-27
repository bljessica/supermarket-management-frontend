<template>
  <div class="login-page-container">
    <el-card
      style="width: 400px;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);"
    >
      <template #header>
        <div style="text-align: center;">
          超市进销存管理系统 - 登录
        </div>
      </template>
      <div
        class="form-content-container"
        style="padding: 0 20px;"
      >
        <!-- 登录表单 -->
        <el-form
          ref="LoginForm"
          :rules="loginFormRules"
          :model="loginForm"
          label-width="80px"
          label-position="left"
        >
          <el-form-item
            label="账号"
            prop="accunt"
          >
            <el-input
              v-model="loginForm.account"
              placeholder="请输入手机号或邮箱"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="记住我"
            prop="rememberUser"
          >
            <el-switch v-model="loginForm.rememberUser" />
          </el-form-item>
          <el-button
            size="medium"
            style="width: 100%;"
            @click="login"
          >
            登录
          </el-button>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { loginForm, loginFormRules } from './loginFormModel'
import { saveUserToLocal } from '@/utils'
import CryptoJS from 'crypto-js'

export default defineComponent({
  name: 'Login',
  setup () {
    const loginFormRef = ref(loginForm)
    return {
      loginForm: loginFormRef,
      loginFormRules
    }
  },
  methods: {
    async login () {
      this.$refs.LoginForm.validate(async (isValid: boolean) => {
        if (isValid) {
          const res = await this.$api.login({
            account: this.loginForm.account,
            password: CryptoJS.MD5(this.loginForm.password).toString()
          })
          if (res.code === 0) {
            const user = {
              account: this.loginForm.account,
              username: res.data.username,
              avatar: res.data.avatar,
              password: this.loginForm.password,
              role: res.data.role
            }
            if (this.loginForm.rememberUser) {
              // 记住用户
              saveUserToLocal(user)
            }
            this.$store.commit('setUser', user)
            this.$refs.LoginForm.resetFields()
            // 跳转首页
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 1000)
          }
        } else {
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss">
.login-page-container {
  background:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('../../assets/imgs/loginOrRegisterBgImg.jpg') no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
