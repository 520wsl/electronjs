<template>
  <div class="app-container">
    <div class="bg drag"></div>
    <canvas id="appBgCanvas" class="bg-canvas drag"></canvas>
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
  import StarrySky from '../js/StarrySky'

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
      StarrySky(document.getElementById("appBgCanvas")).run()
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

  .loader {
    width: 100%;
    height: 100%;
    font-size: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader .face {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: animate 3s linear infinite;
  }

  .loader .face:nth-child(1) {
    width: 100%;
    height: 100%;
    color: #4188FF;
    border-color: currentColor transparent transparent currentColor;
    border-width: 0.2em 0.2em 0em 0em;
    --deg: -45deg;
    animation-direction: normal;
  }

  .loader .face:nth-child(2) {
    width: 70%;
    height: 70%;
    color: #FF9B1B;
    border-color: currentColor currentColor transparent transparent;
    border-width: 0.2em 0em 0em 0.2em;
    --deg: -135deg;
    animation-direction: reverse;
  }

  .loader .face .circle {
    position: absolute;
    width: 50%;
    height: 0.1em;
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: rotate(var(--deg));
    transform-origin: left;
  }

  .loader .face .circle::before {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    content: '';
    width: 1em;
    height: 1em;
    background-color: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 2em,
    0 0 4em,
    0 0 6em,
    0 0 8em,
    0 0 10em,
    0 0 0 0.5em rgba(255, 255, 0, 0.1);
  }

  @keyframes animate {
    to {
      transform: rotate(1turn);
    }
  }


</style>
<style scoped lang="scss">

  .app-container {
    -webkit-app-region: drag;
    position: relative;
    width: 100%;
    height: 100%;

    .drag {
      -webkit-app-region: drag;
    }

    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url("../assets/login-bg.png");
      opacity: 0.879;
      background-size: 100% 100%;
    }

    .bg-canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.879;
    }

    *:not(.drag) {
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
