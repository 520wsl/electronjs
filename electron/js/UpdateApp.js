const Path = require('path');
const AutoUpdater = require("electron-updater").autoUpdater;
const {dialog, Notification} = require('electron');

console.log(process.platform + '_' + process.arch);

const APP_LOGO_IMG = Path.join(__dirname, '../' + global._APP_CONFIG_.APP_LOGO_IMG)

AutoUpdater.setFeedURL(global._APP_CONFIG_.AUTO_UPDATER_URL + '/' + process.platform + '_' + process.arch);
AutoUpdater.autoDownload = false;

AutoUpdater.on('error', function (error) {//更新错误
  new Notification({
    title: '更新失败！',
    body: error.toString(),
    icon: APP_LOGO_IMG
  }).show();
});

AutoUpdater.on('checking-for-update', function () {//开始检查更新
});

AutoUpdater.on('update-available', function (info) {//有更新
  if (info.detail) {
    info.detail = info.detail.replace(/\\n/g, '\n')
  }
  if (!global._MAIN_WINDOW_.win.isVisible() || _startChecking) {
    new Notification({
      title: `应用有新的版本>${info.version} 开始自动更新`,
      body: info.detail || '',
      icon: APP_LOGO_IMG
    }).show();
    AutoUpdater.downloadUpdate();
  } else {
    dialog.showMessageBox({
      // type: "error",//图标类型
      title: '软件更新',
      message: `应用有新的版本>${info.version}` + (info.detail ? `\n${info.detail}` : ''),
      defaultId: 0,
      buttons: ["立即更新", "5分钟后提醒"],//下方显示的按钮
      icon: APP_LOGO_IMG,//图标
      cancelId: -1//点击x号关闭返回值
    }, function (index) {
      switch (index) {
        case 0: {
          AutoUpdater.downloadUpdate();
          break;
        }
        case -1:
        case 1:
        default: {
          laterCheck()
          break;
        }
      }
    })
  }


});
AutoUpdater.on('update-not-available', function () {//已最新
  if (_notAvailableDialog) {
    _notAvailableDialog = false;
    dialog.showMessageBox({
      // type: "error",//图标类型
      title: '软件更新',
      message: '已是最新版',
      defaultId: 0,
      buttons: ["知道了"],//下方显示的按钮
      icon: APP_LOGO_IMG,//图标
    })
  }
});

AutoUpdater.on('download-progress', function (progressObj) {//下载进度
})

AutoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {//下载完成
  new Notification({
    title: '更新包下载完成，开始安装',
    icon: APP_LOGO_IMG
  }).show();
  AutoUpdater.quitAndInstall();
});

const laterCheck = () => {
  clearTimeout(_checkTimeout);
  _checkTimeout = setTimeout(() => {
    checkForUpdates();
  }, 300000)
}

const checkForUpdates = () => {
  AutoUpdater.checkForUpdates().then(() => {
    // cancellationToken = zxc.cancellationToken;
  });
}


let _checkTimeout;
let _startChecking = false;
let _notAvailableDialog = false
let UpdateApp = {
  init() {
    _startChecking = true;
    checkForUpdates()
  },
  check(notAvailableDialog = true) {
    _startChecking = false;
    _notAvailableDialog = notAvailableDialog;
    checkForUpdates()
  }
}


module.exports = UpdateApp
