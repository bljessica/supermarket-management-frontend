<template>
  <div style="padding: 10px 20px;">
    <div class="actions-container">
      <el-button
        size="small"
        @click="showAddingDrawer"
      >
        添加采购单
      </el-button>
    </div>
    <!-- 订单表 -->
    <el-table
      v-loading="loading"
      style="margin-top: 20px;"
      :data="ordersData"
      :span-method="spanMethod"
      border
    >
      <el-table-column
        v-for="column in tableColumns"
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
    <!-- 分页 -->
    <!-- <el-pagination
      v-if="ordersData?.length || loading"
      style="margin-top: 20px;"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :current-page="pagination.pageIdx"
      @current-change="getProducts($event)"
    /> -->
    <!-- 添加采购单 - 抽屉 -->
    <el-drawer
      v-model="showDrawer"
      destroy-on-close
      size="70%"
      title="添加采购单"
    >
      <el-form
        ref="AddOrderForm"
        :model="addOrderForm"
        style="padding: 20px;"
        label-position="left"
      >
        <el-row
          v-for="(item, index) in addOrderForm.items"
          :key="item.index"
        >
          <el-col :span="6">
            <el-form-item
              label="商品名"
              :prop="'items.' + index + '.productName'"
              :rules="productNameRule"
            >
              <el-select
                v-model="item.productName"
                size="small"
                filterable
                placeholder="请选择商品"
                @change="getProduct(item)"
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
          <el-col :span="6">
            <el-form-item
              label="商品数量"
              :prop="'items.' + index + '.purchaseQuantity'"
              :rules="purchaseQuantityRule"
            >
              <el-input-number
                v-model="item.purchaseQuantity"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="库存量"
              size="small"
              :prop="'items.' + index + '.inventory'"
            >
              <el-tag size="medium">
                {{ item.inventory || 0 }}
              </el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item
              label="库存上限"
              size="small"
              :prop="'items.' + index + '.inventoryCeiling'"
            >
              <el-tag size="medium">
                {{ item.inventoryCeiling || 0 }}
              </el-tag>
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
          <el-input v-model="addOrderForm.remark" />
        </el-form-item>
        <div
          class="drawer-footer"
          style="display: flex;justify-content: space-evenly;align-items: center;width: 50%;margin: 20px auto;"
        >
          <el-button @click="showDrawer = false">
            取消
          </el-button>
          <el-button
            type="primary"
            @click="handleAddOrder"
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
import tableColumns from './tableColumns'
import { PURCHASE_ORDER_STATUS } from '@/constants/contants'
import purchaseAndSalesMixin from '@/mixins/purchaseAndSalesMixin'

export default defineComponent({
  name: 'PurchaseManagement',
  mixins: [purchaseAndSalesMixin],
  setup () {
    const orders = ref([])
    const ordersData = ref([])
    const showDrawer = ref<boolean>(false)
    const addOrderForm = ref({
      remark: '',
      items: [{
        productName: '',
        purchaseQuantity: 100,
        inventory: 0,
        inventoryCeiling: 0,
        key: Date.now()
      }]
    })
    const allProductsOptions = ref([])
    const productNameRule = {
      validator: (rule: any, value: any, cb: any) => {
        if (!value) {
          cb(new Error('商品名不能为空'))
        } else {
          const sameNameItems = addOrderForm.value.items.filter(item => {
            return item.productName === value
          })
          if (sameNameItems.length > 1) {
            cb(new Error('商品名不能重复'))
          } else {
            cb()
          }
        }
      },
      trigger: 'change'
    }
    const purchaseQuantityRule = {
      validator: (rule: any, value: any, cb: any) => {
        const idx = rule.field.split('.')[1]
        const item = addOrderForm.value.items[idx]
        if (value < 1) {
          cb(new Error('数量不能小于1'))
        } else if (value > item.inventoryCeiling - item.inventory) {
          cb(new Error('数量不能超过库存上限'))
        } else {
          cb()
        }
      },
      trigger: 'change'
    }
    const loading = ref<boolean>(false)
    // const pagination = {
    //   total: 0,
    //   pageIdx: 1,
    //   pageSize: 10
    // }
    return {
      tableColumns,
      orders,
      ordersData,
      showDrawer,
      addOrderForm,
      allProductsOptions,
      productNameRule,
      purchaseQuantityRule,
      loading,
      PURCHASE_ORDER_STATUS
      // pagination
    }
  },
  methods: {
    async handlePurchaseStatusChange (row: any, e: any) {
      await this.$api.changePurchaseOrderStatus({
        ...row,
        purchaseStatus: e,
        endTime: (e === '已完成') ? (Date.now()) : '',
        operatorAccount: this.$store.state.user.account
      })
      await this.getOrders()
    }
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-drawer.rtl) {
  overflow: scroll !important;
}
:deep(.el-col) {
  display: flex;
  align-items:center;
}
</style>
