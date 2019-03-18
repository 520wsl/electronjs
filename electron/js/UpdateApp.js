const AutoUpdater = require("electron-updater").autoUpdater;
const electron = require('electron');
const IpcMain = electron.ipcMain;
const Notification = electron.Notification;

const APP_LOGO_IMG = './public/logo.png'
AutoUpdater.setFeedURL(global._APP_CONFIG_.AUTO_UPDATER_URL);
AutoUpdater.autoDownload = false;
AutoUpdater.on('error', function (error) {//更新错误
  new Notification({
    title: '更新失败！',
    body: error.toString(),
    icon: APP_LOGO_IMG
  }).show();
  sendUpdateMessage('error', error)
});
AutoUpdater.on('checking-for-update', function () {//开始检查更新
  sendUpdateMessage('checking')
});
AutoUpdater.on('update-available', function (info) {//有更新
  if (!global._MAIN_WINDOW_.win.isVisible()) {
    new Notification({
      title: `应用有新的版本！"${info.version}" 开始自动更新`,
      body: info.detail || '',
      icon: APP_LOGO_IMG
    }).show();
    AutoUpdater.downloadUpdate();
  } else {
    if (_startChecking) {
      info._startChecking = _startChecking;
      _startChecking = false;
    }
    sendUpdateMessage('available', info)
  }


});
AutoUpdater.on('update-not-available', function (info) {//已最新
  sendUpdateMessage('not-available', info)
});

AutoUpdater.on('download-progress', function (progressObj) {//下载进度
  sendUpdateMessage('progress', progressObj)
})
AutoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {//下载完成
  if (!global._MAIN_WINDOW_.win.isVisible()) {
    new Notification({
      title: '更新包下载完成，开始安装',
      icon: APP_LOGO_IMG
    }).show();
    AutoUpdater.quitAndInstall();
  } else {
    sendUpdateMessage('downloaded')
  }
});


IpcMain.on("APP_UPDATE_check", (eve, data) => {
  checkForUpdates();
})
IpcMain.on("APP_UPDATE_check_delay", (eve, data) => {
  clearTimeout(_checkTimeout);
  _checkTimeout = setTimeout(() => {
    checkForUpdates();
  }, data && typeof data === "number" ? data : 300000)
})
IpcMain.on("APP_UPDATE_download", () => {
  AutoUpdater.downloadUpdate();
})
IpcMain.on("APP_UPDATE_install", () => {
  AutoUpdater.quitAndInstall();
})

let checkForUpdates = () => {
  AutoUpdater.checkForUpdates().then(() => {
    // cancellationToken = zxc.cancellationToken;
  });
}
let sendUpdateMessage = (type = 'text', obj) => {
  // console.log(type, obj)
  _mainWindow.win.webContents.send(`APP_UPDATE_${type}`, obj)
}

let _checkTimeout;
let _mainWindow;
let _startChecking = false;
let UpdateApp = (mainWindow) => {
  if (!mainWindow) {
    checkForUpdates()
  } else {
    _mainWindow = mainWindow;
    _startChecking = true;
  }

}

module.exports = UpdateApp