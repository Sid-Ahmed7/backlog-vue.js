<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useGamesStore } from '../../stores/gamesStore'
import defaultCover from '@/assets/images/default_cover.png'

const gamesStore = useGamesStore()

const topRatedGames = computed(() => {
  const topRated = gamesStore.games.filter((game) => {
    return game.rating !== undefined
  })
  return topRated
    .sort((a, b) => {
      return (b.rating ?? 0) - (a.rating ?? 0)
    })
    .slice(0, 5)
})

const getCoverUrl = (cover: string | undefined): string => {
  return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
}

const formatRating = (rating: number | undefined): string => {
  if (rating) {
    const ratingOn = (rating / 10).toFixed(1)
    return `${ratingOn} ★`
  }
  return 'Pas de note'
}
onMounted(async () => {
  await gamesStore.fetchGames()
})
</script>

<template>
  <div class="rating-games">
    <div class="rating-games-header">
      <h2>Jeux les mieux notés</h2>
    </div>
    <div class="games-lists">
      <div v-for="game in topRatedGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ formatRating(game.rating) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
