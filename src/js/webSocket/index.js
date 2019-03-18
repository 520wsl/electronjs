import Engine from "./engine"
import sys from "./cmd/sys"
import scout from "./cmd/scout"
import user from "./cmd/user.js"
import _APP_CONFIG_ from '@/electron/APP_CONFIG.js';

let CmdHandlers = {sys, scout, user};
let send = Engine(_APP_CONFIG_.WEBSOCKET_URL, CmdHandlers, _APP_CONFIG_.WEBSOCKET_RELINK_CD);

/**
 * @returns {Promise<?>}
 */
let _s = () => {
  return send;
}

export default {
  /**
   * @returns {Promise<?>}
   */
  send: _s()
};