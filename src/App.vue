<template>
  <router-view v-if="$route.meta.noLayout" />
  <Layout
    v-else
    style="min-width: 590px;"
    :show-aside="$route.meta.showAside"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Layout from '@/components/common/layout/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    Layout
  }
})
</script>

<style lang="scss">
body {
  margin: 0;
}
a {
  text-decoration: none;
  color: #606266;
}
</style>
