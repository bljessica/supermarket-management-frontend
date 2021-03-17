<template>
  <div>
    <el-menu
      default-active="/salesReport/week"
      mode="horizontal"
      :router="true"
      @select="handleSelect"
    >
      <el-menu-item index="/salesReport/week">
        周
      </el-menu-item>
      <el-menu-item index="/salesReport/month">
        月
      </el-menu-item>
      <el-menu-item index="/salesReport/year">
        年
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>

<style lang="scss" scoped>
:deep(.el-menu) {
  display: flex;
  justify-content: space-evenly;
}
</style>
