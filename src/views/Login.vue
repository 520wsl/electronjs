<template>
  <div>
    <WebLogin v-if="notElectron"></WebLogin>
    <ElectronLogin v-else></ElectronLogin>
  </div>
</template>

<script>
  import WebLogin from './WebLogin'
  import ElectronLogin from './ElectronLogin'

  export default {
    components: {WebLogin, ElectronLogin},
    computed: {
      notElectron() {
        return !this.Electron;
      },
    }
  }
</script>
<style scoped lang="scss">

</style>
