import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/matches', name: 'matches', component: () => import('../views/MatchesView.vue') },
    { path: '/matches/:id', name: 'match-detail', component: () => import('../views/MatchDetailView.vue') },
    { path: '/team', name: 'team', component: () => import('../views/TeamView.vue') },
    { path: '/team/:id', name: 'player', component: () => import('../views/PlayerView.vue') },
    { path: '/news', name: 'news', component: () => import('../views/NewsView.vue') },
    { path: '/news/:id', name: 'news-detail', component: () => import('../views/NewsDetailView.vue') },
    { path: '/club', name: 'club', component: () => import('../views/ClubView.vue') },
    { path: '/tickets', name: 'tickets', component: () => import('../views/TicketsView.vue') },  // ← ДОБАВЬ ЭТУ СТРОКУ
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

export default router