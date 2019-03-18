module.exports = {
  /**
   * electron
   */
  APP_LOGO_IMG: '../public/logo.png',
  APP_LOGO_MIN_IMG: '../public/sixi.png',
  //自动更新地址
  AUTO_UPDATER_URL: "http://172.30.34.87/electron",
  //开机启动注册键
  AUTO_START_KEY: "SIXI_ELECTRONJS_CLIENT_AUTOSTART",
  /**
   * view
   */
  WEBSOCKET_URL: "ws://172.30.34.89:8080/websocket",
  //websocket断线重连间隔
  WEBSOCKET_RELINK_CD: 300000,
  //任务队列超时时间
  TASK_QUEUE_TIME_OUT: 180000,
  CHAOS: "poZrONA3i5BHlEateSC0MbhQKWUsGqdL",
  //api
  API_LOGIN_QRCODE_URL: "https://qmrqq.n.yumc.pw/simple/get/log/parameters",
  API_LOGIN_QRCODE_STATUS_URL: "https://qmrqq.n.yumc.pw/simple/gzh/log",
}