<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useGamesStore } from '../../stores/gamesStore'
import defaultCover from '@/assets/images/default_cover.png'

const gamesStore = useGamesStore()

const lastOutingGames = computed(() => {
  const lastOuting = gamesStore.games.filter((game) => {
    const releaseDate = game.first_release_date
    console.log('Release date:', releaseDate)
    return releaseDate && releaseDate < Math.floor(Date.now() / 1000)
  })

  return lastOuting
    .sort((first, second) => {
      const firstReleaseDate = first.first_release_date || 0
      const secondReleaseDate = second.first_release_date || 0
      return secondReleaseDate - firstReleaseDate
    })
    .slice(0, 5)
})

const getCoverUrl = (cover: string | undefined): string => {
  return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
}

const formatReleaseDate = (releaseDates: number | undefined): string => {
  if (releaseDates) {
    const releaseDate = new Date(releaseDates * 1000)
    return releaseDate.toLocaleDateString()
  }
  return 'Date inconnue'
}

onMounted(async () => {
  await gamesStore.fetchGames()
  console.log('Last outing games:', lastOutingGames.value)
})
</script>

<template>
  <div class="last-outing">
    <div class="last-outing-header">
      <h2>Derniers jeux sortis</h2>
      <router-link to="/catalogue-des-jeux" class="see-more">Voir plus</router-link>
    </div>
    <div class="games-lists">
      <div v-for="game in lastOutingGames" :key="game.id" class="game-item">
        <div class="game-cover">
          <img :src="getCoverUrl(game.cover?.image_id)" :alt="game.name" />
        </div>
        <div class="game-details">
          <h3>{{ game.name }}</h3>
          <p>{{ formatReleaseDate(game.first_release_date) }}</p>
          <p>{{ game.genres }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
