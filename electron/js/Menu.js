const {Menu} = require('electron')
const AgentReqs = require('./AgentReqs.js')

const xxbBase = () => global._APP_CONFIG_.XXB_WEB_BASE;
const webWin = () => global._MAIN_WINDOW_.win;
const toXxb = (url, state) => AgentReqs.otherSysLoginUrl(xxbBase() + url, state).then(loginUrl => {
  webWin().loadURL(loginUrl);
})
const toXxbPar = (par, state) => toXxb('?par=' + par, state)

const template = [

  {
    label: 'shouye',
    click() {
      global._MAIN_WINDOW_.toHome()
    }
  },
  {
    label: '查排名',
    click() {
      toXxbPar('cGFnZU5hbWUlM0RjaGVja1Jhbms=')
    }
  },
  {
    label: '我的服务',
    click() {
      toXxbPar('cGFnZU5hbWUlM0RwZXJzb25hbFNlcnZpZQ%3D%3D')
    }
  },
  {
    label: '找客服',
    submenu: [
      {
        label: '找运营专员',
        click() {
          toXxbPar('d29ya09yZGVyVHlwZSUzZDUlMjZwYWdlTmFtZSUzZGFkZEJpbGw=')
        }
      },
      {
        label: '找运客户主管',
        click() {
          toXxbPar('d29ya09yZGVyVHlwZSUzRDIlMjZwYWdlTmFtZSUzRGFkZEJpbGw=')
        }
      },
      {
        label: '找美工专员',
        click() {
          toXxbPar('d29ya09yZGVyVHlwZSUzZDMlMjZwYWdlTmFtZSUzZGFkZEJpbGw=')
        }
      },
      {
        label: '投诉建议',
        click() {
          toXxbPar('dHlwZSUzZGNvbXBsYWludHNTdWdnZXN0aW9ucyUyNnBhZ2VOYW1lJTNkYWRkQmlsbA==')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(template)

module.exports = menu;
