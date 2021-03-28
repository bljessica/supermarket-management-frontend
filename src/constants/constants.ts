export const ASIDE_ITEMS = {
  销售管理: {
    name: '销售管理',
    index: '/salesRecords',
    items: [{
      index: '/salesRecords',
      name: '销售记录'
    }, {
      index: '/statisticCharts',
      name: '统计图表'
    }, {
      index: '/',
      name: '商品推荐'
    }, {
      index: '/salesReport',
      name: '销售报表'
    }]
  },
  采购管理: {
    name: '采购管理',
    index: '/purchaseManagement'
  },
  库存管理: {
    name: '库存管理',
    index: '/inventoryManagement/cards'
  }
}

export const ROLE_LIST = {
  普通职员: {
    auth: ['VIEW_ALL']
  },
  采购员: {
    auth: ['VIEW_ALL', 'PURCHASE_SELF']
  },
  销售员: {
    auth: ['VIEW_ALL', 'SELL_SELF', 'EDIT_PRODUCT']
  },
  采购总管: {
    auth: ['VIEW_ALL', 'PURCHASE_ALL']
  },
  销售总管: {
    auth: ['VIEW_ALL', 'SELL_ALL', 'EDIT_PRODUCT']
  },
  总领导: {
    auth: ['VIEW_ALL', 'PURCHASE_ALL', 'SELL_ALL', 'EDIT_PRODUCT']
  }
}

export const PRODUCT_STATUS = {
  全部状态: {
    label: '全部状态',
    value: ''
  },
  正常: {
    label: '正常',
    value: '正常'
  },
  售罄: {
    label: '售罄',
    value: '售罄'
  }
}

export const PURCHASE_ORDER_STATUS = {
  未开始: {
    label: '未开始',
    value: '未开始'
  },
  已完成: {
    label: '已完成',
    value: '已完成'
  }
}
