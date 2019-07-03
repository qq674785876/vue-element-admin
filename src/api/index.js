import request from '@/utils/request'
// import { getUserInfo } from '@/utils/auth'
import Qs from 'qs'

// 用户相关

export function loginByUsername(username, password) {
  // let data = new FormData()
  // data.append('username',username)
  // data.append('password',password)
  const data = Qs.stringify({
    username: username,
    password: password
  })
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

// 注册后台用户
export function registadmin(data) {
  data = Qs.stringify(data)
  return request({
    url: '/registadmin',
    method: 'post',
    data
  })
}

// 修改后台用户密码
export function resetpassword(data) {
  data = Qs.stringify(data)
  return request({
    url: '/resetpassword',
    method: 'post',
    data
  })
}

// 后台用户列表
export function webUserList(data) {
  // let data = new FormData()
  // data.append('username',username)
  // data.append('password',password)
  data = Qs.stringify(data)
  return request({
    url: '/adminuserlist',
    method: 'post',
    data
  })
}

// 微信用户列表
export function wxUserList(data) {
  // let data = new FormData()
  // data.append('username',username)
  // data.append('password',password)
  data = Qs.stringify(data)
  return request({
    url: '/userlist',
    method: 'post',
    data
  })
}

// 微信用户地址列表
export function addresslist(data) {
  data = Qs.stringify(data)
  return request({
    url: '/addresslist',
    method: 'post',
    data
  })
}

// 设置代理
export function setuserproxy(data) {
  data = Qs.stringify(data)
  return request({
    url: '/setuserproxy',
    method: 'post',
    data
  })
}

// 禁止或启用
export function deleteoruse(data) {
  data = Qs.stringify(data)
  return request({
    url: '/deleteoruse',
    method: 'post',
    data
  })
}

// 新增商品
export function addproductinfo(data) {
  data = Qs.stringify(data)
  return request({
    url: '/addproductinfo',
    method: 'post',
    data
  })
}

// 商品列表
export function productlist(data) {
  data = Qs.stringify(data)
  return request({
    url: '/productlist',
    method: 'post',
    data
  })
}

// 更新商品信息
export function updateproduct(data) {
  data = Qs.stringify(data)
  return request({
    url: '/updateproduct',
    method: 'post',
    data
  })
}

// 新增商品详情
export function addproduct(data) {
  data = Qs.stringify(data)
  return request({
    url: '/addproduct',
    method: 'post',
    data
  })
}

// 商品详情列表
export function productdetaillist(data) {
  data = Qs.stringify(data)
  return request({
    url: '/productdetaillist',
    method: 'post',
    data
  })
}

// 更新商品详情
export function updateproductinfo(data) {
  data = Qs.stringify(data)
  return request({
    url: '/updateproductinfo',
    method: 'post',
    data
  })
}

// 新增商品参数
export function addproductparam(data) {
  data = Qs.stringify(data)
  return request({
    url: '/addproductparam',
    method: 'post',
    data
  })
}

// 商品参数列表
export function productparamlist(data) {
  data = Qs.stringify(data)
  return request({
    url: '/productparamlist',
    method: 'post',
    data
  })
}

// 更新商品参数
export function updateproductparam(data) {
  data = Qs.stringify(data)
  return request({
    url: '/updateproductparam',
    method: 'post',
    data
  })
}


// 新增代理商品参数
export function addproductparamproxy(data) {
  data = Qs.stringify(data)
  return request({
    url: '/addproductparamproxy',
    method: 'post',
    data
  })
}

// 代理商品列表
export function paramproxylist(data) {
  data = Qs.stringify(data)
  return request({
    url: '/paramproxylist',
    method: 'post',
    data
  })
}

// 更新代理商品参数
export function updateproductparamproxy(data) {
  data = Qs.stringify(data)
  return request({
    url: '/updateproductparamproxy',
    method: 'post',
    data
  })
}

