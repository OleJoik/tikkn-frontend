import { createRouter, createWebHistory } from 'vue-router'

import { getCurrentUser } from './Auth'

import HomeView from '../views/HomeView.vue'
const LoginView = () => import('../views/LoginView.vue')
const AboutView = () => import('../views/AboutView.vue')

const routes = [
  { path: '/', component: HomeView },
  { path: '/login', component: LoginView },
  { 
    path: '/about', 
    component: AboutView,
    meta:  {requiresAuth: true} 
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, _, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = await getCurrentUser()
  if (requiresAuth && !currentUser){
    next({path: '/login', query: {next: to.fullPath}});
  }else{
    next();
  }
});

export default router
