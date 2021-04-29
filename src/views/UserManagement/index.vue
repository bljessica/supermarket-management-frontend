<template>
  <div>
    <el-menu
      ref="tabMenu"
      default-active="edit"
      mode="horizontal"
      style="margin-bottom: 30px;"
      @select="typeShow = $event"
    >
      <el-menu-item index="edit">
        管理用户信息
      </el-menu-item>
      <el-menu-item index="record">
        职位变动日志
      </el-menu-item>
      <el-menu-item index="add">
        添加用户
      </el-menu-item>
    </el-menu>
    <!-- 管理用户信息 -->
    <PersonalCenter
      v-if="typeShow === 'edit'"
      :editing-users="true"
    />
    <!-- 职位变动日志 -->
    <el-table
      v-if="typeShow === 'record'"
      :data="userRoleChangeData"
      border
    >
      <el-table-column
        v-for="column in tableColumns"
        :key="column.key"
        :width="column.width"
        :label="column.label"
        :prop="column.key"
        show-overflow-tooltip
      />
    </el-table>
    <!-- 添加用户 -->
    <el-card
      v-if="typeShow === 'add'"
      style="width: 600px;margin: 10px auto;"
    >
      <template #header>
        <div style="text-align: center;">
          添加用户
        </div>
      </template>
      <!-- 注册表单 -->
      <el-form
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
          确定
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { registerFormRules, registerForm } from '@/views/UserManagement/registerFormModel'
import CryptoJS from 'crypto-js'
import { ROLE_LIST } from '@/constants/constants'
import PersonalCenter from '@/views/PersonalCenter/index.vue'
import tableColumns from './tableColumns'

export default defineComponent({
  name: 'UserManagement',
  components: {
    PersonalCenter
  },
  setup () {
    const registerFormRef = ref(registerForm)
    const typeShow = ref('edit')
    const userRoleChangeData = ref([])
    return {
      registerForm: registerFormRef,
      registerFormRules,
      ROLE_LIST,
      typeShow,
      tableColumns,
      userRoleChangeData
    }
  },
  watch: {
    async typeShow (val: string) {
      if (val === 'record') {
        await this.getUserRoleChangeData()
      }
    }
  },
  // async created () {
  //   await this.getUserRoleChangeData()
  // },
  methods: {
    async getUserRoleChangeData () {
      const res = await this.$api.getUserRoleChangeRecords()
      this.userRoleChangeData = res.data
    },
    async register () {
      this.$refs.RegisterForm.validate(async (isValid: boolean) => {
        if (isValid) {
          const res = await this.$api.register({
            account: this.registerForm.account,
            password: CryptoJS.MD5(this.registerForm.password2).toString(),
            username: this.registerForm.username,
            role: this.registerForm.role,
            entryTime: Date.now()
          })
          if (res.code === 0) {
            this.$refs.RegisterForm.resetFields()
          }
        } else {
          return false
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  display: flex;
  justify-content: space-evenly;
}
</style>
