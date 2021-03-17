export interface salesOrderType {
  productName: string,
  salesVolume: number,
}

export interface addSalesOrderType {
  orderId: string,
  remark: string
  items: Array<salesOrderType>,
  sellerAccount: string,
  createTime: number
}
