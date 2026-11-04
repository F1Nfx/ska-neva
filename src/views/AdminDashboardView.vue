<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('news')
const token = localStorage.getItem('admin_token')

// --- Управление новостями ---
const newsList = ref<any[]>([])
const isFormOpen = ref(false)
const isSubmitting = ref(false)

const form = ref({
  tag: 'Матч',
  title: '',
  excerpt: '',
  author: 'Пресс-служба клуба',
  icon: '⚽',
  gradient: 'from-ska-red via-[#8B0A1F] to-ska-navy',
  content: ''
})

async function fetchNews() {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/news')
  newsList.value = await res.json()
}

async function submitNews() {
  if (!form.value.title || !form.value.excerpt) return
  isSubmitting.value = true
  const contentArray = form.value.content.split('\n').filter(p => p.trim() !== '')

  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...form.value, content: contentArray })
    })
    if (!response.ok) throw new Error('Ошибка при сохранении')
    
    form.value.title = ''
    form.value.excerpt = ''
    form.value.content = ''
    isFormOpen.value = false
    await fetchNews()
  } catch (error) {
    alert('Ошибка: не удалось сохранить новость')
  } finally {
    isSubmitting.value = false
  }
}

// ВОТ ОНА, ОТДЕЛЬНО ОТ SUBMITNEWS
async function deleteNews(id: number) {
  if (!confirm('Вы уверены, что хотите удалить эту новость?')) return
  
  try {
    const response = await fetch(`http://localhost:3001/api/news/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    
    if (!response.ok) throw new Error()
    await fetchNews() // Обновляем список после удаления
  } catch (error) {
    alert('Ошибка при удалении новости')
  }
}

// --- Управление матчами и событиями ---
const matchesList = ref<any[]>([])
const expandedMatchId = ref<number | null>(null)

const eventForm = ref({
  minute: '',
  type: 'goal',
  isOurTeam: true,
  playerName: ''
})

async function fetchMatches() {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/matches')
  matchesList.value = await res.json()
}

async function updateScore(match: any) {
  try {
    const response = await fetch(`http://localhost:3001/api/matches/${match.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ homeScore: match.homeScore, awayScore: match.awayScore })
    })
    if (!response.ok) throw new Error()
    await fetchMatches()
    alert('Счет обновлен!')
  } catch (error) { alert('Ошибка обновления счета') }
}

function toggleEvents(matchId: number) {
  expandedMatchId.value = expandedMatchId.value === matchId ? null : matchId
  eventForm.value = { minute: '', type: 'goal', isOurTeam: true, playerName: '' }
}

async function addEvent(match: any) {
  if (!eventForm.value.minute || !eventForm.value.playerName) return alert('Заполните минуту и имя игрока')
  const ourTeamId = match.homeTeam.isOurTeam ? match.homeTeam.id : match.awayTeam.id
  const oppTeamId = match.homeTeam.isOurTeam ? match.awayTeam.id : match.homeTeam.id
  const teamId = eventForm.value.isOurTeam ? ourTeamId : oppTeamId

  try {
    const response = await fetch(`http://localhost:3001/api/matches/${match.id}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        minute: eventForm.value.minute,
        type: eventForm.value.type,
        teamId: teamId,
        playerName: eventForm.value.playerName
      })
    })
    if (!response.ok) throw new Error()
    eventForm.value.minute = ''
    eventForm.value.playerName = ''
    await fetchMatches()
  } catch (error) {
    alert('Ошибка при добавлении события')
  }
}

async function setFeaturedMatch(id: number) {
  try {
    await fetch(`http://localhost:3001/api/matches/${id}/feature`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    await fetchMatches()
    alert('Матч назначен главным на сайте!')
  } catch (error) {
    alert('Ошибка при выборе матча')
  }
}

// --- Управление игроками ---
const playersList = ref<any[]>([])
const isPlayerFormOpen = ref(false)

const playerForm = ref({
  name: '', number: '', position: 'Вратарь', age: '', height: '', weight: '',
  foot: 'Правый', birthplace: '', joinedAt: '2026', bio: ''
})

async function fetchPlayers() {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/players')
  playersList.value = await res.json()
}

async function submitPlayer() {
  if (!playerForm.value.name || !playerForm.value.number) return alert('Заполните имя и номер')
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + '/api/players', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(playerForm.value)
    })
    if (!response.ok) throw new Error()
    
    playerForm.value.name = ''
    playerForm.value.number = ''
    playerForm.value.bio = ''
    isPlayerFormOpen.value = false
    await fetchPlayers()
    alert('Игрок успешно добавлен!')
  } catch (error) {
    alert('Ошибка при добавлении игрока')
  }
}

