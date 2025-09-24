<script setup lang="ts">
import { ref, computed } from 'vue'
import apiClient from '@/api'
import { useRouter } from 'vue-router'
import GenericModal from '@/components/ui/GenericModal.vue'
import auth from '@/store/auth'


// Importando os componentes do Shadcn
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { X } from 'lucide-vue-next'

// --- LÓGICA COMPLETA ---

const router = useRouter()

const modalState = ref({
  open: false,
  title: '',
  message: '',
  type: 'alert' as 'alert' | 'confirm',
  onConfirm: () => {},
})

function triggerModal(title: string, message: string, type: 'alert' | 'confirm' = 'alert', onConfirm?: () => void) {
  modalState.value = {
    open: true,
    title,
    message,
    type,
    onConfirm: onConfirm || (() => {}),
  }
}

function closeModal() {
  // Se a ação de confirmação existir (como no sucesso), execute-a
  if (modalState.value.onConfirm && modalState.value.type === 'alert') {
    modalState.value.onConfirm()
  }
  modalState.value.open = false
}

const personType = ref<'LEGAL_PERSON' | 'NATURAL_PERSON' | 'FOREIGN_PERSON'>('LEGAL_PERSON')
const formData = ref({
  tradeName: '',
  profile: null,
  directBilling: false,
  corporateName: '',
  cnpj: '',
  name: '',
  cpf: '',
  foreignId: '',
})
const file = ref<File | null>(null)
const isLoading = ref(false)

const isLegalPerson = computed(() => personType.value === 'LEGAL_PERSON')
const isNaturalPerson = computed(() => personType.value === 'NATURAL_PERSON')
const isForeignPerson = computed(() => personType.value === 'FOREIGN_PERSON')

const profiles = [
  { value: 'DISPATCHER', label: 'Despachante' },
  { value: 'BENEFICIARY', label: 'Beneficiário' },
  { value: 'CONSIGNEE', label: 'Consignatário' },
  { value: 'SHIPOWNER', label: 'Armador' },
  { value: 'CARGO_AGENT', label: 'Agente de Carga' },
  { value: 'TRANSPORTER', label: 'Transportadora' },
]

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) {
    file.value = null
    return
  }

  const selectedFile = target.files[0]
  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

  if (selectedFile.size > MAX_FILE_SIZE) {
    triggerModal('Arquivo inválido', 'Tamanho de arquivo não suportado. O máximo é 10MB.')
    target.value = ''
    return
  }

  const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg']
  if (!ALLOWED_TYPES.includes(selectedFile.type)) {
    triggerModal('Arquivo inválido', 'São válidos somente arquivos do tipo: pdf, png, jpg ou jpeg.')
    target.value = ''
    return
  }

  file.value = selectedFile
}

function promptRemoveFile() {
  triggerModal(
    'Remover arquivo',
    'Deseja realmente remover este arquivo?',
    'confirm',
    () => {
      file.value = null
      const fileInput = document.getElementById('file-upload') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      closeModal()
    }
  )
}

async function handleSubmit() {
   isLoading.value = true

   if (!file.value) {
     triggerModal('Aviso', 'É necessário enviar os arquivos obrigatórios para prosseguir')
     isLoading.value = false
     return
   }

   const payload = {
     companyType: personType.value,
     ...formData.value,
   }

   try {
    // 1. Cria a empresa
    const companyResponse = await apiClient.post('/api/companies', payload)
    const companyId = companyResponse.data.id

    // 2. ENVIA O ARQUIVO SOMENTE SE ELE EXISTIR
    if (file.value && companyId) {
      const fileFormData = new FormData()
      fileFormData.append('file', file.value)
      
      // A chamada de upload acontece dentro deste 'if'
      await apiClient.post(`/api/companies/${companyId}/documents`, fileFormData)

      
    }
    triggerModal('Sucesso', 'Empresa cadastrada com sucesso.', 'alert', () => {
       router.push('/')
     })
     

   } catch (error: any) {
     const backendMessage = error.response?.data?.error || 'Ocorreu um erro desconhecido.'
     triggerModal('Atenção', backendMessage)
   } finally {
     isLoading.value = false
   }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <Card class="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Cadastro de Empresa</CardTitle>
        <CardDescription>Preencha os dados abaixo para registrar uma nova empresa.</CardDescription>
      </CardHeader>
      <CardContent>
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <Label for="person-type">Tipo de Pessoa</Label>
            <Select v-model="personType">
              <SelectTrigger id="person-type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="LEGAL_PERSON">Pessoa Jurídica</SelectItem>
                  <SelectItem value="NATURAL_PERSON">Pessoa Física</SelectItem>
                  <SelectItem value="FOREIGN_PERSON">Pessoa Estrangeira</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div v-if="isLegalPerson" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <Label for="corporate-name">Razão Social</Label>
                <Input id="corporate-name" v-model="formData.corporateName" required />
              </div>
              <div>
                <Label for="cnpj">CNPJ</Label>
                <Input id="cnpj" v-model="formData.cnpj" required />
              </div>
            </div>
          </div>

          <div v-if="isNaturalPerson" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <Label for="name">Nome Completo</Label>
                <Input id="name" v-model="formData.name" required />
              </div>
              <div>
                <Label for="cpf">CPF</Label>
                <Input id="cpf" v-model="formData.cpf" required />
              </div>
            </div>
          </div>

          <div v-if="isForeignPerson" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <Label for="foreign-corporate-name">Razão Social</Label>
                <Input id="foreign-corporate-name" v-model="formData.corporateName" required />
              </div>
              <div>
                <Label for="foreign-id">Identificador Estrangeiro</Label>
                <Input id="foreign-id" v-model="formData.foreignId" required />
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <Label for="trade-name">Nome Fantasia</Label>
              <Input id="trade-name" v-model="formData.tradeName" required />
            </div>
            <div>
              <Label for="profile">Perfil</Label>
              <Select v-model="formData.profile">
                <SelectTrigger id="profile">
                  <SelectValue placeholder="Selecione um perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="p in profiles" :key="p.value" :value="p.value">
                      {{ p.label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label for="file-upload">Documento Comprobatório</Label>
            <div v-if="!file" class="mt-1">
              <Input id="file-upload" type="file" @change="handleFileChange" required />
            </div>
            <div v-else class="flex items-center justify-between mt-1 p-2 border rounded-md bg-gray-50">
              <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
              <Button type="button" variant="ghost" size="icon" @click="promptRemoveFile">
                <X class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div class="flex items-center space-x-2">
            <Checkbox id="direct-billing" v-model="formData.directBilling" />
            <Label for="direct-billing">Faturamento Direto</Label>
          </div>

        </form>
      </CardContent>
      <CardFooter>
        <Button class="w-full" :disabled="isLoading" @click="handleSubmit">
          {{ isLoading ? 'Salvando...' : 'Salvar Cadastro' }}
        </Button>
      </CardFooter>
    </Card>

    <GenericModal
      :open="modalState.open"
      :title="modalState.title"
      :message="modalState.message"
      :type="modalState.type"
      @close="closeModal"
      @confirm="modalState.onConfirm"
    />
  </div>
</template>