import User from './User';
import WsApi from './webSocket/Api'
import store from './store'

const cmds = {
  setUser(user, res) {
    User.setUser(user);
    res.s();
  },
  isLogin(__, res) {
    store.dispatch('isLogin', (s, user) => {
      res[s ? 's' : 'f'](user)
    })
  },
  logout(__, res) {
    store.dispatch('logout', (s, e) => {
      res[s ? 's' : 'f'](e)
    })
  },
  removeUser(__, res) {
    User.removeUser();
    res.s();
  },
  removeLocalUser(__, res) {
    User.removeLocalUser();
    res.s();
  },
  otherSysLoginUrl({redirect_uri, client, state}, res) {
    User.otherSysLoginUrl(redirect_uri, client, state).then(d => res.s(d)).catch(e => res.f(e));
  },
  webSocketCmd({type, cmd, data}, res) {
    if (!WsApi[type]) {
      console.error("没有找到ws指令类型:" + type);
      return;
    }
    if (!WsApi[type][cmd]) {
      console.error("没有找到ws指令:" + cmd);
      return;
    }
    WsApi[type][cmd].apply(WsApi[type], data)
      .then(d => res.s(d))
      .catch(e => res.f(e))
  }
}

const name = 'background';
export default {name, cmds}
