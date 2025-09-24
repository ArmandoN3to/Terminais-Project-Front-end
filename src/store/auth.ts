import { reactive, computed } from 'vue'
 import router from '@/router'

 const state = reactive({
   token: localStorage.getItem('token') || null,
 })

 function login(token: string) {
   state.token = token
   localStorage.setItem('token', token)
   router.push('/')
 }

 function logout() {
   state.token = null
   localStorage.removeItem('token')
   router.push('/login')
 }

 const isAuthenticated = computed(() => !!state.token)

 export default {
   state,
   login,
   logout,
   isAuthenticated,
 }