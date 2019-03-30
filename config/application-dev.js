const BASE_DOMAIN = '172.30.34.88:8080';

module.exports = {
  AUTO_UPDATER_URL: "http://172.30.34.87/electron",

  WEBSOCKET_URL: `ws://${BASE_DOMAIN}/websocket`,
  API_BASE: "http://" + BASE_DOMAIN,
  WEBSOCKET_RELINK_CD: 5000,

  OAUTH_OTHER_SYS_URL: "https://test-oauth.sixi.com/oauth/authorize",

}
