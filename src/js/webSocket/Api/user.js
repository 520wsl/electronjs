import Ws from '../index.js'


let send = function (name, msg) {
  return Ws.send(`user.${name}`, msg);
};

let Api = {
  /**
   *
   * @param userId
   * @param nick
   * @returns {*}
   */
  login(userId) {
    return send('login', {userId})
  },
  logout(userId, nick) {
    return send('login', {userId, nick})
  }
};
export default Api;

