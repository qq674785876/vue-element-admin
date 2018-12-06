import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserInfo = 'UserInfo'

export function removeAllCookie() {
  Cookies.remove(TokenKey)
  Cookies.remove(UserInfo)
  return true
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserInfo(userInfo) {
  return Cookies.set(UserInfo, JSON.stringify(userInfo))
}

export function getUserInfo() {
  return Cookies.get(UserInfo) ? JSON.parse(Cookies.get(UserInfo)) : ''
}

