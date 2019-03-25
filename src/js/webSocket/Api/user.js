import Ws from '../index.js'


let send = function (name, msg) {
  return Ws.send(`user.${name}`, msg);
};

let Api = {
  login_qr_code() {
    return send('login_qr_code', {})
  },
  login_qr_code_status() {
    return send('login_qr_code_status', {})
  },
  login(user) {
    return send('login', {user})
  },
  logout(userId, nick) {
    return send('login', {userId, nick})
  }
};
export default Api;

