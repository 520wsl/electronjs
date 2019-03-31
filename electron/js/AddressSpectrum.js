const AgentReqs = require('./AgentReqs.js')

const xxbBase = () => global._APP_CONFIG_.XXB_WEB_BASE;
const webWin = () => global._MAIN_WINDOW_.win;
const toXxb = (url) => AgentReqs.otherSysLoginUrl(xxbBase() + url, 'workorder', 'electron').then(loginUrl => {
    webWin().loadURL(loginUrl);
})
const toXxbPar = (par) => toXxb('?par=' + par)

const Address = {
    '查排名': {
        '排名记录': () => toXxbPar('cGFnZU5hbWUlM0RjaGVja1Jhbms='),
        '在线排名': () => toXxbPar('cGFnZU5hbWUlM0RteUNoZWNrUmFuaw==')
    },
    '我的服务': () => toXxbPar('cGFnZU5hbWUlM0RwZXJzb25hbFNlcnZpZQ%3D%3D'),
    '找客服': {
        '找运营专员': () => toXxbPar('d29ya09yZGVyVHlwZSUzZDUlMjZwYWdlTmFtZSUzZGFkZEJpbGw='),
        '找运客户主管': () => toXxbPar('d29ya09yZGVyVHlwZSUzRDIlMjZwYWdlTmFtZSUzRGFkZEJpbGw='),
        '找美工专员': () => toXxbPar('d29ya09yZGVyVHlwZSUzZDMlMjZwYWdlTmFtZSUzZGFkZEJpbGw='),
        '投诉建议': () => toXxbPar('dHlwZSUzZGNvbXBsYWludHNTdWdnZXN0aW9ucyUyNnBhZ2VOYW1lJTNkYWRkQmlsbA=='),
    }
}
Address._home_ = Address.查排名.排名记录;
module.exports = Address;
