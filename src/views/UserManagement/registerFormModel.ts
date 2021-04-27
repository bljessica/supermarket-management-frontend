import { ref } from 'vue'
import { registerFormType } from '@/constants/types'

export const registerForm: registerFormType = {
  account: '',
  role: '',
  username: '',
  password1: '',
  password2: ''
}

const validateAccount = (rule: any, value: string, cb: any) => {
  if (!value) {
    cb(new Error('请输入手机号或邮箱'))
  } else {
    const emailReg = /[\d\w._-]+@[\d\w]+\.[\w]+/
    const phoneReg = /^1[358]\d{9}$/
    if (emailReg.test(value) || phoneReg.test(value)) {
      cb()
    } else {
      cb(new Error('手机号或邮箱不合法'))
    }
  }
}

const validatePassword1 = (rule: any, value: string, cb: any) => {
  if (!value) {
    cb(new Error('请输入密码'))
  } else if (!(/^[\w_-]{6,16}$/).test(value)) {
    cb(new Error('密码强度太低，请重新设置'))
  } else {
    cb()
  }
}

const validatePassword2 = (rule: any, value: string, cb: any) => {
  const form = ref(registerForm)
  if (!value) {
    cb(new Error('请再次输入密码'))
  } else if (value !== form.value.password1) {
    cb(new Error('两次输入的密码不一致'))
  } else {
    cb()
  }
}

export const registerFormRules = {
  account: [
    {
      validator: validateAccount, trigger: 'blur', required: true
    }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择职位', trigger: 'blur' }
  ],
  password1: [
    { validator: validatePassword1, trigger: 'blur', required: true }
  ],
  password2: [
    { validator: validatePassword2, trigger: 'blur', required: true }
  ]
}
