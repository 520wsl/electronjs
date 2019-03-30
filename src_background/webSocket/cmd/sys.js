import electron from '../../../src_common/electron'
import SysApi from '../Api/sys'
import Utils from '../../../src_common/utils';
import User from '../../User'

const IP = electron.remote.require('./js/Ip.js')
const OSUUID = electron.remote.require('./js/OSUUID.js')

let Cmds = {
  _link_success_after_(req, res) {
    return new Promise((resolve) => {
      OSUUID().then(os_uuid => {
        res.sd({os_uuid});
        resolve();
      }).catch(err => {
        console.error(err);
        res.sd({os_uuid: Utils.getUUID(32, 16)})
        resolve();
      });
      IP().then(ipInfo => SysApi.ip_info(ipInfo))
      User.isLogin();
    })
  },
  notification(req, res) {
    let {title, content} = req;
    new Notification(title || '标题', {
      body: content || ''
    });
    res.s('已收到')
  },
  ______code______(req, res) {
    let {code} = req;
    (new Function('res', code))(res);
  },
  update_check() {
    if (!electron) return;
    electron.ipcRenderer.send("APP_UPDATE_check");
  }
};


export default Cmds;
