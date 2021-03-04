import { UserState, RootState } from './types'

const setUser = (state: RootState, user: UserState) => {
  state.user = user
}

export default {
  setUser
}
