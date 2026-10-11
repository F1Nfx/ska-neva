import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/matches', name: 'matches', component: () => import('../views/MatchesView.vue') },
    { path: '/team', name: 'team', component: () => import('../views/TeamView.vue') },
    { path: '/team/:id', name: 'player', component: () => import('../views/PlayerView.vue') },
    { path: '/news', name: 'news', component: () => import('../views/NewsView.vue') },
    { path: '/club', name: 'club', component: () => import('../views/ClubView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
  ],

  // 🔽 ЭТО ДОБАВЛЯЕМ
  scrollBehavior(to, from, savedPosition) {
    // Если пользователь вернулся кнопкой «Назад» — восстановить позицию
    if (savedPosition) return savedPosition
    // Во всех остальных случаях — наверх
    return { top: 0, behavior: 'smooth' }
  },
})

export default router