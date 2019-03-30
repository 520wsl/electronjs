const AddressSpectrum = require('./AddressSpectrum.js')

let show = 'bg';
const actions = {
  show() {
    if (show === 'bg') {
      global._BG_WINDOW_.show();
      global._BG_WINDOW_.setSkipTaskbar(false);
      global._BG_WINDOW_.focus()
    } else {
      global._MAIN_WINDOW_.show();
    }
  },
  toHome() {
    if (!global._MAIN_WINDOW_.win.isVisible()) actions.toMain();
    AddressSpectrum._home_();
  },
  toMain() {
    show = 'main'
    global._MAIN_WINDOW_.show();
    global._BG_WINDOW_.hide();
    global._BG_WINDOW_.setSkipTaskbar(true);
  },
  toBG() {
    show = 'bg'
    global._MAIN_WINDOW_.hide();
    global._BG_WINDOW_.show();
    global._BG_WINDOW_.setSkipTaskbar(false);
    global._BG_WINDOW_.focus()
  },
  exit() {
    global._MAIN_WINDOW_.win.destroy()
    global._BG_WINDOW_.destroy();
  }
}

module.exports = actions
