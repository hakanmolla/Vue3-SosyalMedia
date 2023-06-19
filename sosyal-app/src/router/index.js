import { createRouter, createWebHistory } from 'vue-router'
import {auth} from '../firebase/config'
import HomeView from '../views/HomeView.vue'
import login from '../views/login.vue'
import share from '../views/share.vue'
import browse from '../views/Browse.vue'

const KullaniciKontrol=(to,from,next)=>{
  let kullanici=auth.currentUser;
  if (!kullanici){
    next({name:'login'})
  }else{
    next()
  }
}



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  ,
  {
    path: '/share',
    name: 'share',
    component: share,
    beforeEnter: KullaniciKontrol
  },
  {
    path: '/browse/:id',
    name: 'browse',
    component: browse
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
