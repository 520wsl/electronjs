const {ipcMain} = require('electron');
const Utils = require('./utils.js');

const MSG_NAME = '__agent__';
ipcMain.on(MSG_NAME + 'ready', (event, name) => {
  if (typeof name !== "string") return
  _msg[name] = {};
  _senderMap[name] = event.sender
  _run(name);
})
ipcMain.on(MSG_NAME + 'req', (event, arg) => {
  console.log("main-req", arg);
  const {target, uuid, cmd, data} = arg;
  const _reqCb = {
    s: (data) => __reqCb(event.sender, uuid, true, data),
    f: (data) => __reqCb(event.sender, uuid, false, data),
  }
  if (target === 'main') {
    if (!cmds[cmd]) {
      console.error('未找到指令:' + cmd);
      return;
    }
    cmds[cmd](data, _reqCb);
    return;
  }
  let req = {target, cmd, data}
  if (uuid) {
    _send(req).then(data => _reqCb.s(data)).catch(data => _reqCb.f(data))
  } else {
    req.noCb = true;
    _send(req)
  }

})
ipcMain.on(MSG_NAME + 'res', (event, arg) => {
  console.log("main-res", arg);
  const {uuid, res, name} = arg;
  if (!uuid || !_msg[name] || !_msg[name][uuid]) {
    console.log(uuid);
    console.log(_msg[name]);
    return;
  }
  if (res.s) {
    _msg[name][uuid].resolve(res.data);
  } else {
    _msg[name][uuid].reject(res.data);
  }
  delete _msg[name][uuid];
})

const __reqCb = (sender, uuid, s, data) => {
  if (!uuid) return;
  sender.send(MSG_NAME + 'res', {uuid, res: {s, data}})
}

let _senderMap = {}
let _msg = {};
let _stackMap = {};
const _run = (name) => {
  if (!_stackMap[name]) return;
  _stackMap[name].forEach(i => _send_run(i))
  delete _stackMap[name];
}
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

  if (!_senderMap[target]) {
    _stackMap[target] || (_stackMap[target] = []);
    _stackMap[target].push({target, cmd, data, resolve, reject})
    return;
  }

  let req = {cmd, data}
  if (resolve) {
    let uuid;
    do {
      uuid = Utils.getUUID(16, 16);
    } while (_msg[target][uuid]);
    _msg[target][uuid] = {resolve, reject};
    req.uuid = uuid;
  }
  _senderMap[target].send(MSG_NAME + 'req', req)
}
let cmds = {}

module.exports = {
  init(_cmds) {
    cmds = _cmds || {}
  },
  send: _send
};
