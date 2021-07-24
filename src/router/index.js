import Vue from 'vue'
import VueRouter from 'vue-router'
import MyFleet from '../views/MyFleet.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MyFleet',
    component: MyFleet
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
