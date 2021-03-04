<template>
  <div>
    <el-menu default-active="2" background-color="#E9EEF3">
      <div v-for="submenu in Object.values(ASIDE_ITEMS)" :key="submenu.index">
        <el-submenu v-if="submenu.items" :index="submenu.index">
          <template #title>{{ submenu.name }}</template>
          <el-menu-item v-for="item in submenu.items" :index="item.index" :key="item.index"  @click="changeUrl(item.urlName)">
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="submenu.index" @click="changeUrl(submenu.urlName)">
          <template #title>{{ submenu.name }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ASIDE_ITEMS } from '@/constants/contants'

export default defineComponent({
  setup () {
    return {
      ASIDE_ITEMS
    }
  },
  methods: {
    changeUrl (urlName: string) {
      this.$router.replace({ name: urlName })
    }
  }
})
</script>

<style>

</style>
