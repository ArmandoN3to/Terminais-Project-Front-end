<script setup lang="ts">
import { ref, onMounted } from 'vue'
import apiClient from '@/api'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const companies = ref<any[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await apiClient.get('/api/companies')
    companies.value = response.data
  } catch (error) {
    console.error("Erro ao buscar empresas:", error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="p-8">
    <Card>
      <CardHeader class="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Administração de Empresas</CardTitle>
          <CardDescription>Visualize e gerencie todas as empresas cadastradas.</CardDescription>
        </div>
        <RouterLink to="/register">
          <Button>Novo Cadastro (+)</Button>
        </RouterLink>
      </CardHeader>
      <CardContent>
        <div v-if="isLoading">Carregando...</div>
        <Table v-else>
          <TableHeader>
            <TableRow>
              <TableHead>Razão Social / Nome</TableHead>
              <TableHead>CNPJ / CPF</TableHead>
              <TableHead>Perfil</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="company in companies" :key="company.id">
              <TableCell>{{ company.corporateName || company.name }}</TableCell>
              <TableCell>{{ company.cnpj || company.cpf || company.foreignId }}</TableCell>
              <TableCell>{{ company.profile }}</TableCell>
              <TableCell>
                <span :class="company.status === 'APPROVED' ? 'text-green-600' : 'text-yellow-600'">
                  {{ company.status }}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
</template>