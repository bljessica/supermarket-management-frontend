import { defineComponent } from 'vue'

export default defineComponent({
  async created () {
    await this.getOrders()
  },
  methods: {
    async showAddingDrawer () {
      this.showDrawer = true
      await this.getAllProductNames()
    },
    async getAllProductNames () {
      let filters = {}
      if (this.$options.name === 'SalesRecords') {
        filters = {
          inventory: true
        }
      }
      const res = await this.$api.getAllProductNames(filters)
      this.allProductsOptions = res.data.map((item: any) => ({
        label: item.productName,
        value: item.productName
      }))
    },
    handleAddOrder () {
      this.$refs.AddOrderForm.validate(async (valid: boolean) => {
        if (valid) {
          let res = null
          const time = Date.now()
          if (this.$options.name === 'PurchaseManagement') {
            res = await this.$api.addPurchaseOrder({
              orderId: time,
              name: this.addOrderForm.name,
              inventoryLocation: this.addOrderForm.inventoryLocation,
              remark: this.addOrderForm.remark,
              items: this.addOrderForm.items,
              purchaserAccount: this.$store.state.user.account,
              createTime: time
            })
          } else if (this.$options.name === 'SalesRecords') {
            res = await this.$api.addSalesOrder({
              orderId: time,
              remark: this.addOrderForm.remark,
              items: this.addOrderForm.items,
              sellerAccount: this.$store.state.user.account,
              createTime: time
            })
          }
          if (res.code === 0) {
            this.$refs.AddOrderForm.resetFields()
            this.showDrawer = false
            await this.getOrders()
          }
        } else {
          return false
        }
      })
    },
    deleteRowItem (rowItem: any) {
      const items = this.addOrderForm.items
      const idx: number = items.findIndex(item => item.key === rowItem.key)
      items.splice(idx, 1)
    },
    addRowItem () {
      if (this.$options.name === 'PurchaseManagement') {
        this.addOrderForm.items.push({
          productName: '',
          purchaseQuantity: 100,
          inventory: 0,
          inventoryCeiling: 0,
          key: Date.now()
        })
      } else if (this.$options.name === 'SalesRecords') {
        this.addOrderForm.items.push({
          productName: '',
          inventory: 0,
          salesVolume: 100,
          key: Date.now()
        })
      }
    },
    async getProduct (item) {
      const res = await this.$api.getProduct({ productName: escape(item.productName) })
      item.inventory = res.data.inventory
      item.inventoryCeiling = res.data.inventoryCeiling
    }
  }
})
