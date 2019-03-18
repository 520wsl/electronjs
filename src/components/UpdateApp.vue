<template>
  <div v-if="updateInfo">
    <Modal
      v-model="modal"
      :closable="closable"
      :footer-hide="true"
      :title="title"
      :mask-closable="false">
      <template v-if="mode === 0">
        <Row class="u-row">
          <i-col span="10">
            应用有新的版本：{{updateInfo.version}}
          </i-col>
          <i-col span="14" style="text-align: right">
            <ButtonGroup :size="buttonSize">
              <Button @click="update" :size="buttonSize" type="primary">
                立即更新({{countdown}})
              </Button>
              <Button @click="updateDelay" :size="buttonSize" type="warning">
                稍后提醒
              </Button>
            </ButtonGroup>
          </i-col>
        </Row>
      </template>
      <template v-else-if="mode === 1">
        <Progress class="u-progress-active" :stroke-color="'#2d8cf0'" :percent="100" status="active" hide-info/>
      </template>
      <template v-else-if="mode === 2">
        <Progress class="u-progress-active" :percent="percent" status="active" hide-info/>
      </template>
      <template v-else-if="mode === 3">
        <h3>下载完成，开始安装</h3>
      </template>
      <template v-else-if="mode === -1">
        <Alert type="error" show-icon>{{err}}</Alert>
      </template>
      <Collapse v-if="updateInfo.detail && mode !== -1" simple class="u-collapse">
        <Panel>
          详情
          <p slot="content" v-html="updateInfo.detail"></p>
        </Panel>
      </Collapse>
    </Modal>
  </div>
</template>
<style lang="scss">
  .u-row {
    line-height: 35px;
    margin-bottom: 10px;
  }

  .u-collapse {
    border-bottom: 0;
  }

  .u-progress-active {
    margin-bottom: 10px;

    .ivu-progress-bg:before {
      content: "";
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #fff;
      border-radius: 10px;
      -webkit-animation: ivu-progress-active 2s ease-in-out infinite;
      animation: ivu-progress-active 2s ease-in-out infinite;
    }
  }
</style>
<script>
  const COUNTDOWN = 30;
  let ipcRenderer;
  export default {
    data() {
      let data = {
        closable: false,
        mode: -99,
        countdownInterval: null,
        countdownBeforeTime: null,
        countdown: COUNTDOWN,
        buttonSize: 'large',
        modal: false,
        updateInfo: null,
        progressInfo: null,
        err: null,
        title: null,
        fileSize: 0,
        percent: 0,
      };
      return data;
    },
    methods: {
      showUpdate() {
        this.modal = true;
        this.countdownBeforeTime = new Date().getTime();
        this.mode = 0;
        this.title = null
        this.closable = false;
        clearInterval(this.countdownInterval)
        this.countdownInterval = setInterval(() => {
          let diff = new Date().getTime() - this.countdownBeforeTime;
          this.countdown = COUNTDOWN - parseInt(diff / 1000, 10);
          if (this.countdown <= 0) {
            this.countdown = 0;
            this.update();
          }
        }, 1000)
      },
      error() {
        this.modal = true;
        this.mode = -1;
        this.title = "更新出错"
        this.closable = true;
      },
      update() {
        this.modal = true;
        this.mode = 1;
        clearInterval(this.countdownInterval);
        this.title = `下载中-${this.fileSize}MB`
        ipcRenderer.send("APP_UPDATE_download");
      },
      updateDelay() {
        this.modal = false;
        ipcRenderer.send("APP_UPDATE_check_delay", 300000);
      },
      progress() {
        this.modal = true;
        this.mode = 2;
        let second = ((this.progressInfo.bytesPerSecond || 0) / 1024).toFixed(2);
        this.title = `下载中-${((this.progressInfo.transferred || 0) / 1048576).toFixed(2)}/${this.fileSize}mb-${second >= 1024 ? second / 1024 + 'mb' : second + 'kb'}/s`
        this.percent = (this.progressInfo.percent || 0).toFixed(2);
      },
      downloaded() {
        this.modal = true;
        this.mode = 3;
        this.title = null;
        ipcRenderer.send("APP_UPDATE_install");
      }
    },
    mounted() {
      ipcRenderer = this.Electron.ipcRenderer;
      ipcRenderer.send("APP_UPDATE_check");

      ipcRenderer.on("APP_UPDATE_available", (event, json) => {
        this.updateInfo = json;
        this.fileSize = ((this.updateInfo.files || [{size: 0}])[0].size / 1048576).toFixed(2);
        if (this.updateInfo._startChecking) {
          this.update();
        } else {
          this.showUpdate();
        }
      });
      ipcRenderer.on("APP_UPDATE_error", (event, err) => {
        this.err = err;
        this.error();
      });
      ipcRenderer.on("APP_UPDATE_progress", (event, json) => {
        this.progressInfo = json || {};
        this.progress()
      });
      ipcRenderer.on("APP_UPDATE_downloaded", () => {
        this.downloaded();
      });
    },
    destroyed() {
      ipcRenderer.removeListener("APP_UPDATE_available");
      ipcRenderer.removeListener("APP_UPDATE_error");
      ipcRenderer.removeListener("APP_UPDATE_progress");
      ipcRenderer.removeListener("APP_UPDATE_downloaded");
    }
  }
</script>