import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'

const routes = [
  { 
    path: '/', 
    component: Home,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('user')) {
        next('/login')
      } else {
        next()
      }
    }
  },
  { path: '/about', component: About },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router