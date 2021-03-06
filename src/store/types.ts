export interface UserState {
  account?: string,
  username?: string,
  avatar?: string
}

export interface RootState {
  user: UserState
}
