import Vue from 'vue'
import router from "../router"

const isElectron = () => !!Vue.prototype.Electron;
const BgReq = () => Vue.prototype.BgReq;

export default {
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
        cb(true)
      } else {
        if (!isElectron()) {
          cb(false)
          return;
        }
        BgReq().isLogin()
          .then(user => {
            if (user) {
              context.commit('setUser', user)
              cb(true)
            } else {
              cb(false)
            }
          })
      }
    },
    logout(context, ecb) {
      BgReq().logout().then(() => {
        context.commit('logout');
        router.push({name: 'login'})
      }).catch(err => ecb && ecb(err))
    }
  }
}
