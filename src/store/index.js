import * as types from './mutation-types'

const state = {
    token: null,
    isVerified: null,
    client: null,
    products: null,
    added: [],
    QTY: null,
    total: null
}

const mutations = {

  setToken (state, payload){
    return state.token = payload;
  },

  setProducts (state, payload){
    return state.products = payload;
  },

  isVerified (state, payload){
    return state.isVerified = payload;
  },

  unsetToken (state){
    return state.token = null;
  },

  unsetId (state){
    return state.isVerified = null;
  },

  EMPTY_CART_VALUE (state) {
    return state.added = [];
  },

  SET_TOTAL_AMOUNT (state, payload) {
    return state.total = payload;
  },

  SET_TOTAL_QTY (state, payload) {
    return state.QTY = payload;
  },

  SET_CLIENT (state, payload) {
    return state.client = payload;
  },


  DELETE_TO_CART (state, { id }) {
    const record = state.added.find(p => p.id === id);
    if (record.quantity > 1) {
         record.quantity--
    } else {
       state.added.splice(record, 1);
    }
  },

  [types.ADD_TO_CART] (state, { id }) {
    const record = state.added.find(p => p.id === id);
    if (!record) {
        state.added.push({
          id,
          quantity: 1
        })
      } else {
        record.quantity++
      }
    }
  }


const getters = {
  getNumberOfProducts: state => (state.products) ? state.products.length : 0,
  cartProducts: state => {
    return state.added.map(({ id, quantity }) => {
      const product = state.products.find(p => p.id === id)
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity
      }
    })
  },

  QTY: state => {
     return state.QTY
  },

  total: state => {
     return state.total
  },

  access_token: state => {
    return state.token
  },

  verified: state => {
    return state.isVerified
  },

  client_id: state => {
    return state.client
  },

  email: state => {
    if(state.client){
      return state.client.email
    } 
  }
}

const actions = {
  setToken({commit}, payload) {
    commit('setToken', payload)
  },

  setProducts({commit}, payload) {
    commit('setProducts', payload)
  },

  isVerified({commit}, payload) {
    commit('isVerified', payload)
  },

  unsetToken({commit}) {
    commit('unsetToken')
  },

  unsetId({commit}) {
    commit('unsetId')
  },

  addToCart({ commit }, product){
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  },

  deleteProduct({ commit }, product){
    commit('DELETE_TO_CART', {
      id: product.id
    })
  },

  setTotalAmount({ commit }, payload){
    commit('SET_TOTAL_AMOUNT', payload)
  },

  emptyCartValue({ commit }){
    commit('EMPTY_CART_VALUE')
  },

  setTotalQTY({ commit }, payload){
    commit('SET_TOTAL_QTY', payload)
  },

  setClient({ commit }, payload){
    commit('SET_CLIENT', payload)
  }

}

export default {
   state, mutations, actions, getters
}
