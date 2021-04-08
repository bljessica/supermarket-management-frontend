<template>
  <div class="table-display-container">
    <el-table
      v-loading="loading"
      :data="products"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
      />
      <el-table-column
        label="商品名"
        :fixed="true"
      >
        <template #default="scope">
          <router-link :to="{path: '/productDetail/' + scope.row._id}">
            {{ scope.row.productName }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column
        v-for="column in columns"
        :key="column.key"
        :prop="column.key"
        :label="column.label"
        :width="column.width"
        :fixed="column.fixed"
        show-overflow-tooltip
      />
      <el-table-column
        label="状态"
        width="60"
      >
        <template #default="scope">
          <el-tag
            size="mini"
            :type="scope.row.status === '售罄' ? 'danger' : 'success'"
          >
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="150"
      >
        <template #default="scope">
          <AuthButton
            size="small"
            text="编辑"
            action-auth="EDIT_PRODUCT"
            @click="$emit('editProduct', scope.row)"
          />
          <el-popconfirm
            title="确定删除此商品吗？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="deleteProduct(scope.row)"
          >
            <template #reference>
              <AuthButton
                size="small"
                text="删除"
                action-auth="EDIT_PRODUCT"
              />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="products.length || loading"
      style="margin-top: 20px;"
      background
      layout="prev, pager, next"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      :current-page="pagination.pageIdx"
      @current-change="getProducts($event)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import columns from './tableColumns'
import AuthButton from '@/components/common/auth/AuthButton.vue'
import productsDisplayMixin from '@/mixins/productsDisplayMixin'

export default defineComponent({
  name: 'TableDisplay',
  components: {
    AuthButton
  },
  mixins: [productsDisplayMixin],
  setup () {
    const products = ref([])
    const selectedRows = ref([])
    const loading = ref<boolean>(false)
    const pagination = {
      total: 0,
      pageIdx: 1,
      pageSize: 10
    }
    return {
      columns,
      products,
      selectedRows,
      loading,
      pagination
    }
  },
  methods: {
    async deleteProduct (row: any) {
      await this.$api.deleteProduct({
        _id: row._id,
        productName: row.productName
      })
      await this.getProducts()
    },
    handleSelectionChange (selectedRows: any) {
      this.selectedRows = selectedRows
    },
    async deleteSelectedProducts () {
      const checkedList = this.selectedRows.map(item => ({
        _id: item._id,
        productName: item.productName
      }))
      this.$api.deleteProducts({
        checkedList
      })
      await this.getProducts()
    }
  }
})
</script>

<style>
</style>
