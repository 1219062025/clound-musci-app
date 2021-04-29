import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Discover = () => import(/* webpackChunkName: "about" */ 'views/discover/Discover.vue')

const routes = [
  {
    path: '/',
    name: 'Discover',
    component: Discover
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
