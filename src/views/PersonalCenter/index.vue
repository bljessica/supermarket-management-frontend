<template>
  <div
    v-loading="loading"
    class="personal-center-container"
    style="display: flex;justify-content: space-between;"
  >
    <el-card
      shadow="hover"
      style="width: 60%;"
    >
      <!-- 聊天界面 -->
      <div v-if="chatPartner">
        <div
          class="chatting-title"
          style="display: flex;align-items: center;"
        >
          <SvgIcon
            name="left-arrow"
            size="20"
            color="black"
            :hover-change-color="false"
            style="cursor: pointer;"
            @click="chatPartner = null"
          />
          <span style="margin-left: 8px;font-size: 18px;">{{ chatPartner.username }}</span>
        </div>
        <!-- 聊天内容 -->
        <div
          class="chatting-content-wrapper"
          style="font-size: 14px;padding: 20px;margin-top: 20px;height: 60vh;overflow: auto;"
          :style="{backgroundColor: chatPartner && '#f5f5f5'}"
        >
          <div
            v-if="!chatContents.length"
            style="text-align: center;font-size: 12px;color: #999;"
          >
            暂无聊天记录
          </div>
          <div
            v-for="content in chatContents"
            :key="content._id"
            class="chatting-content-wrapper__content"
            style="overflow: hidden;margin: 10px 0;"
          >
            <UserAvatar
              :avatar="content.senderAvatar"
              :style="{float: isSelf(content.senderAccount) ? 'right' : 'left',
                       marginRight: !isSelf(content.senderAccount) && '6px', marginLeft: isSelf(content.senderAccount) && '6px'}"
            />
            <div
              style="padding: 6px;max-width: 50%;border-radius: 4px;letter-spacing: 1px;min-height: 18px;"
              :style="{float: isSelf(content.senderAccount) ? 'right' : 'left',
                       backgroundColor: isSelf(content.senderAccount) ? '#98e165' : '#fff'}"
            >
              {{ content.content }}
            </div>
          </div>
        </div>
        <!-- 聊天输入框 -->
        <div class="chatting-input-wrapper">
          <el-input
            v-model="chattingContent"
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            @keyup.enter="sendMsg"
          />
          <el-button
            size="mini"
            style="margin: 10px 0;float: right"
            @click="sendMsg"
          >
            发送
          </el-button>
        </div>
      </div>
      <!-- 用户信息 -->
      <div
        v-else
        class="user-info-wrapper"
        style="display: flex;align-items: center;flex-direction: column;min-width: 400px;"
      >
        <div
          class="user-info__avatar-wrapper user-info__item-wrapper"
          style="height: 170px;"
        >
          <UserAvatar
            :size="80"
            :avatar="$store.state.user.avatar"
          />
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
    <!-- 聊天用户选择 -->
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
          style="line-height: 30px;height: 30px;cursor: pointer;display: flex;justify-content: space-between;align-items: center;"
          @click="selectChatPartner(user)"
        >
          <div>
            <UserAvatar
              :size="10"
              :avatar="user.avatar"
              style="margin-right: 5px;"
            />
            {{ user.username }}
          </div>
          <span
            v-if="isSelf(user.account)"
            style="color: #999;font-size: 12px;margin-right: 6px;"
          >
            本人
          </span>
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
    const chatPartner = ref(null)
    const chatContents = ref([])
    const chattingContent = ref('')
    return {
      activeGroups,
      userGroups,
      userInfo,
      username,
      editingUsername,
      loading,
      chatPartner,
      chatContents,
      chattingContent
    }
  },
  async created () {
    await this.getUserInfo()
    await this.getUserGroups()
    this.$socket.on('newMsg', async () => {
      await this.getChatHistory()
    })
  },
  methods: {
    async selectChatPartner (user) {
      if (!this.isSelf(user.account)) {
        this.chatPartner = user
        await this.getChatHistory()
      }
    },
    async getChatHistory () {
      const res = await this.$api.getChatHistory({
        senderAccount: this.$store.state.user.account,
        recipientAccount: this.chatPartner.account
      })
      this.chatContents = res.data
    },
    async sendMsg () {
      await this.$api.sendMsg({
        senderAccount: this.$store.state.user.account,
        senderAvatar: this.$store.state.user.avatar,
        recipientAccount: this.chatPartner.account,
        recipientAvatar: this.chatPartner.avatar,
        content: this.chattingContent,
        time: Date.now()
      })
      this.$socket.emit('sendMsg', this.chatPartner.account)
      await this.getChatHistory()
      this.chattingContent = ''
    },
    isSelf (userAccount) {
      return userAccount === this.$store.state.user.account
    },
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
      this.loading = true
      await this.getUserGroups()
      this.loading = false
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
