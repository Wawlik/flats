import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import favs from '../views/favs.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/flats/',
    name: 'Home',
    component: Home
  },
  {
    path: '/flats/favs',
    name: 'favs',
    component: favs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
