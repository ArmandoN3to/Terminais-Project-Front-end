<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Definimos as propriedades que o componente aceitará
interface Props {
  open: boolean
  title: string
  message: string
  type?: 'alert' | 'confirm'
}
const props = withDefaults(defineProps<Props>(), {
  type: 'alert',
})

// Definimos os eventos que o componente pode emitir (enviar de volta)
const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('close')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ props.title }}</DialogTitle>
        <DialogDescription>
          {{ props.message }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button v-if="props.type === 'confirm'" variant="outline" @click="emit('close')">
          Cancelar
        </Button>
        <Button @click="props.type === 'confirm' ? emit('confirm') : emit('close')">
          {{ props.type === 'confirm' ? 'Confirmar' : 'Fechar' }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>