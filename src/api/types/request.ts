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
  data?: dataType,
  method: string
}
