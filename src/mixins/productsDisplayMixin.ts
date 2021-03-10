import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    allFilters: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    allFilters: {
      async handler () {
        await this.getProducts()
      },
      immediate: true
    }
  },
  async created () {
    await this.getProducts()
  },
  methods: {
    async getProducts (pageIdx = 1) {
      const filters = Object.keys(this.allFilters).reduce((res: any, key: string) => {
        if (key !== 'refresh' && this.allFilters[key]) {
          res[key] = this.allFilters[key]
        }
        return res
      }, {});
      (this as any).pagination.pageIdx = pageIdx;
      (this as any).loading = true
      const res = await (this as any).$api.getAllProducts({
        ...filters,
        ...(this as any).pagination
      });
      (this as any).loading = false;
      (this as any).products = res.data;
      (this as any).pagination.total = res.total
    }
  }
})
