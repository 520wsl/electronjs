import electron from './index'

let APP_CONFIG = {}
if (electron) {
  APP_CONFIG = electron.remote.getGlobal('_APP_CONFIG_');
}
export default APP_CONFIG;