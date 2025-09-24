<script setup lang="ts">
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <div class="p-8">
    <Card>
      <CardHeader>
        <CardTitle>Bem-vindo ao Portal!</CardTitle>
        <CardDescription>Status do seu cadastro</CardDescription>
      </CardHeader>
      <CardContent>
        <p>✅ Seu cadastro foi enviado com sucesso e agora está **aguardando aprovação** pela nossa equipe.</p>
        <p class="mt-2 text-sm text-gray-600">Você será notificado assim que houver uma atualização.</p>
      </CardContent>
    </Card>
  </div>
</template>