<template>
  <div id="app">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/login">login</router-link>
    <router-view/>
    <UpdateApp v-if="!notElectron"></UpdateApp>
    <!--<UpdateApp></UpdateApp>-->
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>

<script>
  import UpdateApp from '@/components/UpdateApp.vue'


  export default {
    components: {
      UpdateApp
    },
    computed: {
      notElectron() {
        return !this.Electron;
      }
    },
    mounted() {
    }
  }


</script>