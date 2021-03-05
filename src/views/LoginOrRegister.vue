<template>
  <div class="login-page-container">
    <el-card
      style="width: 400px;position: absolute;top: 50%;left: 50%;transform: translateX(-50%) translateY(-50%);"
    >
      <template #header>
        <div style="text-align: center;">
          超市进销存管理系统 - {{ currentStateName }}
        </div>
      </template>
      <div
        class="form-content-container"
        style="padding: 0 20px;"
      >
        <!-- 登录表单 -->
        <el-form
          v-if="currentState === 'login'"
          label-width="80px"
          label-position="left"
        >
          <el-form-item label="账号">
            <el-input
              v-model="loginForm.account"
              placeholder="请输入手机号或邮箱"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-button
            size="medium"
            style="width: 100%;"
            @click="login"
          >
            登录
          </el-button>
          <div
            style="font-size: 10px;display: flex;align-items: center;margin-top: 20px;"
          >
            <span>还没有账号？</span>
            <el-link
              style="font-size: 10px;"
              @click="$router.replace({path: '/loginOrRegister/register'})"
            >
              去注册
            </el-link>
          </div>
        </el-form>
        <!-- 注册表单 -->
        <el-form
          v-if="currentState === 'register'"
          ref="RegisterForm"
          :model="registerForm"
          :rules="registerFormRules"
          label-width="80px"
          label-position="left"
        >
          <el-form-item
            label="账号"
            prop="account"
          >
            <el-input
              v-model="registerForm.account"
              placeholder="请输入手机号或邮箱"
            />
          </el-form-item>
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item
            label="职位"
            prop="role"
          >
            <el-select
              v-model="registerForm.role"
              style="width: 100%;"
              placeholder="请选择职位"
            >
              <el-option
                v-for="item in Object.keys(ROLE_LIST)"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password1"
          >
            <el-input
              v-model="registerForm.password1"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item
            label="重复密码"
            prop="password2"
          >
            <el-input
              v-model="registerForm.password2"
              placeholder="请再次输入密码"
              show-password
            />
          </el-form-item>
          <el-button
            size="medium"
            style="width: 100%;"
            @click="register"
          >
            注册
          </el-button>
          <div
            style="font-size: 10px;display: flex;align-items: center;margin-top: 20px;"
          >
            <span>已有账号？</span>
            <el-link
              style="font-size: 10px;"
              @click="$router.replace({path: '/loginOrRegister/login'})"
            >
              去登录
            </el-link>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { loginFormType } from '@/constants/types'
import { addUser } from '@/api/user'
import { registerFormRules, registerForm } from '@/components/loginOrRegister/registerFormModel'
import { ROLE_LIST } from '@/constants/contants'

export default defineComponent({
  name: 'LoginOrRegister',
  setup () {
    const loginForm = ref<loginFormType>({
      account: '',
      password: ''
    })
    const registerFormRef = ref(registerForm)
    return {
      loginForm,
      registerForm: registerFormRef,
      addUser,
      registerFormRules,
      ROLE_LIST
    }
  },
  computed: {
    currentState () {
      return this.$route.params.type
    },
    currentStateName () {
      return this.$route.params.type === 'login' ? '登录' : '注册'
    }
  },
  methods: {
    async login () {
      // const res = await addUser(this.loginForm)
      // console.log(res)
    },
    async register () {
      (this as any).$refs.RegisterForm.validate(async (isValid: boolean) => {
        if (isValid) {
          const res = await addUser({
            account: this.registerForm.account,
            password: this.registerForm.password1,
            username: this.registerForm.username,
            role: this.registerForm.role
          })
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
  background:  linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('../assets/imgs/loginOrRegisterBgImg.jpg') 100% 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
