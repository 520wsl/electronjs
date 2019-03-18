import _APP_CONFIG_ from '@/electron/APP_CONFIG.js';

let api;
const apis = {
  loginForQRCode(appName = 'xxb') {
    return api.get(_APP_CONFIG_.API_LOGIN_QRCODE_URL, {appName})
  },
  loginForQRCodeStatus(redisKey, appName = 'xxb') {
    return api.get(_APP_CONFIG_.API_LOGIN_QRCODE_STATUS_URL, {redisKey, appName})
  },
};
export default {
  name: 'user',
  api: (_api) => {
    api = _api;
    return apis;
  }
};