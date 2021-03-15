export interface productNameType {
  productName: string
}

export interface checkedListType {
  checkedList: Array<string>
}

export interface editProductType {
  _id: string,
  productName: string,
  image: string,
  price: number,
  unit: string,
  inventory: number,
  inventoryCeiling: number
}

export interface getProductType {
  _id: string
}
