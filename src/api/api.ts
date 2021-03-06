import request from './request/request'
import { loginDataType, registerDataType } from './types/auth'
import { addProductFormType } from '@/constants/types'

// auth
export const login = (data: loginDataType) => {
  return request({
    url: '/login',
    data,
    method: 'POST'
  })
}

export const register = (data: registerDataType) => {
  return request({
    url: '/register',
    data: data,
    method: 'POST'
  })
}

// product
export const addProduct = (data: addProductFormType) => {
  return request({
    url: '/addProduct',
    data,
    method: 'POST'
  })
}
