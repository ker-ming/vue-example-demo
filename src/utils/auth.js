import Cookies from 'js-cookie'

const TokenKey = 'token'

const UidKey = 'uid'

const PhoneKey = 'phone'// 登录获取的手机号

const NicknameKey = 'nickname'// 用户名

const ShopId = 'shop_id'// 店铺ID

const AvatarKey = 'avatar'

const IdentityKey = 'tob_iden'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 60 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getPhone() {
  return Cookies.get(PhoneKey)
}

export function setPhone(phone) {
  return Cookies.set(PhoneKey, phone, { expires: 60 })
}

export function getName() {
  return Cookies.get(NicknameKey)
}

export function setName(name) {
  return Cookies.set(NicknameKey, name, { expires: 60 })
}

export function getShopId() {
  return Cookies.get(ShopId)
}

export function setShopId(shop_id) {
  return Cookies.set(ShopId, shop_id, { expires: 60 })
}

export function getAvatar() {
  return Cookies.get(AvatarKey)
}

export function setAvatar(avatar) {
  return Cookies.set(AvatarKey, avatar, { expires: 60 })
}

export function setUid(uid) {
  return Cookies.set(UidKey, uid, { expires: 60 })
}

export function getUid() {
  return Cookies.get(UidKey)
}

export function setTopupData(topupData) {
  return Cookies.set('topupData', topupData, { expires: 60 })
}

export function getTopupData() {
  return Cookies.get('topupData')
}

export function setIdentity(identity) {
  return Cookies.set(IdentityKey, identity, { expires: 60 })
}

export function getIdentity() {
  return Cookies.get(IdentityKey)
}

export function setUserData(userData) {
  return Cookies.set('userData', userData, { expires: 60 })
}

export function getUserData() {
  return Cookies.get('userData')
}

export function setLevel(level) {
  return Cookies.set('level', level, { expires: 60 })
}

export function getLevel() {
  return Cookies.get('level')
}
