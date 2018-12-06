import request from '@/utils/request'
import { getUserInfo } from '@/utils/auth'

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

export function getUserDetails(token) {
  return request({
    url: '/v1/userInfo',
    method: 'get',
    headers: { 'token': getUserInfo().token }
  })
}

export function imageUpload(image) {
  const data = image
  return request({
    url: '/v1/imageUpload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export function getRealName(obj) {
  const data = obj
  return request({
    url: '/v1/realName',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    data
  })
}

export function appUpload(file, onUploadProgress) {
  const data = file
  return request({
    url: '/v1/appUpload',
    method: 'post',
    // onprogress: onprogress,
    // onUploadProgress: onUploadProgress,
    headers: {
      'token': getUserInfo().token,
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function appDelete(obj) {
  const data = obj
  return request({
    url: '/v1/appList',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    data
  })
}

export function getAppList(obj) {
  const data = obj
  return request({
    url: '/v1/appList',
    method: 'get',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function getAppInfo(obj) {
  const data = obj
  return request({
    url: '/v1/appInfo',
    method: 'get',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function appVersionRemark(obj) {
  const data = obj
  return request({
    url: '/v1/appVersionRemark',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    data
  })
}
