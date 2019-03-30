import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    iframeUrl: null
  },
  mutations: {
    setIframeUrl(state, url) {
      state.iframeUrl = url;
    },
  },
  actions: {},
  modules: {
    user
  }
})
