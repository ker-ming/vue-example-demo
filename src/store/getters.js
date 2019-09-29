const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  phone: state => state.user.phone,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  shop_id: state => state.user.shop_id,
  cart_list: state => state.order.cartList,
  store_list: state => state.order.storeList,
  pay_order: state => state.order.payOrder,
  search_value: state => state.app.search_value,
  level: state => state.user.level
}

export default getters
