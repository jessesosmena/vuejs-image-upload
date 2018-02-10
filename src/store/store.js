const state = {
    userData: null,
    isVerified: null
}

const mutations = {
  setToken (state, payload){
    return state.userData = payload;
  },

  isVerified (state, payload){
    return state.isVerified = payload;
  },

  unsetToken (state){
    return state.userData = null;
  },


  unsetId (state){
    return state.isVerified = null;
  }

}

const actions = {
  setToken({commit}, payload) {
    commit('setToken', payload)
  },

  isVerified({commit}, payload) {
    commit('isVerified', payload)
  },

  unsetToken({commit}) {
    commit('unsetToken')
  },


  unsetId({commit}) {
    commit('unsetId')
  }

}

export default {
   state, mutations, actions
}
