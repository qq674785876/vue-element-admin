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

export function webUserList(data) {
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

