import { UserState, RootState } from './types'

const user: UserState = {
  account: '',
  username: '',
  avatar: '',
  role: '',
  entryTime: ''
}

const state: RootState = {
  user
}

export default state
