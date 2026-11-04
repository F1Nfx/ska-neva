<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
const isLoading = ref(false)

async function handleLogin() {
  isLoading.value = true
  errorMsg.value = ''

  try {
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка входа')
    }

    // Сохраняем токен, чтобы браузер запомнил, что мы вошли
    localStorage.setItem('admin_token', data.token)
    
    // Перекидываем на страницу админки (пока просто на главную)
    router.push('/admin')

  } catch (error: any) {
    errorMsg.value = error.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center bg-ska-navy px-6">
    <div class="w-full max-w-md bg-gradient-to-br from-[#0A1425] to-[#0F2444] p-8 rounded-2xl border border-ska-blue/30 shadow-2xl">
      
      <div class="text-center mb-8">
        <h1 class="text-ska-white text-3xl font-black uppercase tracking-wide">Вход в панель</h1>
        <p class="text-ska-silver/60 text-sm mt-2">Только для персонала клуба</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-ska-silver/80 text-xs font-bold uppercase tracking-wider mb-2">Логин</label>
          <input v-model="username" type="text" required placeholder="admin" class="w-full bg-ska-navy/60 border border-ska-blue/50 rounded-lg px-4 py-3 text-ska-white focus:outline-none focus:border-ska-red transition-colors"/>
        </div>

        <div>
          <label class="block text-ska-silver/80 text-xs font-bold uppercase tracking-wider mb-2">Пароль</label>
          <input v-model="password" type="password" required placeholder="••••••••" class="w-full bg-ska-navy/60 border border-ska-blue/50 rounded-lg px-4 py-3 text-ska-white focus:outline-none focus:border-ska-red transition-colors"/>
        </div>

        <div v-if="errorMsg" class="bg-ska-red/20 border border-ska-red/50 text-ska-red text-sm px-4 py-3 rounded-lg text-center">
          {{ errorMsg }}
        </div>

        <button type="submit" :disabled="isLoading" class="w-full bg-ska-red hover:bg-red-700 text-ska-white font-bold text-sm uppercase tracking-wider py-3.5 rounded-lg transition-all shadow-lg shadow-ska-red/30 disabled:opacity-50">
          {{ isLoading ? 'Загрузка...' : 'Войти' }}
        </button>
      </form>

    </div>
  </div>
</template>