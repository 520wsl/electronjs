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
  logout() {
    return send('logout', {})
  },
  user_id_code() {
    return send('user_id_code', {})
  }
};
export default Api;

