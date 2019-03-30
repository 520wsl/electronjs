const Agent = require('./Agent.js');
const bgName = 'background';
const bgReqSend = (cmd, data) => {
  return Agent.send({target: bgName, cmd, data})
}

module.exports = {
  otherSysLoginUrl(redirect_uri, client, state) {
    return bgReqSend('otherSysLoginUrl', {redirect_uri, client, state})
  },
  logout() {
    return bgReqSend('logout')
  },
  // home() {
  //   return new Promise(resolve => app('home', {}, () => resolve()))
  // },
  // setIframeUrl(url) {
  //   return new Promise(resolve => app('setIframeUrl', {url}, () => resolve()))
  // }
};
