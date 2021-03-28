<template>
  <div
    v-loading="loading"
    class="personal-center-container"
    style="display: flex;justify-content: space-between;"
  >
    <!-- 用户信息 -->
    <el-card
      shadow="hover"
      style="width: 60%;"
    >
      <div
        class="user-info-wrapper"
        style="display: flex;align-items: center;flex-direction: column;"
      >
        <div
          class="user-info__avatar-wrapper user-info__item-wrapper"
          style="height: 150px;"
        >
          <UserAvatar :size="80" />
          <el-upload
            action="#"
            :before-upload="beforeProductImageUpload"
          >
            <el-button size="small">
              上传头像
            </el-button>
          </el-upload>
        </div>
        <el-divider
          style="margin: 20px 0;"
        />
        <div
          class="user-info__other-info-wrapper user-info__item-wrapper"
          style="font-size: 14px;align-items: start;height: 180px;width: 50%;margin: 0 auto;"
        >
          <div>账号：{{ userInfo.account }}</div>
          <div>
            用户名：
            <el-input
              v-if="editingUsername"
              v-model="username"
              size="mini"
              style="width: 50%;"
              placeholder="请输入用户名"
            />
            <span v-else>{{ userInfo.username }}</span>
            <el-button
              style="margin-left: 5px;"
              type="primary"
              :icon="editingUsername ? 'el-icon-check' : 'el-icon-edit'"
              size="mini"
              circle
              @click="editOrSaveUsername"
            />
          </div>
          <div>职位：{{ userInfo.role }}</div>
          <div>入职时间：{{ userInfo.entryTime }}</div>
        </div>
      </div>
    </el-card>
    <!-- 聊天选择 -->
    <el-collapse
      v-model="activeGroups"
      style="width: 30%;border-bottom: none;"
    >
      <el-collapse-item
        v-for="userGroup in userGroups"
        :key="userGroup._id"
        :title="userGroup._id"
        :name="userGroup._id"
      >
        <div
          v-for="user in userGroup.users"
          :key="user.account"
          style="line-height: 30px;cursor: pointer;"
        >
          <i
            class="el-icon-user"
            style="margin-right: 5px;"
          />
          {{ user.username }}
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import UserAvatar from '@/components/common/UserAvatar.vue'
import { ROLE_LIST } from '@/constants/constants'

export default defineComponent({
  name: 'PersonalCenter',
  components: {
    UserAvatar
  },
  setup () {
    const activeGroups = ref(Object.keys(ROLE_LIST))
    const userGroups = ref([])
    const userInfo = ref({})
    const username = ref<string>('')
    const editingUsername = ref<boolean>(false)
    const loading = ref<boolean>(false)
    return {
      activeGroups,
      userGroups,
      userInfo,
      username,
      editingUsername,
      loading
    }
  },
  async created () {
    await this.getUserInfo()
    await this.getUserGroups()
  },
  methods: {
    async getUserGroups () {
      this.loading = true
      const res = await this.$api.getUserGroups()
      this.userGroups = res.data
      this.loading = false
    },
    async editOrSaveUsername () {
      if (this.editingUsername) { // 保存
        this.userInfo.username = this.username
        await this.updateUserInfo()
      } else { // 编辑
        this.username = this.userInfo.username
      }
      this.editingUsername = !this.editingUsername
    },
    async getUserInfo () {
      this.loading = true
      const res = await this.$api.getUserInfo({
        account: this.$store.state.user.account
      })
      this.userInfo = res.data
      this.$store.commit('setUser', res.data)
      this.loading = false
    },
    beforeProductImageUpload (file: any) {
      // 将上传的图片转为base64格式
      const reader = new FileReader()
      reader.onload = async (e) => {
        this.userInfo.avatar = e.target.result
        await this.updateUserInfo()
        await this.getUserInfo()
      }
      reader.readAsDataURL(file)
      return false // 屏蔽默认上传
    },
    async updateUserInfo () {
      await this.$api.updateUserInfo(this.userInfo)
    }
  }
})
</script>

<style lang="scss" scoped>
.user-info__item-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
