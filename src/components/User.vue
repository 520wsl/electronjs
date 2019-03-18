<template>
  <div>
    <p>id:{{userId}}</p>
    <p>nick:{{nick}}</p>
    <p></p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        userId: state => state.user.userId,
        nick: state => state.user.nick,
      })
    },
    data() {
      let data = {};
      return data;
    },
    mounted() {
    }
  }
</script>