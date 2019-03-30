const Actions = require('./Actions.js')
const cmds = {
  exit(__, res) {
    Actions.exit();
    res.s();
  },
  toHome(__, res) {
    Actions.toHome()
    res.s();
  },
  loginAfter(__, res) {
    Actions.toHome()
    res.s();
  }
}

module.exports = cmds
