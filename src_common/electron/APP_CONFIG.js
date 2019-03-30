import electron from './index'
// import Application from '../../config/application'

let APP_CONFIG = {}
if (electron) {
  APP_CONFIG = electron.remote.getGlobal('_APP_CONFIG_');
} else {
  // APP_CONFIG = Application;
}
export default APP_CONFIG;
