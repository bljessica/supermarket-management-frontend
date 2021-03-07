export interface UserState {
  account?: string,
  username?: string,
  avatar?: string,
  role: '普通职员' | '采购员' | '销售员' | '采购总管' | '销售总管' | '总领导' | ''
}

export interface RootState {
  user: UserState
}
