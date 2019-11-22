import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import My from '../views/My.vue'
import change from '../views/change/change.vue'
import headimg from '../views/change/headimg.vue'
const search  = () => import('../views/search.vue')
const playmovie  = () => import('../views/playmovie.vue')
const home  = () => import('../views/home.vue')
const homesearch  = () => import('../views/home/homesearch.vue')
const hotmovie  = () => import('../views/hotmovie.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/my',
    name: "My",
    component: My
  },
  {
    path: '/my/change/',
    name: "change",
    component: change
  },
  {
    path: '/my/change/headimg',
    component: headimg
  },
  { path: '/search', component: search },
  { path: '/hotmovie', component: hotmovie },
  { path: '/playmovie/:id', component: playmovie },
  { path: '/', component: home },
  { path: '/home/homesearch', component: homesearch }
]

const router = new VueRouter({
  routes
})

export default router
