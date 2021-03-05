import request from './request'
import { addUserDataType } from './types'

export const addUser = (data: addUserDataType) => {
  return request({
    url: '/addUser',
    data: data,
    method: 'POST'
  })
}
