export interface purchaseOrderType {
  productName: string,
  purchaseQuantity: number,
}

export interface addPurchaseOrderType {
  orderId: string,
  remark: string
  items: Array<purchaseOrderType>,
  purchaserAccount: string,
  purchaseTime: number
}
