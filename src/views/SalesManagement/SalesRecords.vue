<template>
  <div style="padding: 10px 20px;">
    <div class="actions-container">
      <el-button
        size="small"
        :disabled="!hasAuth(['SELL_SELF'])"
        @click="showAddingDrawer"
      >
        添加销售记录
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
        label="操作"
        width="100"
        fixed="right"
      >
        <template #default="scope">
          <el-popconfirm
            title="确定删除此销售记录吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteSalesOrder(scope.row)"
          >
            <template #reference>
              <el-button
                size="small"
                type="danger"
                :disabled="!(hasAuth(['SELL_ALL']) || isOperator(scope.row.sellerAccount))"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
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
    <!-- 添加销售记录 - 抽屉 -->
    <el-drawer
      v-model="showDrawer"
      destroy-on-close
      size="70%"
      title="添加销售记录"
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
          <el-col :span="8">
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
          <el-col :span="8">
            <el-form-item
              label="商品数量"
              :prop="'items.' + index + '.salesVolume'"
              :rules="salesVolumeRule"
            >
              <el-input-number
                v-model="item.salesVolume"
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
import purchaseAndSalesMixin from '@/mixins/purchaseAndSalesMixin'
import authMixin from '@/mixins/authMixin'

export default defineComponent({
  name: 'SalesRecords',
  mixins: [purchaseAndSalesMixin, authMixin],
  setup () {
    const orders = ref([])
    const ordersData = ref([])
    const showDrawer = ref<boolean>(false)
    const addOrderForm = ref({
      remark: '',
      items: [{
        productName: '',
        salesVolume: 100,
        inventory: 0,
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
    const salesVolumeRule = {
      validator: (rule: any, value: any, cb: any) => {
        const idx = rule.field.split('.')[1]
        const item = addOrderForm.value.items[idx]
        if (value < 1) {
          cb(new Error('数量不能小于1'))
        } else if (value > item.inventory) {
          cb(new Error('数量不能超过库存量'))
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
      salesVolumeRule,
      loading
      // pagination
    }
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
      const res = await this.$api.getAllSalesOrders()
      this.orders = res.data
      this.ordersData = res.data.reduce((res: Array<any>, cur: any) => {
        return res.concat(cur.orders)
      }, [])
      this.loading = false
    },
    async deleteSalesOrder (row: any) {
      this.loading = true
      await this.$api.deleteSalesOrder({
        orderId: row.orderId
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
</style>
