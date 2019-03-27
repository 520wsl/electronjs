const {Menu} = require('electron')
const host = "http://172.30.34.114:8081/personal/index?code=34077706522071040&state=electron"

const template = [
    {
        label: '查排名',
        click() {
            // global._MAIN_WINDOW_ && global._MAIN_WINDOW_.win.loadURL("http://172.30.34.114:8081/personal/index?par=cGFnZU5hbWUlM0RwZXJzb25hbFNlcnZpZQ%3D%3D&code=34077706522071040&state=electron");
            const win = global._MAIN_WINDOW_.win;
            const path = global._MAIN_WINDOW_.PATH;
            if ((/^https?/).test(path)) {
                win.loadURL(path);
            } else {
                win.loadFile(path);
            }
        }
    },
    {
        label: '我的服务',
        click() {
            global._MAIN_WINDOW_ && global._MAIN_WINDOW_.win.loadURL(host + "&par=cGFnZU5hbWUlM0RwZXJzb25hbFNlcnZpZQ%3D%3D");

        }
    },
    {
        label: '找客服',
        submenu: [
            {
                label: '找运营专员',
                click() {
                    global._MAIN_WINDOW_ && global._MAIN_WINDOW_.win.loadURL(host + "&par=d29ya09yZGVyVHlwZSUzZDUlMjZwYWdlTmFtZSUzZGFkZEJpbGw=");
                }
            },
            {
                label: '找运客户主管',
                click() {
                    global._MAIN_WINDOW_ && global._MAIN_WINDOW_.win.loadURL(host + "&par=d29ya09yZGVyVHlwZSUzRDIlMjZwYWdlTmFtZSUzRGFkZEJpbGw=");
                }
            },
            {
                label: '找美工专员',
                click() {
                    global._MAIN_WINDOW_ && global._MAIN_WINDOW_.win.loadURL(host + "&par=d29ya09yZGVyVHlwZSUzZDMlMjZwYWdlTmFtZSUzZGFkZEJpbGw=");
                }
            },
            {
                label: '投诉建议',
                click() {
                    global._MAIN_WINDOW_ && global._MAIN_WINDOW_.win.loadURL(host + "&par=dHlwZSUzZGNvbXBsYWludHNTdWdnZXN0aW9ucyUyNnBhZ2VOYW1lJTNkYWRkQmlsbA==");
                }
            }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click() {
                    global._MAIN_WINDOW_ && global._MAIN_WINDOW_.win.loadURL("https://www.baidu.com");

                }
            }
        ]
    }
]

const menu = Menu.buildFromTemplate(template)

module.exports = menu;
