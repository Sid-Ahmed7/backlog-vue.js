<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useUpComingGames } from '@/stores/upcomingGamesStore'
import defaultCover from '@/assets/images/default_cover.png'

const upComingGameStore = useUpComingGames()

const fetchUpcomingGames = computed(() => {
  if (!upComingGameStore.upComingGames.length) {
    return []
  }
  return upComingGameStore.upComingGames
})
const getCoverUrl = (cover: string | undefined): string => {
  return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
}

onMounted(async () => {
  await upComingGameStore.fetchUpcomingsGames()
})
</script>

<template>
  <div class="upcoming-games">
    <div class="upcoming-games-header">
      <h2>Jeux à venir</h2>
      <router-link to="/jeux" class="see-more">Voir plus</router-link>
    </div>
    <div v-if="fetchUpcomingGames.length === 0">
      <p>Aucun jeu à venir.</p>
    </div>
    <div v-else class="games-lists">
      <div v-for="game in fetchUpcomingGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ game.release_dates }}</p>
          <p>{{ game.genres }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
