const BASE_DOMAIN = 'chrome.open.sixi.com';

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
  WEBSOCKET_URL: `ws://${BASE_DOMAIN}/websocket`,
  //websocket断线重连间隔
  WEBSOCKET_RELINK_CD: 300000,
  //任务队列超时时间
  TASK_QUEUE_TIME_OUT: 180000,
  //接到sys.idle(是否有空闲执行任务)指令时任务队列上限
  CMD_TASK_QUEUE_MAX: 2,
  //登录二维码过期时间
  LOGIN_QR_CODE_EXPIRED: 120000,
  //登录二维码状态获取间隔
  LOGIN_QR_CODE_STATUS_CD: 3500,
  CHAOS: "poZrONA3i5BHlEateSC0MbhQKWUsGqdL",
  //登录其它系统使用的授权链接
  OAUTH_OTHER_SYS_URL: "https://oauth.sixi.com/oauth/authorize",
  CDN: "http://custom-center.oss-cn-hangzhou.aliyuncs.com/customerCenter/image",
  XXB_WEB_BASE: "https://workapp.sixi.com",

  //API
  API_BASE: "https://" + BASE_DOMAIN,
  API_USER_CODE: "/user/code",
}
