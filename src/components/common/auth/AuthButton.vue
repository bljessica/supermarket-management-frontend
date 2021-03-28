<template>
  <el-button
    :size="size"
    :disabled="disabled"
  >
    {{ text }}
  </el-button>
</template>

<script>
import { ROLE_LIST } from '@/constants/constants'
import { defineComponent, computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'small'
    },
    actionAuth: {
      type: String,
      default: 'VIEW_ALL'
    }
  },
  setup (props) {
    const { actionAuth } = toRefs(props)
    const store = useStore()
    const disabled = computed(() => {
      if (!store.state.user.role) {
        return true
      }
      return !ROLE_LIST[store.state.user.role].auth.includes(actionAuth.value)
    })
    return {
      disabled
    }
  }
})
</script>

<style>

</style>
