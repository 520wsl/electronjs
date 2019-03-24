module.exports = {
  /**
   * electron
   */
  APP_LOGO_IMG: '../public/logo.png',
  APP_LOGO_MIN_IMG: '../public/sixi.png',
  //自动更新地址
  AUTO_UPDATER_URL: "https://git.sixi.com/sixi-client/sixi.client.electronjs.updater/raw/master",
  //开机启动注册键
  AUTO_START_KEY: "SIXI_ELECTRONJS_CLIENT_AUTOSTART",
  /**
   * view
   */
  WEBSOCKET_URL: "ws://chrome.open.sixi.com/websocket",
  //websocket断线重连间隔
  WEBSOCKET_RELINK_CD: 300000,
  //任务队列超时时间
  TASK_QUEUE_TIME_OUT: 180000,
  CHAOS: "poZrONA3i5BHlEateSC0MbhQKWUsGqdL",
  //api
  API_LOGIN_QRCODE_URL: "https://test-oauth.sixi.com/simple/get/log/parameters",
  API_LOGIN_QRCODE_STATUS_URL: "https://test-oauth.sixi.com/simple/gzh/log",
}