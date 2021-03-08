<template>
  <div class="table-display-container">
    <el-table
      :data="products"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="50"
      />
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
            :type="productStatus(scope) === '售罄' ? 'danger' : 'success'"
          >
            {{ productStatus(scope) }}
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
          />
          <el-popconfirm
            title="确定删除此商品吗？"
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import columns from './tableColumns'
import AuthButton from '@/components/common/auth/AuthButton.vue'

export default defineComponent({
  name: 'TableDisplay',
  components: {
    AuthButton
  },
  props: {
    refresh: {
      type: Boolean
    }
  },
  setup () {
    const products = ref([])
    const selectedRows = ref([])
    return {
      columns,
      products,
      selectedRows
    }
  },
  watch: {
    refresh: {
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
    productStatus (scope: any): string {
      return scope.row.inventory === 0 ? '售罄' : '正常'
    },
    async getProducts () {
      const res = await (this as any).$api.getAllProducts()
      this.products = res.data
    },
    async deleteProduct (row: any) {
      await (this as any).$api.deleteProduct({
        productName: row.productName
      })
      await this.getProducts()
    },
    handleSelectionChange (selectedRows: any) {
      this.selectedRows = selectedRows
    },
    async deleteSelectedProducts () {
      const checkedList = this.selectedRows.map(item => item.productName);
      (this as any).$api.deleteProducts({
        checkedList
      })
      await this.getProducts()
    }
  }
})
</script>

<style>
</style>
