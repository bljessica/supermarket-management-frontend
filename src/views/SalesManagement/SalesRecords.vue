<template>
  <div style="padding: 10px 20px;">
    <div class="actions-container">
      <el-button
        size="small"
        @click="showDrawer = true"
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
    <!-- 添加销售订单 - 抽屉 -->
    <el-drawer
      v-model="showDrawer"
      destroy-on-close
      size="70%"
      title="添加销售订单"
    >
      <el-form
        ref="AddOrderForm"
        :model="addOrderForm"
        style="padding: 20px;"
      >
        <el-row
          v-for="(item, index) in addOrderForm.items"
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
              :prop="'items.' + index + '.salesVolume'"
              :rules="salesVolumeRule"
            >
              <el-input-number v-model="item.salesVolume" />
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

export default defineComponent({
  name: 'SalesRecords',
  mixins: [purchaseAndSalesMixin],
  setup () {
    const orders = ref([])
    const ordersData = ref([])
    const showDrawer = ref<boolean>(false)
    const addOrderForm = ref({
      remark: '',
      items: [{
        productName: '',
        salesVolume: 100,
        key: Date.now()
      }]
    })
    const allProductsOptions = ref([])
    const salesVolumeRule = {
      validator: (rule: any, value: any, cb: any) => {
        if (value < 1) {
          cb(new Error('数量不能小于1'))
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
      salesVolumeRule,
      loading
      // pagination
    }
  }
})
</script>

<style>

</style>
