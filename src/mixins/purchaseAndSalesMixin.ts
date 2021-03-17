import { defineComponent } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  async created () {
    const res = await this.$api.getAllProductNames()
    this.allProductsOptions = res.data.map((item: any) => ({
      label: item.productName,
      value: item.productName
    }))
    await this.getOrders()
  },
  methods: {
    spanMethod ({ rowIndex, columnIndex }) {
      if ((columnIndex !== 1) && (columnIndex !== 2)) {
        let idx = 0
        for (const item of this.orders) {
          if (rowIndex === idx) {
            return {
              rowspan: item.count,
              colspan: 1
            }
          } else if (idx > rowIndex) {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
          idx += item.count
        }
        return {
          rowspan: 0,
          colspan: 0
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1
        }
      }
    },
    async getOrders () {
      this.loading = true
      let res = null
      if (this.$options.name === 'PurchaseManagement') {
        res = await this.$api.getAllPurchaseOrders()
      } else if (this.$options.name === 'SalesRecords') {
        res = await this.$api.getAllSalesOrders()
      }
      this.orders = res.data
      this.ordersData = res.data.reduce((res: Array<any>, cur: any) => {
        return res.concat(cur.orders)
      }, [])
      this.loading = false
    },
    handleAddOrder () {
      this.$refs.AddOrderForm.validate(async (valid: boolean) => {
        if (valid) {
          let res = null
          if (this.$options.name === 'PurchaseManagement') {
            res = await this.$api.addPurchaseOrder({
              orderId: Date.now(),
              remark: this.addOrderForm.remark,
              items: this.addOrderForm.items,
              purchaserAccount: this.$store.state.user.account,
              createTime: dayjs().format('YYYY/MM/DD HH:mm:ss')
            })
          } else if (this.$options.name === 'SalesRecords') {
            res = await this.$api.addSalesOrder({
              orderId: Date.now(),
              remark: this.addOrderForm.remark,
              items: this.addOrderForm.items,
              sellerAccount: this.$store.state.user.account,
              createTime: dayjs().format('YYYY/MM/DD HH:mm:ss')
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
          key: Date.now()
        })
      } else if (this.$options.name === 'SalesRecords') {
        this.addOrderForm.items.push({
          productName: '',
          salesVolume: 100,
          key: Date.now()
        })
      }
    }
  }
})
