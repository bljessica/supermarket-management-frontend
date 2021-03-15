<template>
  <div style="padding: 10px 20px;">
    <div class="actions-container">
      <el-button
        size="small"
        @click="showAddPurchaseOrderDrawer = true"
      >
        添加采购单
      </el-button>
    </div>
    <!-- 订单表 -->
    <el-table
      v-loading="tableLoading"
      style="margin-top: 20px;"
      :data="purchaseOrdersData"
      :span-method="spanMethod"
      border
    >
      <el-table-column
        v-for="column in inventoryTableColumns"
        :key="column.key"
        :width="column.width"
        :fixed="column.fixed"
        :label="column.label"
        :prop="column.key"
        show-overflow-tooltip
      />
      <el-table-column
        label="采购状态"
        width="130"
      >
        <template #default="scope">
          <el-select
            v-model="scope.row.purchaseStatus"
            :disabled="scope.row.purchaseStatus === '已完成'"
            @change="handlePurchaseStatusChange(scope.row, $event)"
          >
            <el-option
              v-for="item in Object.values(PURCHASE_ORDER_STATUS)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加采购单 - 抽屉 -->
    <el-drawer
      v-model="showAddPurchaseOrderDrawer"
      destroy-on-close
      size="70%"
      title="添加采购单"
    >
      <el-form
        ref="AddPurchaseOrderForm"
        :model="addPurchaseOrderForm"
        style="padding: 20px;"
      >
        <el-row
          v-for="(item, index) in addPurchaseOrderForm.items"
          :key="item.index"
        >
          <el-col :span="10">
            <el-form-item
              label="商品名"
              :prop="'items.' + index + '.productName'"
              :rules="{required: true, message: '商品名不能为空', trigger: 'blur'}"
            >
              <el-select
                v-model="item.productName"
                filterable
                placeholder="请选择商品"
              >
                <el-option
                  v-for="product in allProductsOptions"
                  :key="product.value"
                  :label="product.label"
                  :value="product.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item
              label="商品数量"
              :prop="'items.' + index + '.purchaseQuantity'"
              :rules="purchaseQuantityRule"
            >
              <el-input-number v-model="item.purchaseQuantity" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              icon="el-icon-plus"
              circle
              @click="addRowItem"
            />
            <el-button
              :disabled="index === 0"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteRowItem(item)"
            />
          </el-col>
        </el-row>
        <el-form-item
          label="备注"
          prop="remark"
        >
          <el-input v-model="addPurchaseOrderForm.remark" />
        </el-form-item>
        <div
          class="drawer-footer"
          style="display: flex;justify-content: space-evenly;align-items: center;width: 50%;margin: 20px auto;"
        >
          <el-button @click="showAddPurchaseOrderDrawer = false">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="handleAddPurchaseOrder"
          >
            确定
          </el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import inventoryTableColumns from './inventoryTableColumns'
import { purchaseOrderType } from '@/constants/types'
import { PURCHASE_ORDER_STATUS } from '@/constants/contants'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'PurchaseManagement',
  setup () {
    const purchaseOrders = ref([])
    const purchaseOrdersData = ref<Array<purchaseOrderType> | null>(null)
    const showAddPurchaseOrderDrawer = ref<boolean>(false)
    const addPurchaseOrderForm = ref({
      remark: '',
      items: [{
        productName: '',
        purchaseQuantity: 100,
        key: Date.now()
      }]
    })
    const allProductsOptions = ref([])
    const purchaseQuantityRule = {
      validator: (rule: any, value: any, cb: any) => {
        if (value < 1) {
          cb(new Error('数量不能小于1'))
        } else {
          cb()
        }
      },
      trigger: 'change'
    }
    const tableLoading = ref<boolean>(false)
    return {
      inventoryTableColumns,
      purchaseOrders,
      purchaseOrdersData,
      showAddPurchaseOrderDrawer,
      addPurchaseOrderForm,
      allProductsOptions,
      purchaseQuantityRule,
      tableLoading,
      PURCHASE_ORDER_STATUS
    }
  },
  async created () {
    const res = await (this as any).$api.getAllProductNames()
    this.allProductsOptions = res.data.map((item: any) => ({
      label: item.productName,
      value: item.productName
    }))
    await this.getPurchaseOrders()
  },
  methods: {
    async handlePurchaseStatusChange (row: any, e: any) {
      console.log(e, e === '已完成')
      await (this as any).$api.changePurchaseOrderStatus({
        ...row,
        purchaseStatus: e,
        endTime: (e === '已完成') ? dayjs().format('YYYY/MM/DD HH:mm:ss') : '',
        operatorAccount: this.$store.state.user.account
      })
    },
    // @ts-ignore
    spanMethod ({ row, column, rowIndex, columnIndex }) {
      if ((columnIndex !== 1) && (columnIndex !== 2)) {
        let idx = 0
        for (const item of this.purchaseOrders) {
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
    async getPurchaseOrders () {
      this.tableLoading = true
      const res = await (this as any).$api.getAllPurchaseOrders()
      this.purchaseOrders = res.data
      this.purchaseOrdersData = res.data.reduce((res: Array<any>, cur: any) => {
        return res.concat(cur.orders)
      }, [])
      this.tableLoading = false
    },
    handleAddPurchaseOrder () {
      (this as any).$refs.AddPurchaseOrderForm.validate(async (valid: boolean) => {
        if (valid) {
          const res = await (this as any).$api.addPurchaseOrder({
            orderId: Date.now(),
            remark: this.addPurchaseOrderForm.remark,
            items: this.addPurchaseOrderForm.items,
            purchaserAccount: this.$store.state.user.account,
            createTime: dayjs().format('YYYY/MM/DD HH:mm:ss')
          })
          if (res.code === 0) {
            (this as any).$refs.AddPurchaseOrderForm.resetFields()
            this.showAddPurchaseOrderDrawer = false
            await this.getPurchaseOrders()
          }
        } else {
          return false
        }
      })
    },
    deleteRowItem (rowItem: any) {
      const items = this.addPurchaseOrderForm.items
      const idx: number = items.findIndex(item => item.key === rowItem.key)
      items.splice(idx, 1)
    },
    addRowItem () {
      this.addPurchaseOrderForm.items.push({
        productName: '',
        purchaseQuantity: 100,
        key: Date.now()
      })
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-drawer.rtl) {
  overflow: scroll !important;
}
</style>
