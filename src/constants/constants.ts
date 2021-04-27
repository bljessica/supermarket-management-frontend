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
      index: '/productSuggest',
      name: '进货推荐'
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
    auth: []
  },
  采购员: {
    auth: ['PURCHASE_SELF']
  },
  销售员: {
    auth: ['SELL_SELF', 'EDIT_PRODUCT']
  },
  仓库管理员: {
    auth: ['STORAGE']
  },
  人事管理员: {
    auth: ['USER_MANAGEMENT']
  },
  采购总管: {
    auth: ['PURCHASE_SELF', 'PURCHASE_ALL']
  },
  销售总管: {
    auth: ['SELL_SELF', 'SELL_ALL', 'EDIT_PRODUCT']
  },
  总领导: {
    auth: ['PURCHASE_SELF', 'PURCHASE_ALL', 'SELL_SELF', 'SELL_ALL', 'EDIT_PRODUCT', 'STORAGE', 'USER_MANAGEMENT']
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

export const INVENTORY_LOCATION_OPTIONS = [
  {
    label: '默认仓库',
    value: '默认仓库'
  },
  {
    label: '备用仓库',
    value: '备用仓库'
  }
]

export const PURCHASE_ORDER_STATUS = {
  未开始: {
    index: 1,
    tagType: 'info'
  },
  采购完成: {
    index: 2,
    tagType: 'warning'
  },
  入库完成: {
    index: 3,
    tagType: 'primary'
  },
  订单完成: {
    index: 4,
    tagType: 'success'
  }
  // 未开始: {
  //   label: '未开始',
  //   value: '未开始'
  // },
  // 已完成: {
  //   label: '已完成',
  //   value: '已完成'
  // }
}
