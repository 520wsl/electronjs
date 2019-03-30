const cmds = {
  toHome(__, res) {
    global._MAIN_WINDOW_.toHome()
    res.s();
  }
}

module.exports = cmds
