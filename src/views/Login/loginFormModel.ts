import { loginFormType } from '@/constants/types'

export const loginForm: loginFormType = {
  account: '',
  password: '',
  rememberUser: false
}

export const loginFormRules = {
  account: [
    { required: true, message: '账号不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' }
  ]
}
