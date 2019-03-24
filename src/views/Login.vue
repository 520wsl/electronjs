<template>
  <div>
    <img :src="codeUrl">
    <!--<Button type="warning" @click="login()">虚假登录</Button>-->
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import UserReq from '../js/webSocket/Api/user'

  let loginStatusInterval;
  let loginStatusTimeout;
  export default {
    data() {
      let data = {
        codeUrl: null,
      };
      return data;
    },
    methods: {
      ...mapMutations(['setUser']),
      loadCode() {
        clearInterval(loginStatusInterval);
        clearTimeout(loginStatusTimeout);
        UserReq.login_qr_code().then(res => {

          this.codeUrl = res.content.val;
          loginStatusInterval = setInterval(() => this.loginStatus(), 5000)
          loginStatusTimeout = setTimeout(() => this.loadCode(), 600000)
        }).catch(err => {
          console.log(err)
        })
      },
      loginStatus() {
        UserReq.login_qr_code_status().then(res => {
          clearInterval(loginStatusInterval);
          clearTimeout(loginStatusTimeout);
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