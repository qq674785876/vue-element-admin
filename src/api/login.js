import request from '@/utils/request'

export function loginByUsername(email, password) {
  const data = {
    email,
    password
  }
  return request({
    url: '/v1/login',
    method: 'post',
    data
  })
}

export function register(obj) {
  const data = obj
  return request({
    url: '/v1/register',
    method: 'post',
    data
  })
}

export function findPass(obj) {
  const data = obj
  return request({
    url: '/v1/find',
    method: 'post',
    data
  })
}

export function sendMail(email, find) {
  const data = {
    email,
    find
  }
  return request({
    url: '/v1/sendMail',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

