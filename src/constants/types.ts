export interface loginFormType {
  account: string,
  password: string,
  rememberUser: boolean
}

export interface registerFormType {
  account: string,
  role: string,
  password1: string,
  password2: string,
  username: string,
}

export interface userInfoType {
  account: string,
  password: string,
  avatar: string,
  username: string,
  role: string
}

export interface productType {
  productName: string,
  image: string,
  price: number,
  purchasePrice: number,
  unit: string,
  inventory: number,
  inventoryCeiling: number
}
