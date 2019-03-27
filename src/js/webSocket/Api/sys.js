import Ws from '../index.js'


let send = function (name, msg) {
  return Ws.send(`sys.${name}`, msg);
};


let Api = {
  ip_info(ipInfo) {
    return send('ip_info', {ipInfo});
  }
};
export default Api;

