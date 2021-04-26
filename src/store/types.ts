export interface UserState {
  account?: string,
  username?: string,
  avatar?: string,
  role?: '普通职员' | '采购员' | '销售员' | '采购总管' | '仓库管理员' | '销售总管' | '总领导' | '',
  entryTime?: string
}

export interface RootState {
  user: UserState,
  socketConnected: boolean
}
