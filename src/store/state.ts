import { reactive } from 'vue'
import { UserState, RootState } from './types'

const user: UserState = {
  userId: '',
  userName: ''
}

const state: RootState = {
  user
}

export default state
