<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { LayoutDashboard, FilePlus2 } from 'lucide-vue-next'
import auth from '@/store/auth'

console.log('Estado de autenticação na Sidebar:', auth.state)

function handleLogout() {
  auth.logout() 
}
</script>

<template>
  <aside class="w-64 bg-gray-800 text-white flex flex-col">
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-xl font-bold">SuperTerminais</h1>
    </div>
    <nav class="flex-1 p-2 space-y-2">
      <RouterLink
        to="/"
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
        active-class="bg-gray-900"
      >
        <LayoutDashboard class="h-5 w-5" />
        <span>Dashboard</span>
      </RouterLink>
      <RouterLink
        to="/register"
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
        active-class="bg-gray-900"
      >
        <FilePlus2 class="h-5 w-5" />
        <span>Novo Cadastro</span>
      </RouterLink>

      <RouterLink
        to="/companies"
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
        active-class="bg-gray-900"
      >
        <Building2 class="h-5 w-5" />
        <span>Administração</span>
      </RouterLink>


    </nav>
    <div class="p-2 border-t border-gray-700">
      <button @click="handleLogout" class="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
        <LogOut class="h-5 w-5" />
        <span>Sair</span>
      </button>
    </div>

  </aside>
</template>