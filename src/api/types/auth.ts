export interface registerDataType {
  account: string,
  password: string,
  username: string,
  role: '普通职员' | '采购员' | '销售员' | '采购总管' | '销售总管' | '总领导' | '',
  entryTime: string
}

export interface loginDataType {
  account: string,
  password: string,
  autoLogin?: boolean
}
