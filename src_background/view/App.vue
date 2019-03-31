<template>
  <div class="app-container">
    <!--<canvas id="appBgCanvas"></canvas>-->
    <Login v-if="inited && !user" class="login"></Login>
    <Card v-if="user" class="user">
      <User></User>
    </Card>
    <div class="head-btn">
      <!--<Icon type="ios-remove"/>-->
      <Icon type="ios-close" @click="exit"/>
    </div>
  </div>
</template>
<script>
  import Login from './Login'
  import User from './User'
  import {mapState, mapActions} from 'vuex'
  import AgentMainReqs from '../../src_common/electron/AgentMainReqs'
  // import StarrySky from '../js/StarrySky'

  const AgentReqs = AgentMainReqs.reqs;

  export default {
    components: {Login, User},
    data() {
      return {
        inited: false
      }
    },
    computed: {
      ...mapState({
        user: state => state.user,
      }),
    },
    methods: {
      ...mapActions(['isLogin']),
      exit() {
        AgentReqs.exit();
      }
    },
    mounted() {
      // StarrySky(document.getElementById("appBgCanvas"))
      this.isLogin(() => {
        this.inited = true;
      })
    }
  }
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent !important;
  }

  body {
    overflow: hidden;
  }
</style>
<style scoped lang="scss">

  .app-container {
    -webkit-app-region: drag;
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/login-bg.png");
      opacity:0.879;
    background-size: 100% 100%;
    #appBgCanvas{
      position: absolute;
      width: 100%;
      height: 100%;
    }
    *:not(#appBgCanvas) {
      -webkit-app-region: no-drag;
    }

    .head-btn {
      position: absolute;
      right: 10px;
      top: 0;
      color: #fff;
      font-size: 36px;
      text-align: right;
      user-select: none;
    }

    .user {
      width: 220px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      margin: auto;
    }

    .login {
      width: 223px;
      height: 223px;
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      margin: auto;
    }



  }
</style>
