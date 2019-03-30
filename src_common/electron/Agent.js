import Electron from "./index"
import Utils from "../utils"

const MSG_NAME = '__agent__';
let ipcRenderer;
const _init = (name, cmds) => {
  _cmds = cmds || {};
  _name = name;
  ipcRenderer = Electron.ipcRenderer;
  ipcRenderer.on(MSG_NAME + "req", (event, arg) => {
    console.log(_name + "req", arg);
    const {cmd, data, uuid} = arg;
    if (_cmds[cmd]) {
      let cb = (s, data) => {
        if (!uuid) return;
        ipcRenderer.send(MSG_NAME + 'res', {uuid, name: _name, res: {s, data}})
      }
      _cmds[cmd](data, {
        s: (res) => cb(true, res),
        f: (res) => cb(false, res)
      })
    } else {
      console.error('未找到指令:' + cmd);
    }
  });
  ipcRenderer.on(MSG_NAME + "res", (event, arg) => {
    console.log(_name + "res", arg);
    const {uuid, res} = arg;
    if (!uuid || !_msg[uuid]) return;
    if (res.s) {
      _msg[uuid].resolve(res.data);
    } else {
      _msg[uuid].reject(res.data);
    }
    delete _msg[uuid];

  });
  ipcRenderer.send(MSG_NAME + 'ready', name);
}


let _name;
let _msg = {};
let _cmds = {}
const _send = (data) => {
  if (!data.target || !data.cmd) return;
  if (data.noCb) {
    _send_run(data)
  } else {
    return new Promise((resolve, reject) => {
      data.resolve = resolve;
      data.reject = reject;
      _send_run(data)
    })
  }
}
const _send_run = ({target, cmd, data, resolve, reject}) => {
  let req = {target, cmd, data}
  if (resolve) {
    let uuid;
    do {
      uuid = Utils.getUUID(16, 16);
    } while (_msg[uuid]);
    _msg[uuid] = {resolve, reject};
    req.uuid = uuid;
  }
  console.log(MSG_NAME + "send", req);
  ipcRenderer.send(MSG_NAME + 'req', req)
}

export default {
  init: _init,
  send: _send,

};

