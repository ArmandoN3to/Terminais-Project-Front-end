import { createRouter, createWebHistory } from 'vue-router'
 import CompanyRegistration from '../pages/CompanyRegistration.vue'
 import Dashboard from '../pages/Dashboard.vue'
 import Login from '../pages/Login.vue'
 import auth from '@/store/auth'

 const routes = [
   {
     path: '/login',
     name: 'Login',
     component: Login
   },
   {
     path: '/',
     name: 'Dashboard',
     component: Dashboard,
     meta: { requiresAuth: true }
   },
   {
     path: '/register',
     name: 'Register',
     component: CompanyRegistration,
     meta: { requiresAuth: true }
   }
 ]

 const router = createRouter({
   history: createWebHistory(),
   routes
 })

 router.beforeEach((to, from, next) => {
   if (to.meta.requiresAuth && !auth.isAuthenticated.value) {
     next('/login')
   } else {
     next()
   }
 })

 export default router