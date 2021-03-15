<template>
  <div>
    <el-menu
      default-active="3-1"
      background-color="#E9EEF3"
    >
      <div
        v-for="submenu in Object.values(ASIDE_ITEMS)"
        :key="submenu.index"
      >
        <el-submenu
          v-if="submenu.items"
          :index="submenu.index"
        >
          <template #title>
            {{ submenu.name }}
          </template>
          <el-menu-item
            v-for="item in submenu.items"
            :key="item.index"
            :index="item.index"
            @click="changeUrl(item.urlPath)"
          >
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-else
          :index="submenu.index"
          @click="changeUrl(submenu.urlPath)"
        >
          <template #title>
            {{ submenu.name }}
          </template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ASIDE_ITEMS } from '@/constants/contants'

export default defineComponent({
  name: 'Aside',
  setup () {
    return {
      ASIDE_ITEMS
    }
  },
  methods: {
    changeUrl (urlPath: string) {
      this.$router.replace({ path: urlPath })
    }
  }
})
</script>

<style>

</style>
