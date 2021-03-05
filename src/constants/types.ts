export interface loginFormType {
  account: string,
  password: string
}

export interface registerFormType {
  account: string,
  role: '普通职员' | '采购员' | '销售员' | '采购总管' | '销售总管' | '总领导' | '',
  password1: string,
  password2: string,
  username: string,
}
