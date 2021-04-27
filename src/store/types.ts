export interface UserState {
  account?: string,
  username?: string,
  avatar?: string,
  role?: string,
  entryTime?: string
}

export interface RootState {
  user: UserState,
  socketConnected: boolean
}
