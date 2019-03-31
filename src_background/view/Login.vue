<template>
  <div class="container">
    <Card class="qr-card">
      <div class="qr">
        <img draggable="false" class="qr-img" :src="codeUrl">
        <img draggable="false" v-if="!!codeUrl" class="wx" src="../assets/wxlogo.png">
        <div v-if="isTimeOut">
          <Button type="dashed" @click="loadCode">二维码过期点击刷新</Button>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import userApi from '../webSocket/Api/user'
  import AgentMainReqs from '../../src_common/electron/AgentMainReqs'
  import APP_CONFIG from '../../src_common/electron/APP_CONFIG'

  const AgentReqs = AgentMainReqs.reqs;
  let loginStatusInterval;
  let loginStatusTimeout;
  export default {
    data() {
      let data = {
        isTimeOut: false,
        codeUrl: null,
      };
      return data;
    },
    methods: {
      ...mapMutations(['setUser']),
      clear() {
        clearInterval(loginStatusInterval);
        clearTimeout(loginStatusTimeout);
      },
      timeOut() {
        this.clear();
        this.isTimeOut = true;
      },
      loadCode() {
        this.clear();
        this.isTimeOut = false;
        userApi.login_qr_code()
          .then(res => {
            this.codeUrl = res.content.val;
            this.clear();
            loginStatusInterval = setInterval(() => this.loginStatus(), APP_CONFIG.LOGIN_QR_CODE_STATUS_CD || 5000)
            loginStatusTimeout = setTimeout(() => this.timeOut(), APP_CONFIG.LOGIN_QR_CODE_EXPIRED || 120000)
          }).catch(err => {
          console.log(err)
        })
      },
      loginStatus() {
        userApi.login_qr_code_status().then(res => {
          this.clear();
          this.login(res.content);
        }).catch(err => {
          if (err && err.msg === '用户未登录') {
            return;
          }
        })
      },
      login(user) {
        this.setUser(user);
        AgentReqs.loginAfter();
      }
    },
    mounted() {
      this.loadCode();
    }
  }
</script>
<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    user-select: none;

    .qr-card {
      position: relative;

      /deep/ .ivu-card-body {
        padding: 0;
      }

      .qr {
        position: relative;
        width: 221px;
        height: 221px;

        .qr-img {
          width: 100%;
        }

        .wx {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: auto;
        }

        > div {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.5);
          text-align: center;

          > button {
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            margin: auto;
          }
        }
      }
    }
  }
</style>
