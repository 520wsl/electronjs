const isWin = process.platform === 'win32';
const isDev = process.argv.indexOf('-run-dev') > -1
if (isDev) {
  process.env.NODE_ENV = "development";
} else {
  process.env.NODE_ENV = "production";
}
if (process.argv && (process.argv[0].endsWith('node') || process.argv[0].endsWith('node.exe'))) {
  if (isDev) {
    const {exec, spawn} = require('child_process');
    const colors = require('colors');
    colors.setTheme({
      data: 'blue',
      info: 'green',
      warn: 'yellow',
      debug: 'magenta',
      error: 'red'

    });
    let electronRun = false;
    let killGid = `ps -eo pgid,pid | grep ${process.pid} | sed  '1s/${process.pid}//g' | sed '1s/ //' | xargs pkill -g`;
    let processList = [];
    let electron = require('electron');
    let spawnP;
    if (isWin) {
      spawnP = {
        shell: true
      }
    }
    let runCmd = (name, cmd, param, fn) => {
      let cmdProcess = spawn(cmd, param, spawnP);
      processList.push(cmdProcess);
      console.log(name + "-pid:" + cmdProcess.pid);
      cmdProcess.stdout.on('data', function (data) {
        data = data.toString();
        fn && fn(data);
        if (name === 'vue' && data.indexOf('Compiled successfully') > -1) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          console.log((name + ':\n' + data).info);
        } else {
          console.log(name + ':\n' + data);

        }
      });

      cmdProcess.stderr.on('data', function (data) {
        data = data.toString();
        // eslint-disable-next-line no-control-regex
        if (!data || data.replace(/^[\s\uFEFF\xA0\x00-\x1f]+|[\s\uFEFF\xA0\x00-\x1f]+$/g, "").length < 1) {
          return;
        }
        if (name === 'vue' && data.indexOf("%") > -1) {
          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write((name + ':' + data).info);
        } else {
          console.log((name + ':\n' + data).error);
        }

      });

      cmdProcess.on('exit', function (code, signal) {
        console.log((name + ':' + code).debug);

        if (process.platform === 'linux') {
          exec(killGid);
        } else {
          processList.forEach(pro => pro.kill(9));
          process.exit();
        }
      });
    };
    runCmd('vue', 'vue-cli-service', ['serve'], (data) => {
      let text = data.toString();
      if ((/- Local:/gi).test(text) && !electronRun) {
        electronRun = true;
        let url = text.replace(/[\s\S]*- Local:[\s\S]*(http\S*)[\s\S]*/gi, '$1');
        runCmd('electron', electron.toString(), ['.', '-run-dev', '-url:' + url]);
      }
    });
  }

} else {
  require('./main.js')
}