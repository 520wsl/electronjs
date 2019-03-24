import AES from 'crypto-js/aes'
import ENC_UTF8 from 'crypto-js/enc-utf8'
import SHA256 from 'crypto-js/sha256'
import router from "../router"
import _APP_CONFIG_ from '@/electron/APP_CONFIG.js';

let LSKEY = 'I5HJB7FYCAURKGTN';
let AESKEY = SHA256(_APP_CONFIG_.CHAOS).toString();

let getLocalUser = () => {
  let cipher = localStorage.getItem(LSKEY)
  if (!cipher) return null;
  let bytes = AES.decrypt(cipher, AESKEY);
  let user = JSON.parse(bytes.toString(ENC_UTF8));
  if (!user || !user.userId) return null;
  return user;
}
let setLocalUser = (user) => {
  localStorage.setItem(LSKEY, AES.encrypt(JSON.stringify(user), AESKEY).toString())
}
let logoutLocalUser = () => {
  localStorage.removeItem(LSKEY)
}
export default {
  state: {
    user: null,
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      const time = new Date().getTime();
      user.__last__ = time;
      if (!user.__first__) user.__first__ = time;
      setLocalUser(user);
    },
    logout(state) {
      state.userId = null;
      state.nick = null;
      logoutLocalUser();
    }
  },
  actions: {
    isLogin(context, cb) {
      if (!cb) return;
      if (context.state.userId) {
        cb(true)
      } else {
        try {
          let user = getLocalUser()
          if (!user) {
            cb(false)
          } else {
            context.dispatch('setUser', {
              userId: user.userId
            });
            cb(true)
          }
        } catch (e) {
          cb(false)
        }
      }
    },
    logout(context) {
      context.commit('logout');
      router.push({name: 'login'})

    }
  }
}