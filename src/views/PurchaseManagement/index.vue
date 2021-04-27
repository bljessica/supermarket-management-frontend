<template>
  <div style="padding: 10px 20px;">
    <div class="actions-container">
      <el-button
        size="small"
        :disabled="!hasAuth(['PURCHASE_SELF'])"
        @click="showAddingDrawer"
      >
        添加采购订单
      </el-button>
    </div>
    <!-- 订单表 -->
    <el-table
      v-loading="loading"
      style="margin-top: 20px;"
      :data="ordersData"
      border
    >
      <el-table-column
        label="订单ID"
        width="150"
        fixed="left"
      >
        <template #default="scope">
          <span
            class="order-table-item__orderId"
            @click="$router.push({path: '/purchaseManagement/orderDetail/' + scope.row.orderId})"
          >
            {{ scope.row.orderId }}
          </span>
        </template>
      </el-table-column>
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
        width="100"
      >
        <template #default="scope">
          <el-tag :type="PURCHASE_ORDER_STATUS[scope.row.purchaseStatus].tagType">
            {{ scope.row.purchaseStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100"
        fixed="right"
      >
        <template #default="scope">
          <el-popconfirm
            title="确定删除此采购订单吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deletePurchaseOrder(scope.row)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
                :disabled="!(hasAuth(['PURCHASE_ALL']) || isOperator(scope.row.purchaserAccount))"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-if="ordersData?.length || loading"
      style="margin-top: 20px;"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :current-page="pagination.pageIdx"
      @current-change="pageChange($event)"
    />
    <!-- 添加采购订单 - 抽屉 -->
    <el-drawer
      v-model="showDrawer"
      destroy-on-close
      size="70%"
      title="添加采购订单"
    >
      <el-form
        ref="AddOrderForm"
        :model="addOrderForm"
        style="padding: 20px;"
        label-position="left"
      >
        <el-form-item
          label="订单名"
          prop="name"
          :rules="{ required: true, message: '订单名不能为空', trigger: 'blur' }"
        >
          <el-input
            v-model="addOrderForm.name"
            size="small"
          />
        </el-form-item>
        <el-row
          v-for="(item, index) in addOrderForm.items"
          :key="item.index"
        >
          <el-col :span="7">
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
                  size="small"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item
              label="商品数量"
              style="margin-left: 10px;"
              :prop="'items.' + index + '.purchaseQuantity'"
              :rules="purchaseQuantityRule"
            >
              <el-input-number
                v-model="item.purchaseQuantity"
                size="small"
              />
            </el-form-item>
          </el-col>
          <el-col :span="3">
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
          <el-col :span="3">
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
          label="存货地点"
          prop="inventoryLocation"
        >
          <el-select
            v-model="addOrderForm.inventoryLocation"
            size="small"
            filterable
            placeholder="请选择存货地点"
          >
            <el-option
              v-for="location in INVENTORY_LOCATION_OPTIONS"
              :key="location.value"
              :label="location.label"
              :value="location.value"
              size="small"
            />
          </el-select>
        </el-form-item>
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
import { PURCHASE_ORDER_STATUS, INVENTORY_LOCATION_OPTIONS } from '@/constants/constants'
import purchaseAndSalesMixin from '@/mixins/purchaseAndSalesMixin'
import authMixin from '@/mixins/authMixin'

export default defineComponent({
  name: 'PurchaseManagement',
  mixins: [purchaseAndSalesMixin, authMixin],
  setup () {
    const ordersData = ref([])
    const showDrawer = ref<boolean>(false)
    const addOrderForm = ref({
      name: '',
      remark: '',
      inventoryLocation: '默认仓库',
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
    const pagination = ref({
      total: 0,
      pageIdx: 1,
      pageSize: 8
    })
    return {
      tableColumns,
      ordersData,
      showDrawer,
      addOrderForm,
      allProductsOptions,
      productNameRule,
      purchaseQuantityRule,
      loading,
      PURCHASE_ORDER_STATUS,
      INVENTORY_LOCATION_OPTIONS,
      pagination
    }
  },
  watch: {
    pagination: {
      async handler () {
        await this.getOrders()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    pageChange (pageIdx) {
      this.pagination.pageIdx = pageIdx
    },
    async getOrders () {
      this.loading = true
      let res = null
      res = await this.$api.getAllPurchaseOrders({ ...this.pagination })
      this.ordersData = res.data.reduce((res: Array<any>, cur: any) => {
        res.push(cur.orders[0])
        return res
      }, [])
      this.pagination.total = res.total
      this.loading = false
    },
    async deletePurchaseOrder (row) {
      this.loading = true
      await this.$api.deletePurchaseOrder({
        orderId: row.orderId
      })
      await this.getOrders()
      this.loading = false
    },
    async handlePurchaseStatusChange (row: any, e: any) {
      this.loading = true
      await this.$api.changePurchaseOrderStatus({
        ...row,
        purchaseStatus: e,
        endTime: (e === '已完成') ? (Date.now()) : '',
        operatorAccount: this.$store.state.user.account
      })
      await this.getOrders()
      this.loading = false
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
.order-table-item__orderId {
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
