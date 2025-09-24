<script setup lang="ts">
import { ref } from 'vue'
import auth from '@/store/auth'
import apiClient from '@/api'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const response = await apiClient.post('http://localhost:8080/api/auth/login', {
      username: username.value,
      password: password.value,
    })
    
    //if login is successful, store the token and redirect
    auth.login(response.data.token)

  } catch (error: any) {
    errorMessage.value = 'Usuário ou senha inválidos.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <Card class="w-full max-w-sm">
      <CardHeader>
        <CardTitle class="text-2xl">Login</CardTitle>
        <CardDescription>
          Insira suas credenciais para acessar o portal.
        </CardDescription>
      </CardHeader>
      <form @submit.prevent="handleLogin">
        <CardContent class="grid gap-4">
          <div class="grid gap-2">
            <Label for="username">Usuário</Label>
            <Input id="username" type="text" v-model="username" required />
          </div>
          <div class="grid gap-2">
            <Label for="password">Senha</Label>
            <Input id="password" type="password" v-model="password" required />
          </div>
          <div v-if="errorMessage" class="text-red-500 text-sm text-center">
            {{ errorMessage }}
          </div>
        </CardContent>
        <CardFooter>
          <Button class="w-full" :disabled="isLoading">
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>