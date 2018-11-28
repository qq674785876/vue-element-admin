import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserName = 'UserName'

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

export function getName(name) {
  return Cookies.get(UserName)
}
