<template>
  <div>
    <img :src="codeUrl">
    <Button type="warning" @click="login()">虚假登录</Button>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'

  let loginStatusInterval;
  export default {
    data() {
      let data = {
        codeUrl: null,
        redisKey: null,
      };
      return data;
    },
    methods: {
      ...mapActions(['setUser']),
      loadCode() {
        clearInterval(loginStatusInterval);
        this.api.user.loginForQRCode().then(res => {
          let data = res.data;
          this.codeUrl = data.codeUrl;
          this.redisKey = data.redisKey;
          loginStatusInterval = setInterval(() => this.loginStatus(), 5000)
        }).catch(err => {
          console.log(err)
        })
      },
      loginStatus() {
        this.api.user.loginForQRCodeStatus(this.redisKey).then(data => {
          clearInterval(loginStatusInterval);
          this.login(data.data);
        }).catch(data => {
          if (data && data.msg === '用户未登录') {
            return;
          }
        })
      },
      login(userId = this.Utils.getUUID(16, 16)) {
        this.setUser({
          userId: userId,
          cb: () => {
            this.$router.push({name: 'home'})
          }
        });
      }
    },
    mounted() {
      this.loadCode();
    }
  }
</script>