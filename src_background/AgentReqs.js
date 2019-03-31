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
  otherSysLoginUrl(redirect_uri, client, state) {
    return reqSend('otherSysLoginUrl', {redirect_uri, client, state});
  },
  webSocketCmd(type, cmd, data) {
    return reqSend('webSocketCmd', {type, cmd, data});
  },
  _1688Ranking(keywords, selector, parameter, needItem, maxPage, pageSize){
    return reqSend('_1688Ranking', {keywords, selector, parameter, needItem, maxPage, pageSize});
  },
  _1688RankingSales(keywords, selector, parameter, needItem, maxPage, pageSize){
    return reqSend('_1688RankingSales', {keywords, selector, parameter, needItem, maxPage, pageSize});
  },
  _1688Search(keywords, parameter, pageTotal, pageSize){
    return reqSend('_1688Search', {keywords, parameter, pageTotal, pageSize});
  },
}
const name = 'background';
export default {name, reqs}
