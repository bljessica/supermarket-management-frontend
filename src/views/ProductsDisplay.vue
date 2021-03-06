<template>
  <div
    class="products-display-container"
    style="padding: 20px;"
  >
    <div
      class="products-display-header"
      style="display: flex; align-items: center;"
    >
      <SvgIcon
        name="cards"
        :size="24"
        :color="currentTab === 'cards' ? '#B3C0D1' : '#8a8a8a'"
        style="cursor: pointer;"
        @click="changeTab('cards')"
      />
      <SvgIcon
        name="table"
        :size="22"
        :color="currentTab === 'table' ? '#B3C0D1' : '#8a8a8a'"
        style="cursor: pointer;margin-left: 20px;"
        @click="changeTab('table')"
      />
    </div>
    <div
      class="products-display-content"
      style="margin-top: 20px;"
    >
      <CardsDisplay v-if="currentTab === 'cards'" />
      <TableDisplay v-if="currentTab === 'table'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CardsDisplay from '@/components/productsDisplay/CardsDisplay.vue'
import TableDisplay from '@/components/productsDisplay/TableDisplay.vue'

export default defineComponent({
  name: 'ProductDisplay',
  components: {
    CardsDisplay,
    TableDisplay
  },
  setup () {
    const currentTab = ref('cards')
    return {
      currentTab
    }
  },
  watch: {
    currentTab (tab: string) {
      this.$router.replace({ path: '/productDisplay/' + tab })
    }
  },
  methods: {
    changeTab (tab: string) {
      this.currentTab = tab
    }
  }
})
</script>

<style>

</style>
