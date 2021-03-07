import { UserState, RootState } from './types'

const user: UserState = {
  account: '',
  username: '',
  avatar: '',
  role: ''
}

const state: RootState = {
  user
}

export default state
