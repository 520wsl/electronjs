const Agent = require('./Agent.js');
const bgName = 'background';
const bgReqSend = (cmd, data) => {
  return Agent.send({target: bgName, cmd, data})
}

module.exports = {
  otherSysLoginUrl(redirect_uri, state) {
    return bgReqSend('otherSysLoginUrl', {redirect_uri, state})
  },
  // home() {
  //   return new Promise(resolve => app('home', {}, () => resolve()))
  // },
  // setIframeUrl(url) {
  //   return new Promise(resolve => app('setIframeUrl', {url}, () => resolve()))
  // }
};
