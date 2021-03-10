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
    <el-table
      style="margin-top: 20px;"
      :data="purchaseOrders"
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
    </el-table>
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
                placeholder="请选择商品"
              >
                <el-option
                  v-for="product in allProducts"
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
import dayjs from 'dayjs'

export default defineComponent({
  name: 'PurchaseManagement',
  setup () {
    const purchaseOrders = ref<Array<purchaseOrderType> | null>(null)
    const showAddPurchaseOrderDrawer = ref<boolean>(false)
    const addPurchaseOrderForm = ref({
      remark: '',
      items: [{
        productName: '',
        purchaseQuantity: 100,
        key: Date.now()
      }]
    })
    const allProducts = ref([])
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
    return {
      inventoryTableColumns,
      purchaseOrders,
      showAddPurchaseOrderDrawer,
      addPurchaseOrderForm,
      allProducts,
      purchaseQuantityRule
    }
  },
  async created () {
    const res = await (this as any).$api.getAllProducts()
    this.allProducts = res.data.map((item: any) => ({
      label: item.productName,
      value: item.productName
    }))
    await this.getPurchaseOrders()
  },
  methods: {
    async getPurchaseOrders () {
      const res = await (this as any).$api.getAllPurchaseOrders()
      this.purchaseOrders = res.data
    },
    handleAddPurchaseOrder () {
      (this as any).$refs.AddPurchaseOrderForm.validate(async (valid: boolean) => {
        if (valid) {
          const res = await (this as any).$api.addPurchaseOrder({
            orderId: Date.now(),
            remark: this.addPurchaseOrderForm.remark,
            items: this.addPurchaseOrderForm.items,
            purchaserAccount: this.$store.state.user.account,
            purchaseTime: Date.now()
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
