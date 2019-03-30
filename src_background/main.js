/* eslint-disable no-unused-vars */
import APP_CONFIG from '../src_common/electron/APP_CONFIG'
import webSocket from './webSocket'
import AgentCmd from './AgentCmds'
import Agent from '../src_common/electron/Agent'
import Utils from '../src_common/utils'
import electron from '../src_common/electron'

import Vue from 'vue'
import iView from 'iview';
import App from './view/App.vue'
import store from "./store";

import '../erp-ui-theme/dist/iview.css';
// import 'iview/dist/styles/iview.css';

Agent.init(AgentCmd.name, AgentCmd.cmds);

Vue.use(iView);

Vue.config.productionTip = false;
Vue.prototype.Utils = Utils;
Vue.prototype.Electron = electron;
Vue.prototype.APP_CONFIG = APP_CONFIG
Vue.prototype.WS = webSocket


new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
