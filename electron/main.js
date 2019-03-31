const Electron = require('electron');
const {app, Menu, Tray, BrowserWindow, MenuItem} = Electron;
const Path = require('path');
const Utils = require('./js/utils.js')
const fs = require('fs')
const AddGlobal = (key, valFn) => {
  Object.defineProperty(global, `_${key.toUpperCase()}_`, {
    get() {
      return valFn()
    },
    set() {
    },
    enumerable: true,
    configurable: false
  });
}

AddGlobal('FIRST_START', () => !fs.existsSync('data.db'))

try {
  let config = require('../config/application.js')

  if (process.env.NODE_ENV === 'development') {
    try {
      let configDev = require('../config/application-dev.js');
      Utils.object.merge(config, configDev)
    } catch (e) {
      //
    }
    try {
      let configLocal = require('../config/application-local.js');
      Utils.object.merge(config, configLocal)
    } catch (e) {
      //
    }


  }
  const configStr = JSON.stringify(config);
  AddGlobal('APP_CONFIG', () => JSON.parse(configStr))
} catch (e) {
  console.error(e);
}
// eslint-disable-next-line no-unused-vars
const nedb = require('./js/Nedb.js')
const app_menu = require('./js/Menu.js')
const AutoStart = require('./js/AutoStart.js');
const UpdateApp = require('./js/UpdateApp.js');
const Agent = require('./js/Agent.js');
const AgentCmds = require('./js/AgentCmds.js');
const Actions = require('./js/Actions.js')

Agent.init(AgentCmds);
const APP_LOGO_IMG = Path.join(__dirname, global._APP_CONFIG_.APP_LOGO_IMG)
const APP_LOGO_MIN_IMG = Path.join(__dirname, global._APP_CONFIG_.APP_LOGO_MIN_IMG)

class WindowBuilder {
  constructor(option) {
    this.OPTION = this.win = this.tray = this.trayMenu = null;
    const defaultOption = {
      width: 750,
      height: 900,
      icon: APP_LOGO_IMG,
      webPreferences: {webSecurity: false}
    }
    Object.assign(defaultOption, option);
    this.OPTION = JSON.parse(JSON.stringify(defaultOption));

    this.initWindow();
    this.initTray();

    this.initEvent();
  }


  initWindow() {
    Menu.setApplicationMenu(app_menu)
    const win = new BrowserWindow(this.OPTION);
    this.win = win;
    if (process.env.NODE_ENV === 'development') {
      win.webContents.openDevTools();
    }
  }

  initTray() {
    const win = this.win;
    const tray = new Tray(APP_LOGO_MIN_IMG);
    this.tray = tray;
    const trayMenu = Menu.buildFromTemplate([
      {
        id: 'show',
        label: '显示',
        click: () => {
          Actions.show();
        }
      },
      {
        id: 'up',
        label: '更新',
        click: () => {
          UpdateApp.check();
        }
      },
      {
        id: 'config',
        label: '设置',
        submenu: [
          {
            id: 'autoStart',
            label: '开机启动',
            type: 'checkbox',
            checked: false,
            visible: false,
            click: (menuItem) => {
              AutoStart(menuItem.checked).catch(err => {
                console.error(err);
                menuItem.checked = !menuItem.checked;
                this.refreshTrayMenu();
              })
            }
          }
        ]
      },
      {
        id: 'destroy',
        label: '退出',
        click: () => {
          Actions.exit();
        }
      }
    ]);
    this.trayMenu = trayMenu;

    tray.on('click', () => {
      win.isVisible() ? win.hide() : win.show()
      win.isVisible() ? win.setSkipTaskbar(false) : win.setSkipTaskbar(true);
    });
    tray.setToolTip('喜小帮');
    this.refreshTrayMenu();

    let autoStartMenu = trayMenu.getMenuItemById('autoStart');
    AutoStart().then(status => {
      autoStartMenu.visible = true;
      autoStartMenu.checked = status
      this.refreshTrayMenu();
    }).catch(err => {
      if (err !== 'unsupported system') {
        autoStartMenu.visible = true;
        this.refreshTrayMenu();
      }
      console.error('AutoStart', err);
    })

  }

  initEvent() {
    const win = this.win;
    const tray = this.tray;
    win.on('closed', () => {
      this.win = null;
    });
    win.on('close', (event) => {
      win.hide();
      win.setSkipTaskbar(true);
      event.preventDefault();
    });
    win.on('show', () => {
      tray.setHighlightMode('always')
    })
    win.on('hide', () => {
      tray.setHighlightMode('never')
    })
  }

  refreshTrayMenu() {
    this.tray.setContextMenu(this.trayMenu);
  }

  hide() {
    this.win.hide();
    this.win.setSkipTaskbar(true);
  }

  show() {
    this.win.show();
    this.win.setSkipTaskbar(false);
    this.win.focus()
  }
}


// eslint-disable-next-line no-unused-vars
let _mainWindow;
let _background;
let createBackgroundWindow = () => {
  let option = {
    width: 500,
    height: 350,
    icon: APP_LOGO_IMG,
    webPreferences: {webSecurity: false},
    frame: false,
    resizable: false,
      transparent: true,
      backgroundColor:'#00000000'
  }
  _background = new BrowserWindow(option);
  // _background.setOpacity(0.8)

  if (process.env.NODE_ENV === 'development') {
    _background.webContents.openDevTools();
  }
  _background.loadFile('./background/index.html');
  AddGlobal('BG_WINDOW', () => _background)


}
let createMainWindow = () => {
  createBackgroundWindow();
  _mainWindow = new WindowBuilder();
  AddGlobal('MAIN_WINDOW', () => _mainWindow)
  _mainWindow.hide()
  UpdateApp.init();
}

app.on('ready', createMainWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (!_mainWindow || !_mainWindow.win) {
    createMainWindow();
  }
});
