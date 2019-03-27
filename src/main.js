import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './js/api'
import Utils from './js/utils'
import User from './js/utils/User'
import Ws from './js/webSocket'
import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import config from "./../config/application.js";
import electron from './electron'
import _APP_CONFIG_ from './electron/APP_CONFIG.js';
import '../erp-ui-theme/dist/iview.css';

Vue.use(iView);


Vue.config.productionTip = false;
Vue.prototype._APP_CONFIG_ = _APP_CONFIG_
Vue.prototype.Electron = electron;
Vue.prototype.Ws = Ws;
Vue.prototype.Utils = Utils;
Vue.prototype.User = User;
Vue.prototype.api = Api.api;
Vue.prototype.get = Api.get;
Vue.prototype.post = Api.post;
Vue.prototype.$config = config;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
