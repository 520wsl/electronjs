import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Api from './js/api'
import Utils from '../src_common/utils'
import iView from 'iview';
import electron from '../src_common/electron'
import AgentReqs from '../src_background/AgentReqs'
import electronAgent from '../src_common/electron/Agent'
import _APP_CONFIG_ from '../src_common/electron/APP_CONFIG.js';
import '../erp-ui-theme/dist/iview.css';
// import 'iview/dist/styles/iview.css';

if (electron) {

  electronAgent.init("web");
  Vue.prototype.BgReq = AgentReqs.reqs;
  Vue.prototype._APP_CONFIG_ = _APP_CONFIG_
}

Vue.use(iView);

Vue.config.productionTip = false;
Vue.prototype.Electron = electron;
Vue.prototype.Utils = Utils;
Vue.prototype.api = Api.api;
Vue.prototype.get = Api.get;
Vue.prototype.post = Api.post;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
