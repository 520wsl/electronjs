import User from '../../User'
import MainReqs from '../../../src_common/electron/AgentMainReqs'

let Cmds = {
  kick_out(req, res) {
    let {val} = req;
    new Notification("您已被踢出登录", {
      body: val
    });
    User.removeLocalUser();
    MainReqs.reqs.toHome()
  }
};


export default Cmds;
