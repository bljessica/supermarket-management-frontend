export const ASIDE_ITEMS = {
  采购管理: {
    name: '采购管理',
    index: 1,
    urlPath: '/productDisplay/cards'
  },
  库存管理: {
    name: '库存管理',
    index: 2,
    urlPath: '/productDisplay/cards'
    // items: [{
    //   index: '2-1',
    //   name: '出/入库操作',
    //   urlPath: '/'
    // }, {
    //   index: '2-2',
    //   name: '出/入库信息查看',
    //   urlPath: '/'
    // }]
  },
  商品信息: {
    name: '商品信息',
    index: 3,
    urlPath: '/productDisplay/cards'
  },
  统计数据: {
    name: '统计数据',
    index: 4,
    urlPath: '/'
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
