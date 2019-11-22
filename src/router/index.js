import Vue from 'vue'
import VueRouter from 'vue-router'
const search  = () => import('../views/search.vue')
const playmovie  = () => import('../views/playmovie.vue')
const home  = () => import('../views/home.vue')
const homesearch  = () => import('../views/home/homesearch.vue')
const hotmovie  = () => import('../views/hotmovie.vue')
const my  = () => import('../views/my.vue')
const register  = () => import('../views/register.vue')
const change  = () => import('../views/change/change.vue')
const headimg  = () => import('../views/change/headimg.vue')
// import playmovie from '../views/playmovie.vue'
Vue.use(VueRouter)

const routes = [
  { path:'/quit',redirect:'/'  },
  { path:'/search',component: search  },
  { path:'/hotmovie',component: hotmovie  },
  { path:'/playmovie/:id',component: playmovie  },
  { path:'/',component: home  },
  { path:'/home/homesearch',component: homesearch  },
  { path:'/my',name:'my',component: my  },
  { path:'/register',component: register  },
  { path:'/change',name:'change',component: change  },
  // { path:'/changed/:url',component: change },
  { path:'/headimg',component: headimg }
  
]

const router = new VueRouter({
  routes
})

export default router
