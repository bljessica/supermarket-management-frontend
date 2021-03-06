import { UserState, RootState } from './types'

const user: UserState = {
  account: '',
  username: '',
  avatar: ''
}

const state: RootState = {
  user
}

export default state
