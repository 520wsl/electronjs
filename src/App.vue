<template>
    <div id="app">
        <!--<router-link to="/">Home</router-link>-->
        <!--|-->
        <!--<router-link to="/login">login</router-link>-->
        <router-view/>
        <UpdateApp v-if="!notElectron"></UpdateApp>
        <!--<UpdateApp></UpdateApp>-->
    </div>
</template>

<style lang="scss">
    body,
    html {
        background-color: #f4f4f4;
        height: 100%;
        overflow: hidden;
    }

    body,
    ul,
    p,
    a,
    div,
    img {
        margin: 0;
        padding: 0;
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        /* color: #5a5a5a; */
        cursor: pointer;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        font-size: 14px;
        height: 100%;
        background-color: #f4f4f4;
    }

    #nav {
        padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

    &
    .router-link-exact-active {
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