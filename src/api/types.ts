export interface addUserDataType {
  account: string,
  password: string,
  username: string,
  role: '普通职员' | '采购员' | '销售员' | '采购总管' | '销售总管' | '总领导' | '',
}

export interface dataType {
  [key: string]: any
}

export interface responseDataType {
  code: 0 | 1,
  msg: string,
  data?: dataType
}

export interface requestDataType {
  url: string,
  data: dataType,
  method: string
}
