import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserName = 'UserName'
const UserInfo = 'UserInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setName(name) {
  return Cookies.set(UserName, name)
}

export function getName() {
  return Cookies.get(UserName)
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfo, JSON.stringify(userInfo))
}

export function getUserInfo() {
  return Cookies.get(UserInfo) ? JSON.parse(Cookies.get(UserInfo)) : ''
}

