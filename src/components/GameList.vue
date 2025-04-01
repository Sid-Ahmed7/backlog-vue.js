<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Game } from '../features/models/Game'
import defaultCover from '@/assets/images/default_cover.png'

const games = ref<Game[]>([])
const error = ref<string | null>(null)

const fetchGames = async () => {
  try {
    const response = await fetch('/games', {
      method: 'POST',
      headers: {
        'Client-ID': import.meta.env.VITE_API_CLIENT_ID,
        Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: 'fields name,cover.image_id,created_at,first_release_date,franchise,genres.name,involved_companies.company.name,platforms.name,rating,release_dates;limit 500; sort release_dates desc;',
    })

    if (!response.ok) {
      throw new Error('Erreur API: ' + response.statusText)
    }

    const data = await response.json()
    console.log('Données reçues:', data)
    games.value = data.map((game: Game) => ({
      id: game.id,
      name: game.name,
      cover: game.cover ? { image_id: game.cover.image_id } : defaultCover,
    }))
  } catch (err) {
    error.value = 'Erreur de chargement des jeux: ' + (err as Error).message
    console.error(error.value)
  }
}

const getCoverUrl = (cover: string | undefined): string => {
  return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
}

onMounted(() => {
  fetchGames()
})
</script>

<template>
  <h1>Liste des jeux</h1>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-else>
    <ul>
      <li v-for="game in games" :key="game.id">
        <h2>{{ game.name }}</h2>
        <img v-if="game.cover" :src="getCoverUrl(game.cover.image_id)" alt="Couverture du jeu" />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
