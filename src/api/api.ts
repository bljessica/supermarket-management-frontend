import request from './request/request'
import { loginDataType, registerDataType } from './types/auth'
import { productNameType, checkedListType } from './types/product'
import { productType } from '@/constants/types'

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
export const addProduct = (data: productType) => {
  return request({
    url: '/addProduct',
    data,
    method: 'POST'
  })
}

export const getAllProducts = () => {
  return request({
    url: '/allProducts',
    method: 'GET'
  })
}

export const deleteProduct = (data: productNameType) => {
  return request({
    url: '/deleteProduct',
    method: 'DELETE',
    data
  })
}

export const deleteProducts = (data: checkedListType) => {
  return request({
    url: '/deleteProducts',
    method: 'DELETE',
    data
  })
}

export const editProduct = (data: productType) => {
  return request({
    url: '/editProduct',
    method: 'PUT',
    data
  })
}
