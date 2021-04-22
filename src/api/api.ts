import request from './request/request'
import { loginDataType, registerDataType } from './types/auth'
import { productNameType, checkedListType, getProductType } from './types/product'
import { addPurchaseOrderType } from './types/purchase'
import { addSalesOrderType } from './types/sales'
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

export const getProduct = (data: getProductType) => {
  return request({
    url: '/product',
    method: 'GET',
    data
  })
}

export const getAllProductNames = (data: any) => {
  return request({
    url: '/allProductNames',
    method: 'GET',
    data
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

export const productSuggest = (data: any) => {
  return request({
    url: '/productSuggest',
    method: 'GET',
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

export const deletePurchaseOrder = (data: any) => {
  return request({
    url: '/purchaseOrder',
    method: 'DELETE',
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

export const changePurchaseOrderStatus = (data: any) => {
  return request({
    url: '/changePurchaseOrderStatus',
    method: 'PUT',
    data
  })
}

// productInventoryChange
export const getProductInventoryChange = (data: any) => {
  return request({
    url: '/productInventoryChange',
    method: 'GET',
    data
  })
}

// sales
export const addSalesOrder = (data: addSalesOrderType) => {
  return request({
    url: '/addSalesOrder',
    method: 'POST',
    data
  })
}

export const deleteSalesOrder = (data: any) => {
  return request({
    url: '/salesOrder',
    method: 'DELETE',
    data
  })
}

export const getAllSalesOrders = (data: any) => {
  return request({
    url: '/allSalesOrders',
    method: 'GET',
    data
  })
}

export const getTotalSales = (data: any) => {
  return request({
    url: '/totalSales',
    method: 'GET',
    data
  })
}

export const getSalesReport = (data: any) => {
  return request({
    url: '/salesReport',
    method: 'GET',
    data
  })
}

// user
export const getUserInfo = (data: any) => {
  return request({
    url: '/userInfo',
    method: 'GET',
    data
  })
}

export const updateUserInfo = (data: any) => {
  return request({
    url: '/userInfo',
    method: 'PUT',
    data
  })
}

export const getUserGroups = () => {
  return request({
    url: '/userGroups',
    method: 'GET'
  })
}

// chat
export const sendMsg = (data: any) => {
  return request({
    url: '/sendMsg',
    method: 'POST',
    data
  })
}

export const getChatHistory = (data: any) => {
  return request({
    url: '/chatHistory',
    method: 'GET',
    data
  })
}
