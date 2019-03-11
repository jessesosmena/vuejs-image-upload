const state = {
    images: null,
    text: null
}

const mutations = {
  setImage (state, payload){
    return state.images = payload;
  },

  unsetImage (state){
    return state.images = null;
  },

  setText (state, payload){
    return state.text = payload;
  },

  unsetText (state){
    return state.text = null;
  }
}

const actions = {
  setImage({commit}, payload) {
    commit('setImage', payload)
  },

  setText({commit}, payload) {
    commit('setText', payload)
  },

  unsetImage({commit}) {
    commit('unsetImage')
  },

  unsetText({commit}) {
    commit('unsetText')
  }
}

export default {
   state, mutations, actions
}
