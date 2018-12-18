import request from '@/utils/request'
import { getUserInfo } from '@/utils/auth'

// 用户相关

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

export function sendMailUpdate() {
  return request({
    url: '/v1/sendMailUpdate',
    method: 'post',
    headers: { 'token': getUserInfo().token }
  })
}

export function checkCode(data) {
  return request({
    url: '/v1/checkCode',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    data
  })
}

export function emailUpdate(data) {
  return request({
    url: '/v1/emailUpdate',
    method: 'post',
    headers: { 'token': getUserInfo().token },
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

export function userUpdate(data) {
  return request({
    url: '/v1/userUpdate',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    data
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

// app相关

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
    url: '/v1/appDelete',
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

export function userApp(obj) {
  const data = obj
  return request({
    url: '/v1/userApp',
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

export function appStateUpdate(obj) {
  const data = obj
  return request({
    url: '/v1/appStateUpdate',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function appUrlUpdate(obj) {
  const data = obj
  return request({
    url: '/v1/appUrlUpdate',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function appUpdate(obj) {
  const data = obj
  return request({
    url: '/v1/appUpdate',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function appMerge(data) {
  return request({
    url: '/v1/appMerge',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    data
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

export function appStatistics(data) {
  return request({
    url: '/v1/appStatistics',
    method: 'get',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function packages() {
  return request({
    url: '/v1/packages',
    method: 'get',
    headers: { 'token': getUserInfo().token }
  })
}

export function buyPackage(data) {
  return request({
    url: '/v1/buyPackage',
    method: 'get',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function messageList(data) {
  return request({
    url: '/v1/messageList',
    method: 'get',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function messageUpdate(data) {
  return request({
    url: '/v1/messageUpdate',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function messageFind() {
  return request({
    url: '/v1/messageFind',
    method: 'get',
    headers: { 'token': getUserInfo().token }
  })
}

export function appDownInfo(data) {
  return request({
    url: '/v1/appDownInfo',
    method: 'get',
    params: data
  })
}

export function appDownUrl(data) {
  return request({
    url: '/v1/appDownUrl',
    method: 'post',
    params: data
  })
}

export function checkOrderState(data) {
  return request({
    url: '/v1/checkOrderState',
    method: 'get',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}

export function appSplit(data) {
  return request({
    url: '/v1/appSplit',
    method: 'post',
    headers: { 'token': getUserInfo().token },
    params: data
  })
}
