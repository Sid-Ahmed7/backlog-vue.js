import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameList from '@/components/List/GamesList.vue'
import GameDetails from '@/components/Details/GameDetails.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/catalogue-des-jeux',
      component: GameList,
    },
    {
      path: '/catalogue-des-jeux/:gameName',
      component: GameDetails,
      props: true,
    },
  ],
})

export default router
