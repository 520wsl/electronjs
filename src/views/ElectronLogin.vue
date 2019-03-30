<template>
  <div class="container">
    <div class="qr">
      <img :src="codeUrl">
      <div v-if="isTimeOut">
        <Button type="dashed" @click="loadCode">二维码过期点击刷新</Button>
      </div>
    </div>
    <!--<Button type="warning" @click="login()">虚假登录</Button>-->
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'

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
        this.BgReq.webSocketCmd('user', 'login_qr_code', {})
          .then(res => {
            this.codeUrl = res.content.val;
            this.clear();
            loginStatusInterval = setInterval(() => this.loginStatus(), 3000)
            loginStatusTimeout = setTimeout(() => this.timeOut(), 180000)
          }).catch(err => {
          console.log(err)
        })
      },
      loginStatus() {
        this.BgReq.webSocketCmd('user', 'login_qr_code_status', {}).then(res => {
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
        this.$router.push({name: 'home'})

      }
    },
    mounted() {
      this.loadCode();
    }
  }
</script>
<style scoped lang="scss">
  .container {
    .qr {
      position: relative;
      width: 320px;
      height: 320px;

      > img {
        width: 100%;
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
</style>
