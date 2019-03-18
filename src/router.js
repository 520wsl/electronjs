import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store'


Vue.use(Router)

let router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: (to, from, next) => {
        store.dispatch("isLogin", (isLogin) => {
          if (isLogin) {
            next({name: 'home'});
          } else {
            next();
          }
        })
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
});
router.beforeEach((to, from, next) => {
  store.dispatch("isLogin", (isLogin) => {
    if (!isLogin && to.name !== 'login') {
      next({name: 'login'});
      return
    }
    next();
  })
});
export default router;
