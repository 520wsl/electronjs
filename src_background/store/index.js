import Vue from 'vue'
import Vuex from 'vuex'
import User from '../User.js'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    isLogin(context, cb) {
      if (!cb) return;
      if (context.state.user) {
        cb(true, context.state.user)
      } else {
        User.isLogin()
          .then(user => {
            if (!user) {
              cb(false)
              return;
            }
            context.commit('setUser', user);
            cb(true, user)
          })
          .catch(() => cb(false))
      }
    },
    logout(context, cb) {
      User.logout().then(() => {
        context.commit('logout');
        cb && cb(true)
      }).catch(e => cb && cb(false, e))
    }
  }
})
