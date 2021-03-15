export const ASIDE_ITEMS = {
  销售管理: {
    name: '销售管理',
    index: '1',
    items: [{
      index: '1-1',
      name: '商品信息',
      urlPath: '/productDisplay/cards'
    }, {
      index: '1-2',
      name: '销售记录',
      urlPath: '/'
    }, {
      index: '1-3',
      name: '销售图表',
      urlPath: '/'
    }, {
      index: '1-4',
      name: '商品推荐',
      urlPath: '/'
    }, {
      index: '1-5',
      name: '销售报表',
      urlPath: '/'
    }]
  },
  采购管理: {
    name: '采购管理',
    index: '2',
    urlPath: '/purchaseManagement'
  },
  库存管理: {
    name: '库存管理',
    index: '3',
    items: [{
      index: '3-1',
      name: '出/入库历史',
      urlPath: '/'
    }, {
      index: '3-2',
      name: '库存信息',
      urlPath: '/'
    }]
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
