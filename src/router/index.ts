import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue'),
      meta: { title: '' } },
    { path: '/matches', name: 'matches', component: () => import('../views/MatchesView.vue'),
      meta: { title: 'Матчи' } },
    { path: '/matches/:id', name: 'match-detail', component: () => import('../views/MatchDetailView.vue'),
      meta: { title: 'Матч' } },
    { path: '/team', name: 'team', component: () => import('../views/TeamView.vue'),
      meta: { title: 'Команда' } },
    { path: '/team/:id', name: 'player', component: () => import('../views/PlayerView.vue'),
      meta: { title: 'Игрок' } },
    { path: '/news', name: 'news', component: () => import('../views/NewsView.vue'),
      meta: { title: 'Новости' } },
    { path: '/news/:id', name: 'news-detail', component: () => import('../views/NewsDetailView.vue'),
      meta: { title: 'Новость' } },
    { path: '/club', name: 'club', component: () => import('../views/ClubView.vue'),
      meta: { title: 'Клуб' } },
    { path: '/tickets', name: 'tickets', component: () => import('../views/TicketsView.vue'),
      meta: { title: 'Билеты' } },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Страница не найдена' } },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

const BASE_TITLE = 'ПФК «СКА-Нева»'

router.afterEach((to) => {
  const pageTitle = to.meta.title as string | undefined
  if (pageTitle) {
    document.title = `${pageTitle} · ${BASE_TITLE}`
  } else {
    document.title = `${BASE_TITLE} — официальный сайт`
  }
})

export default router