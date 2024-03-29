import { responseDataType, requestDataType } from '../types/request'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const BASE_URL = 'http://localhost:3000'

export default async ({ url = '', data = {}, method = 'GET' }: requestDataType) => {
  method = method.toUpperCase()
  url = BASE_URL + url
  let res = null
  if (method === 'GET') {
    // 处理get请求的参数
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&'
    })
    if (dataStr.length) {
      url += '?' + dataStr.substring(0, dataStr.length - 1)
    }
    res = await axios.get(url)
  } else if (method === 'POST') {
    res = await axios.post(url, data)
  } else if (method === 'PUT') {
    res = await axios.put(url, data)
  } else if (method === 'DELETE') {
    res = await axios.delete(url, { data }) // axios的delete方法只有url和config两个参数
  } else {
    ElMessage.error('暂不支持该请求类型')
    return
  }
  const resData: responseDataType = res.data
  if (resData.code === 0) {
    if (resData.msg) {
      ElMessage.success(resData.msg)
    }
  } else {
    if (resData.msg) {
      ElMessage.error(resData.msg)
    }
  }
  return resData
}
