import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import index from '../native/demo/index.vue'
import nav from '../native/demo/nav.vue'
import navigator from '../native/demo/module/navigator.vue'
import drawer from '../native/demo/component/drawer.vue'
import host from '../native/demo/component/host.vue'
import mainpage from '../native/busi/tab/mainpage.vue'


Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/busi/tab/mainpage.js',
      name: 'mainpage',
      component: mainpage,

    },
    {
      path: '/demo/index.js',
      name: 'index',
      component: index,
    },
    {
      path: '/demo/nav.js',
      name: 'nav',
      component: nav
    },
    {
      path: '/demo/module/navigator.js',
      name: 'navigator',
      component: navigator
    },
    {
      path: '/demo/component/drawer.js',
      name: 'drawer',
      component: drawer,

    },
    {
      path: '/demo/component/host.js',
      name: 'host',
      component: host
    }
  ]
})
