import Agent from '../src_common/electron/Agent'


const reqSend = (cmd, data) => {
  return Agent.send({target: name, cmd, data})
}

const reqs = {
  setUser(user) {
    return reqSend('setUser', user);
  },
  isLogin() {
    return reqSend('isLogin', {});
  },
  logout() {
    return reqSend('logout', {});
  },
  removeUser() {
    return reqSend('removeUser', {});
  },
  removeLocalUser() {
    return reqSend('removeLocalUser', {});
  },
  otherSysLoginUrl(redirect_uri, state) {
    return reqSend('otherSysLoginUrl', {redirect_uri, state});
  },
  webSocketCmd(type, cmd, data) {
    return reqSend('webSocketCmd', {type, cmd, data});
  }
}
const name = 'background';
export default {name, reqs}
