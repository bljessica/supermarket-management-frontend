export interface UserState {
  userId: string,
  userName: string
}

export interface RootState {
  user: UserState
}
