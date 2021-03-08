<template>
  <div
    class="products-display-container"
    style="padding: 10px 20px;"
  >
    <!-- 头部 -->
    <div
      class="products-display-header"
      style="display: flex; align-items: center;justify-content: space-between;"
    >
      <!-- tab -->
      <div
        class="tabs-container"
        style="display: flex; align-items: center;"
      >
        <SvgIcon
          name="cards"
          :size="24"
          :color="currentTab === 'cards' ? '#409EFF' : '#8a8a8a'"
          style="cursor: pointer;"
          @click="changeTab('cards')"
        />
        <el-divider direction="vertical" />
        <SvgIcon
          name="table"
          :size="21"
          :color="currentTab === 'table' ? '#409EFF' : '#8a8a8a'"
          style="cursor: pointer;margin-left: 2px;"
          @click="changeTab('table')"
        />
      </div>
      <!-- 操作 -->
      <div
        class="actions-container"
      >
        <AuthButton
          action-auth="EDIT_PRODUCT"
          size="small"
          text="添加商品"
          @click="showAddProductDrawer = true"
        />
        <el-popconfirm
          v-if="currentTab === 'table'"
          title="确定删除已选商品？"
          @confirm="deleteSelectedProducts"
        >
          <template #reference>
            <AuthButton
              size="small"
              text="批量删除"
              action-auth="EDIT_PRODUCT"
            />
          </template>
        </el-popconfirm>
      </div>
    </div>
    <!-- 商品内容 -->
    <div
      class="products-display-content"
      style="margin-top: 20px;"
    >
      <CardsDisplay
        v-if="currentTab === 'cards'"
        :refresh="refresh"
      />
      <TableDisplay
        v-if="currentTab === 'table'"
        ref="tableDisplay"
        :refresh="refresh"
      />
    </div>
    <!-- 添加商品 - 抽屉 -->
    <el-drawer
      v-model="showAddProductDrawer"
      title="添加商品"
      size="70%"
      direction="rtl"
      destroy-on-close
    >
      <el-form
        ref="AddProductForm"
        style="padding: 20px 40px 20px 20px;"
        :model="addProductForm"
        :rules="addProductFormRules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item
          label="商品名"
          prop="productName"
        >
          <el-input v-model="addProductForm.productName" />
        </el-form-item>
        <el-form-item
          label="商品描述"
          prop="description"
        >
          <el-input v-model="addProductForm.description" />
        </el-form-item>
        <el-form-item
          label="价格"
          prop="price"
        >
          <el-input-number
            v-model="addProductForm.price"
          />
        </el-form-item>
        <el-form-item
          label="单位"
          prop="unit"
        >
          <el-input v-model="addProductForm.unit" />
        </el-form-item>
        <el-form-item
          label="库存量"
          prop="inventory"
        >
          <el-input-number
            v-model="addProductForm.inventory"
          />
        </el-form-item>
        <el-form-item
          label="库存上限"
          prop="inventoryCeiling"
        >
          <el-input-number
            v-model="addProductForm.inventoryCeiling"
          />
        </el-form-item>
      </el-form>
      <div
        class="drawer-footer"
        style="display: flex;justify-content: space-evenly;align-items: center;width: 50%;margin: 0 auto;"
      >
        <el-button @click="showAddProductDrawer = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="handleAddProduct"
        >
          确定
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CardsDisplay from '@/components/productsDisplay/CardsDisplay.vue'
import TableDisplay from '@/components/productsDisplay/TableDisplay.vue'
import { addProductForm, addProductFormRules } from './addProductFormModel'
import AuthButton from '@/components/common/auth/AuthButton.vue'

export default defineComponent({
  name: 'ProductDisplay',
  components: {
    CardsDisplay,
    TableDisplay,
    AuthButton
  },
  setup () {
    const currentTab = ref<'cards' | 'table'>('cards')
    const showAddProductDrawer = ref<boolean>(false)
    const addProductFormRef = ref(addProductForm)
    const refresh = ref<boolean>(false)
    return {
      currentTab,
      showAddProductDrawer,
      addProductForm: addProductFormRef,
      addProductFormRules,
      refresh
    }
  },
  watch: {
    currentTab (tab: 'cards' | 'table') {
      this.$router.replace({ path: '/productDisplay/' + tab })
    }
  },
  mounted () {
    if (this.$route.params.tab === 'table') {
      this.currentTab = 'table'
    }
  },
  methods: {
    async handleAddProduct () {
      const res = await (this as any).$api.addProduct(this.addProductForm)
      if (res.code === 0) {
        this.showAddProductDrawer = false
        this.refresh = !this.refresh
      }
    },
    changeTab (tab: 'cards' | 'table'): void {
      this.currentTab = tab
    },
    deleteSelectedProducts () {
      (this.$refs.tableDisplay as any).deleteSelectedProducts()
    }
  }
})
</script>

<style>

</style>
