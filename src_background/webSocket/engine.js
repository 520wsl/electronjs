import Utils from '../../src_common/utils'
// import store from '@/store'
import TQ from '../../src_common/TaskQueue';
import APP_CONFIG from '../../src_common/electron/APP_CONFIG';
import User from '../User'

let Ws = (wsUrl, CmdHandlers, reLinkCd = 300000) => {
  let webSocket;
  let linkSuccess = false;
  let reLinkTimeout = null;
  let reLink = () => {
    User.removeUser()
    webSocket = null;
    linkSuccess = false;
    clearTimeout(reLinkTimeout);
    reLinkTimeout = setTimeout(() => {
      console.log('ws:重连服务器中...');
      webSocket = newSocket(wsUrl);
    }, reLinkCd);
  };
  let newSocket = (url) => {
    let ws = new WebSocket(url);
    ws.onerror = () => {
      reLink();
    };
    ws.onopen = function (eve) {
      console.log("ws:连接到服务器", eve);
    };
    ws.onclose = () => {
      reLink();
    };

    ws.onmessage = (eve) => {
      console.log("ws:接到消息", eve.data);
      let data;
      try {
        data = JSON.parse(eve.data);
      } catch (e) {
        console.error("ws:消息数据不是json");
        console.error(e)
      }
      (data && data.type === 'req' ? handleReq(data) : handleRes(data));
    };
    return ws;
  };
  let handleData = (data) => {
    let res;
    if (Utils.object.isNull(data)) {
      res = {};
    } else {
      switch (data.constructor) {
        case Array: {
          res = {list: data};
          break
        }
        case Object: {
          res = data;
          break
        }
        default: {
          res = {val: data};
          break
        }
      }
    }
    return res;
  };
  let SendMsg = (msg) => {
    console.log('ws:发送消息', msg);
    webSocket.send(JSON.stringify(msg));
  };
  let sendRes = (req, success, msg, content) => {
    let msgObj = {
      type: 'res',
      success,
      cmd: req.cmd,
      msg,
      content: handleData(content),
      bizId: req.bizId,
      extra: req.extra
    };
    SendMsg(msgObj);
  };
  let Res = (req) => {

    return {
      s(msg, data) {
        sendRes(req, true, msg, data);
      },
      sd(data) {
        sendRes(req, true, null, data);
      },
      f(msg, detail, cause) {
        let data = {detail, cause};
        sendRes(req, false, msg, data);
      }
    }
  };
  let handleReq = (data) => {
    let res = Res(data);
    if (!data.cmd) {
      console.error('ws:没有指令', data);
      res.f("没有指令");
      return;
    }
    let reqData;
    if (Utils.string.isBlank(data.data)) {
      reqData = {};
    } else {
      try {
        reqData = JSON.parse(data.data);
      } catch (e) {
        reqData = data.data;
      }
    }
    if (data.cmd === 'sys.link_success') {
      const _link_success_after_ = (CmdHandlers.sys || {})._link_success_after_;
      if (_link_success_after_) {
        _link_success_after_(reqData, res, data).then(() => {
          linkSuccess = true;
          _runWSSend();
        })
      } else {
        linkSuccess = true;
        _runWSSend();
      }

      return;
    }
    if (data.cmd === 'sys.idle') {
      if (TQ.size() > APP_CONFIG.CMD_TASK_QUEUE_MAX) {
        res.sd(false);
        return
      }
      res.sd(true);
      return;
    }


    let cmds = data.cmd.split('.');
    if (cmds.length !== 2) {
      console.error('ws:指令格式不正确(*.*)', data);
      res.f("指令格式不正确(*.*)");
      return;
    }

    let handler = CmdHandlers[cmds[0]];
    if (!handler) {
      console.error('ws:没有找到有效的指令前缀', data);
      res.f("没有找到有效的指令前缀");
      return;
    }
    let cmd = handler[cmds[1]];
    if (!cmd) {
      console.error('ws:没有找到有效的指令后缀', data);
      res.f('没有找到有效的指令后缀');
      return;
    }

    cmd(reqData, res, data);


  };
  let handleRes = (data) => {
    if (data.bizId) {
      let sq = sendQueue[data.bizId];
      if (!sq) return;
      delete sendQueue[data.bizId];
      sq.callback(data)
    } else {
      console.log('无法识别的响应消息', data)
    }
  };

  let sendQueue = {};
  let _runWSSend = () => {
    if (!linkSuccess || Utils.map.isEmpty(sendQueue)) return;
    for (let key in sendQueue) {
      if (!sendQueue.hasOwnProperty(key) || sendQueue[key].sending) continue;
      let sq = sendQueue[key];
      SendMsg({
        type: 'req',
        cmd: sq.cmd,
        data: handleData(sq.data),
        bizId: key
      });
      sq.sending = true;
    }

  };


  /**
   *
   * @param cmd
   * @param data
   * @returns {Promise<?>}
   * @constructor
   */
  let WSSend = (cmd, data) => {
    return new Promise((resolve, reject) => {
      let uuid;
      do {
        uuid = Utils.getUUID(16, 16);
      } while (sendQueue[uuid]);
      sendQueue[uuid] = {
        cmd, data, callback: (res) => {
          res.success ? resolve(res) : reject(res);
        }
      };
      if (linkSuccess) {
        _runWSSend();
      }
    });
  };


  webSocket = newSocket(wsUrl);

  return WSSend;

};
export default Ws;



