import request from './request/request'
import { loginDataType, registerDataType } from './types/auth'
import { productNameType, checkedListType } from './types/product'
import { addPurchaseOrderType } from './types/purchase'
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

export const getAllProducts = (data: any) => {
  return request({
    url: '/allProducts',
    method: 'GET',
    data
  })
}

export const getAllProductNames = () => {
  return request({
    url: '/allProductNames',
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

// purchase
export const addPurchaseOrder = (data: addPurchaseOrderType) => {
  return request({
    url: '/addPurchaseOrder',
    method: 'POST',
    data
  })
}

export const getAllPurchaseOrders = (data: any) => {
  return request({
    url: '/allPurchaseOrders',
    method: 'GET',
    data
  })
}
