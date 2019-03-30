const {Menu} = require('electron')
const AddressSpectrum = require('./AddressSpectrum.js')
const AgentReqs = require('./AgentReqs.js')
const Actions = require('./Actions.js')

const buildMenu = (items) => {
  let menus = [];
  for (let label in items) {
    if (!items.hasOwnProperty(label) || label.startsWith('_')) continue;
    let menu = {label};
    let item = items[label];
    switch (typeof item) {
      case "function": {
        menu.click = item;
        break;
      }
      case "object": {
        menu.submenu = buildMenu(item);
        break;
      }
    }
    menus.push(menu)
  }
  return menus;
}

let template = [
  {
    label: '系统',
    submenu: [
      {
        label: '登出',
        click() {
          AgentReqs.logout().then(() => {
            Actions.toBG();
          })
        }
      },
      {
        label: '退出',
        click() {
          Actions.exit();
        }
      },
    ]

  }
]

if (AddressSpectrum) {
  template = template.concat(buildMenu(AddressSpectrum))
}

const menu = Menu.buildFromTemplate(template)

module.exports = menu;
