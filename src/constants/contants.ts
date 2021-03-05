export const ASIDE_ITEMS = {
  采购管理: {
    name: '采购管理',
    index: 1,
    items: [{
      index: '1-1',
      name: '录入信息',
      urlPath: '/index'
    }, {
      index: '1-2',
      name: '查看信息',
      urlPath: '/index'
    }]
  },
  库存管理: {
    name: '库存管理',
    index: 2,
    items: [{
      index: '2-1',
      name: '出/入库操作',
      urlPath: '/index'
    }, {
      index: '2-2',
      name: '出/入库信息查看',
      urlPath: '/index'
    }]
  },
  商品信息: {
    name: '商品信息',
    index: 3,
    urlPath: '/productDisplay/cards'
  },
  统计数据: {
    name: '统计数据',
    index: 4,
    urlPath: '/index'
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
    auth: ['VIEW_ALL', 'SELL_SELF']
  },
  采购总管: {
    auth: ['VIEW_ALL', 'PURCHASE_ALL']
  },
  销售总管: {
    auth: ['VIEW_ALL', 'SELL_ALL']
  },
  总领导: {
    auth: ['VIEW_ALL', 'PURCHASE_ALL', 'SELL_ALL']
  }
}