async function deletePlayer(id: number) {
  if (!confirm('Вы уверены, что хотите удалить игрока?')) return
  try {
    await fetch(`http://localhost:3001/api/players/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    await fetchPlayers()
  } catch (error) {
    alert('Ошибка при удалении')
  }
}

// --- Управление таблицей ---
const standingsList = ref<any[]>([])

async function fetchStandings() {
  const res = await fetch(import.meta.env.VITE_API_URL + '/api/standings')
  standingsList.value = await res.json()
}

async function updateStanding(standing: any) {
  try {
    const response = await fetch(`http://localhost:3001/api/standings/${standing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        played: standing.played, wins: standing.wins, draws: standing.draws, losses: standing.losses,
        goalsFor: standing.goalsFor, goalsAgainst: standing.goalsAgainst, points: standing.points
      })
    })
    if (!response.ok) throw new Error()
    await fetchStandings()
    alert('Таблица обновлена!')
  } catch (error) {
    alert('Ошибка при обновлении таблицы')
  }
}

// --- ОБЩИЙ ONMOUNTED ---
onMounted(() => {
  fetchNews()
  fetchMatches()
  fetchPlayers()
  fetchStandings()
})

function logout() {
  localStorage.removeItem('admin_token')
  router.push('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-ska-navy flex">
    <!-- Боковая панель -->
    <aside class="w-64 bg-[#0A1425] border-r border-ska-blue/30 flex flex-col hidden md:flex">
      <div class="p-6 border-b border-ska-blue/30">
        <h2 class="text-ska-white font-black text-xl uppercase tracking-wider">Админка</h2>
        <p class="text-ska-silver/50 text-xs mt-1">ПФК «СКА-Нева»</p>
      </div>

      <nav class="flex-1 p-4 space-y-2">
        <button @click="activeTab = 'news'" class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors" :class="activeTab === 'news' ? 'bg-ska-red text-ska-white' : 'text-ska-silver hover:bg-ska-blue/20'">📰 Новости</button>
        <button @click="activeTab = 'matches'" class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors" :class="activeTab === 'matches' ? 'bg-ska-red text-ska-white' : 'text-ska-silver hover:bg-ska-blue/20'">⚽ Матчи</button>
        <button @click="activeTab = 'players'" class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors" :class="activeTab === 'players' ? 'bg-ska-red text-ska-white' : 'text-ska-silver hover:bg-ska-blue/20'">👥 Игроки</button>
        <button @click="activeTab = 'standings'" class="w-full text-left px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-colors" :class="activeTab === 'standings' ? 'bg-ska-red text-ska-white' : 'text-ska-silver hover:bg-ska-blue/20'">🏆 Таблица</button>
      </nav>
      
      <div class="p-4 border-t border-ska-blue/30">
        <button @click="logout" class="w-full px-4 py-3 bg-ska-red/20 text-ska-red border border-ska-red/50 hover:bg-ska-red hover:text-ska-white rounded-lg font-bold text-sm uppercase tracking-wider transition-colors">Выйти</button>
      </div>
    </aside>

    <!-- Контентная часть -->
    <main class="flex-1 p-6 lg:p-10">
      <div class="max-w-5xl mx-auto">
        
        <!-- Раздел Новости -->
        <div v-if="activeTab === 'news'">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-ska-white text-3xl font-black uppercase tracking-wide">Управление новостями</h1>
            <button @click="isFormOpen = !isFormOpen" class="px-6 py-2.5 bg-ska-red hover:bg-red-700 text-ska-white font-bold text-sm uppercase tracking-wider rounded-md transition-all">
              {{ isFormOpen ? 'Отменить' : '+ Добавить' }}
            </button>
          </div>

          <div v-if="isFormOpen" class="bg-[#0A1425] border border-ska-blue/50 p-6 rounded-2xl mb-8 space-y-4 shadow-xl">
            <h3 class="text-ska-white font-bold text-lg mb-4">Новая новость</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-ska-silver text-xs mb-1">Заголовок</label>
                <input v-model="form.title" type="text" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white focus:border-ska-red outline-none"/>
              </div>
              <div>
                <label class="block text-ska-silver text-xs mb-1">Тег</label>
                <select v-model="form.tag" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white focus:border-ska-red outline-none">
                  <option value="Матч">Матч</option>
                  <option value="Трансфер">Трансфер</option>
                  <option value="Интервью">Интервью</option>
                  <option value="Клуб">Клуб</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-ska-silver text-xs mb-1">Краткое описание (анонс)</label>
              <textarea v-model="form.excerpt" rows="2" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white focus:border-ska-red outline-none"></textarea>
            </div>
            <div>
              <label class="block text-ska-silver text-xs mb-1">Полный текст (каждый абзац с новой строки)</label>
              <textarea v-model="form.content" rows="5" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white focus:border-ska-red outline-none"></textarea>
            </div>
            <div class="flex justify-end pt-2">
              <button @click="submitNews" :disabled="isSubmitting" class="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase rounded-md transition-all">
                {{ isSubmitting ? 'Сохранение...' : 'Опубликовать' }}
              </button>
            </div>
          </div>

          <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444] border border-ska-blue/30 rounded-2xl overflow-hidden">
            <div v-for="item in newsList" :key="item.id" class="flex items-center justify-between p-4 border-b border-ska-blue/20 last:border-0 hover:bg-ska-blue/10 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center bg-ska-navy text-xl">{{ item.icon }}</div>
                <div>
                  <p class="text-ska-white font-bold">{{ item.title }}</p>
                  <div class="flex gap-2 text-xs text-ska-silver/50 mt-1">
                    <span>{{ item.dateStr }}</span> • <span class="text-ska-red">{{ item.tag }}</span>
                  </div>
                </div>
              </div>
              <button @click="deleteNews(item.id)" class="text-ska-silver/40 hover:text-ska-red transition-colors px-2">
  ✕
</button>
            </div>
            <div v-if="newsList.length === 0" class="p-8 text-center text-ska-silver/50">Новостей пока нет. Добавьте первую!</div>
          </div>
        </div>

        <!-- Раздел Матчи -->
        <div v-if="activeTab === 'matches'">
          <h1 class="text-ska-white text-3xl font-black uppercase tracking-wide mb-8">Управление матчами</h1>
          <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444] border border-ska-blue/30 rounded-2xl overflow-hidden">
            <div v-for="match in matchesList" :key="match.id" class="border-b border-ska-blue/20 last:border-0">
              
              <div class="flex flex-col md:flex-row md:items-center justify-between p-4 hover:bg-ska-blue/10 transition-colors gap-4">
                <div class="flex-1">
                  <p class="text-ska-white font-bold">{{ match.homeTeam.name }} — {{ match.awayTeam.name }}</p>
                  <div class="flex gap-2 text-xs text-ska-silver/50 mt-1">
                    <span>Тур {{ match.tour }}</span> • <span>{{ match.dateStr }}</span> • 
                    <span :class="match.status === 'finished' ? 'text-emerald-400' : 'text-ska-red'">{{ match.status === 'finished' ? 'Завершен' : 'Предстоящий' }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <input v-model="match.homeScore" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" placeholder="0" />
                  <span class="text-ska-silver">:</span>
                  <input v-model="match.awayScore" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" placeholder="0" />
                  <button @click="updateScore(match)" class="ml-2 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded transition-colors">Счет</button>
                  <button @click="toggleEvents(match.id)" class="px-3 py-1.5 bg-ska-blue hover:bg-ska-blue/80 text-white font-bold text-xs uppercase rounded transition-colors">События</button>
                  <button @click="setFeaturedMatch(match.id)" class="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase rounded transition-colors" title="Сделать главным на сайте">
                    ⭐ Анонс
                  </button>
                </div>
              </div>

              <!-- Панель событий -->
              <div v-if="expandedMatchId === match.id" class="p-4 bg-[#0A1425] border-t border-ska-blue/20">
                <div class="mb-4 space-y-1 max-h-40 overflow-y-auto pr-2">
                  <div v-for="ev in (match.events || [])" :key="ev.id" class="text-sm text-ska-silver flex items-center gap-2">
                    <span class="w-8 text-right font-bold text-ska-white">{{ ev.minute }}'</span>
                    <span v-if="ev.type === 'goal'">⚽</span>
                    <span v-if="ev.type === 'miss'">❌</span>
                    <span v-if="ev.type === 'yellow'">🟨</span>
                    <span v-if="ev.type === 'red'">🟥</span>
                    <span>{{ ev.playerName }}</span>
                    <span class="text-xs text-ska-silver/40">({{ ev.teamId === match.homeTeam.id ? match.homeTeam.name : match.awayTeam.name }})</span>
                  </div>
                  <p v-if="!match.events || match.events.length === 0" class="text-xs text-ska-silver/40">Событий пока нет</p>
                </div>
                <div class="flex flex-wrap items-end gap-2 p-3 bg-ska-navy/50 rounded-lg border border-ska-blue/30">
                  <div>
                    <label class="block text-[10px] text-ska-silver/60 uppercase mb-1">Минута</label>
                    <input v-model="eventForm.minute" type="number" class="w-16 bg-ska-navy border border-ska-blue/50 rounded px-2 py-1.5 text-ska-white text-sm" placeholder="0" />
                  </div>
                  <div>
                    <label class="block text-[10px] text-ska-silver/60 uppercase mb-1">Событие</label>
                    <select v-model="eventForm.type" class="bg-ska-navy border border-ska-blue/50 rounded px-2 py-1.5 text-ska-white text-sm">
                      <option value="goal">⚽ Гол</option>
                      <option value="miss">❌ Промах</option>
                      <option value="yellow">🟨 Жёлтая</option>
                      <option value="red">🟥 Красная</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-[10px] text-ska-silver/60 uppercase mb-1">Команда</label>
                    <select v-model="eventForm.isOurTeam" class="bg-ska-navy border border-ska-blue/50 rounded px-2 py-1.5 text-ska-white text-sm">
                      <option :value="true">Мы</option>
                      <option :value="false">Соперник</option>
                    </select>
                  </div>
                  <div class="flex-1">
                    <label class="block text-[10px] text-ska-silver/60 uppercase mb-1">Игрок</label>
                    <input v-model="eventForm.playerName" type="text" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-2 py-1.5 text-ska-white text-sm" placeholder="Фамилия" />
                  </div>
                  <button @click="addEvent(match)" class="px-4 py-1.5 bg-ska-red hover:bg-red-700 text-white font-bold text-xs uppercase rounded transition-colors">Добавить</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Раздел Игроки -->
        <div v-if="activeTab === 'players'">
          <div class="flex items-center justify-between mb-8">
            <h1 class="text-ska-white text-3xl font-black uppercase tracking-wide">Управление игроками</h1>
            <button @click="isPlayerFormOpen = !isPlayerFormOpen" class="px-6 py-2.5 bg-ska-red hover:bg-red-700 text-ska-white font-bold text-sm uppercase tracking-wider rounded-md transition-all">
              {{ isPlayerFormOpen ? 'Отменить' : '+ Добавить' }}
            </button>
          </div>

          <div v-if="isPlayerFormOpen" class="bg-[#0A1425] border border-ska-blue/50 p-6 rounded-2xl mb-8 shadow-xl">
            <h3 class="text-ska-white font-bold text-lg mb-4">Новый игрок</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div class="col-span-2">
                <label class="block text-ska-silver text-xs mb-1">ФИО</label>
                <input v-model="playerForm.name" type="text" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="Иван Иванов" />
              </div>
              <div>
                <label class="block text-ska-silver text-xs mb-1">Номер</label>
                <input v-model="playerForm.number" type="number" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="10" />
              </div>
              <div>
                <label class="block text-ska-silver text-xs mb-1">Позиция</label>
                <select v-model="playerForm.position" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red">
                  <option>Вратарь</option><option>Защитник</option><option>Полузащитник</option><option>Нападающий</option>
                </select>
              </div>
              <div>
                <label class="block text-ska-silver text-xs mb-1">Возраст</label>
                <input v-model="playerForm.age" type="number" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="20" />
              </div>
              <div>
                <label class="block text-ska-silver text-xs mb-1">Рост (см)</label>
                <input v-model="playerForm.height" type="number" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="180" />
              </div>
              <div>
                <label class="block text-ska-silver text-xs mb-1">Вес (кг)</label>
                <input v-model="playerForm.weight" type="number" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="75" />
              </div>
              <div>
                <label class="block text-ska-silver text-xs mb-1">Нога</label>
                <select v-model="playerForm.foot" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red">
                  <option>Правый</option><option>Левый</option>
                </select>
              </div>
              <div class="col-span-2">
                <label class="block text-ska-silver text-xs mb-1">Город рождения</label>
                <input v-model="playerForm.birthplace" type="text" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="Санкт-Петербург" />
              </div>
              <div class="col-span-2">
                <label class="block text-ska-silver text-xs mb-1">В клубе с</label>
                <input v-model="playerForm.joinedAt" type="text" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="2026" />
              </div>
              <div class="col-span-full">
                <label class="block text-ska-silver text-xs mb-1">Биография</label>
                <textarea v-model="playerForm.bio" rows="2" class="w-full bg-ska-navy border border-ska-blue/50 rounded px-3 py-2 text-ska-white outline-none focus:border-ska-red" placeholder="Краткое описание..."></textarea>
              </div>
            </div>
            <div class="flex justify-end pt-2">
              <button @click="submitPlayer" class="px-8 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase rounded-md transition-all">Сохранить</button>
            </div>
          </div>

          <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444] border border-ska-blue/30 rounded-2xl overflow-hidden">
            <div v-for="player in playersList" :key="player.id" class="flex items-center justify-between p-4 border-b border-ska-blue/20 last:border-0 hover:bg-ska-blue/10 transition-colors">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center bg-ska-navy text-ska-white font-black">{{ player.number }}</div>
                <div>
                  <p class="text-ska-white font-bold">{{ player.name }}</p>
                  <div class="flex gap-2 text-xs text-ska-silver/50 mt-1"><span>{{ player.position }}</span> • <span>{{ player.age }} лет</span></div>
                </div>
              </div>
              <button @click="deletePlayer(player.id)" class="text-ska-silver/40 hover:text-ska-red transition-colors px-2">✕</button>
            </div>
          </div>
        </div>

        <!-- Раздел Таблица -->
        <div v-if="activeTab === 'standings'">
          <h1 class="text-ska-white text-3xl font-black uppercase tracking-wide mb-8">Управление таблицей</h1>
          <div class="bg-gradient-to-br from-[#0A1425] to-[#0F2444] border border-ska-blue/30 rounded-2xl overflow-hidden overflow-x-auto">
            <table class="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr class="border-b border-ska-blue/40 text-ska-silver/60 text-[10px] uppercase tracking-widest">
                  <th class="p-3 text-center">#</th><th class="p-3">Команда</th><th class="p-3 text-center">И</th><th class="p-3 text-center">В</th>
                  <th class="p-3 text-center">Н</th><th class="p-3 text-center">П</th><th class="p-3 text-center">Заб</th><th class="p-3 text-center">Проп</th>
                  <th class="p-3 text-center">О</th><th class="p-3 text-center"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="team in standingsList" :key="team.id" class="border-b border-ska-blue/20 last:border-0 hover:bg-ska-blue/10 transition-colors">
                  <td class="p-3 text-center text-ska-white font-bold">{{ team.position }}</td>
                  <td class="p-3"><div class="flex items-center gap-2"><span class="text-ska-white font-semibold">{{ team.team.name }}</span><span class="text-ska-silver/50 text-xs">{{ team.team.city }}</span></div></td>
                  <td class="p-1 text-center"><input v-model="team.played" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" /></td>
                  <td class="p-1 text-center"><input v-model="team.wins" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" /></td>
                  <td class="p-1 text-center"><input v-model="team.draws" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" /></td>
                  <td class="p-1 text-center"><input v-model="team.losses" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" /></td>
                  <td class="p-1 text-center"><input v-model="team.goalsFor" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" /></td>
                  <td class="p-1 text-center"><input v-model="team.goalsAgainst" type="number" class="w-12 text-center bg-ska-navy border border-ska-blue/50 rounded py-1 text-ska-white focus:border-ska-red outline-none" /></td>
                  <td class="p-1 text-center"><input v-model="team.points" type="number" class="w-12 text-center bg-ska-navy border border-ska-silver/50 rounded py-1 text-ska-white font-bold focus:border-ska-red outline-none" /></td>
                  <td class="p-2 text-center"><button @click="updateStanding(team)" class="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase rounded transition-colors">ОК</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>