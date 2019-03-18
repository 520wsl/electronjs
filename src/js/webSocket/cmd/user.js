import store from '../../../store'

let Cmds = {
  kickOut(req, res) {
    let {val} = req;
    new Notification("您已被踢出登录", {
      body: val
    });
    store.dispatch('logout')
  }
};


export default Cmds;