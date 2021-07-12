import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Discover = () => import(/* webpackChunkName: "about" */ 'views/discover/Discover.vue')

const Search = () => import(/* webpackChunkName: "about" */ 'views/search/Search.vue')
const Single = () => import(/* webpackChunkName: "about" */ 'views/search/children/Single.vue')
const Synthesize = () => import(/* webpackChunkName: "about" */ 'views/search/children/Synthesize.vue')

const routes = [
  {
    path: '/',
    name: 'Discover',
    component: Discover
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    redirect: '/search/single',
    children: [
      {
        path: 'synthesize',
        name: 'synthesize',
        component: Synthesize
      },
      {
        path: 'single',
        name: 'single',
        component: Single
      },
    ]
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
