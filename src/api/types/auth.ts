export interface registerDataType {
  account: string,
  password: string,
  username: string,
  role: string,
  entryTime: number
}

export interface loginDataType {
  account: string,
  password: string,
  autoLogin?: boolean
}
