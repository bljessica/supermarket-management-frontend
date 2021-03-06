import { userInfoType } from '@/constants/types'
import CryptoJS from 'crypto-js'
import { login } from '@/api/api'
import Store from '@/store'

const encryptKey = 'yuasn3r2uiceiuwh'

// 将用户信息存入cookie
export const saveUserToLocal = (userInfo: userInfoType, keyStr = encryptKey) => {
  // 加密密码(ECBE模式)
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const src = CryptoJS.enc.Utf8.parse(userInfo.password)
  const encrypted = CryptoJS.AES.encrypt(src, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).toString()
  userInfo.password = encrypted
  localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

// 读取cookie中的用户信息
export const getUserFromLocal = async (keyStr = encryptKey) => {
  const userInfoStorage = localStorage.getItem('userInfo')
  if (!userInfoStorage) {
    return
  }
  const userInfo = JSON.parse(userInfoStorage)
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const decrypted = CryptoJS.AES.decrypt(userInfo.password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const password = CryptoJS.enc.Utf8.stringify(decrypted).toString()
  const res = await login({
    account: userInfo.account,
    password: CryptoJS.MD5(password).toString(),
    autoLogin: true
  })
  console.log(res)
  if (res.code === 0) {
    Store.commit('setUser', userInfo)
  }
}
