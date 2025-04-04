<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import type { Game } from '../../features/models/Game'
import { useGamesStore } from '../../stores/gamesStore'
import { useGenresStore } from '../../stores/genresStore'
import { usePlatformsStore } from '../../stores/platformsStore'
import SearchBar from '../SearchBar.vue'
import GameFilters from '../GameFilters.vue'
import Pagination from '../Pagination.vue'
import defaultCover from '@/assets/images/default_cover.png'

const gamesStore = useGamesStore()
const genresStore = useGenresStore()
const platformsStore = usePlatformsStore()

const filteredGames = ref<Game[]>([])
const error = ref<string | null>(null)
const selectedGenres = ref<string>('')
const selectedPlatforms = ref<string[]>([])
const searchQuery = ref<string>('')

const currentPage = ref(1)
const gamesPerPage = 20

const getCoverUrl = (cover: string | undefined): string => {
  return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
}

const onSearch = (query: string) => {
  searchQuery.value = query
}

const filters = computed(() => {
  return gamesStore.games.filter((game) => {
    const matchesSearch = game.name?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesPlatform =
      selectedPlatforms.value.length === 0 ||
      (Array.isArray(game.platforms) &&
        game.platforms.some((platform) => selectedPlatforms.value.includes(platform.name)))

    console.log('Selected platforms:', selectedPlatforms.value)
    console.log('Game platforms:', game.platforms)

    const matchesGenre =
      selectedGenres.value === '' ||
      (Array.isArray(game.genres) &&
        game.genres.some((genre) => genre.name === selectedGenres.value))
    console.log('Selected genre:', selectedGenres.value)
    console.log('Game genres:', game.genres)
    console.log('Matches genre:', matchesGenre)
    return matchesSearch && matchesPlatform && matchesGenre
  })
})

const paginatedGames = computed(() => {
  const start = (currentPage.value - 1) * gamesPerPage
  const end = start + gamesPerPage
  return filters.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filters.value.length / gamesPerPage)
})

onMounted(async () => {
  await gamesStore.fetchGames()
  await platformsStore.fetchPlatforms()
  await genresStore.fetchGenres()
})
</script>

<template>
  <div class="game-list">
    <h1 class="game-title">Liste des jeux</h1>
    <SearchBar :onSearch="onSearch" />
  </div>
  <div class="filters">
    <GameFilters
      :platforms="platformsStore.platforms"
      :genres="genresStore.genres"
      v-model:selectedGenre="selectedGenres"
      v-model:selectedPlatforms="selectedPlatforms"
    />
  </div>

  <div v-if="error" class="error">{{ error }}</div>
  <div v-else>
    <ul>
      <li v-for="game in paginatedGames" :key="game.id">
        <h2>{{ game.name }}</h2>
        <router-link :to="`/catalogue-des-jeux/${game.name}`">
          <img v-if="game.cover" :src="getCoverUrl(game.cover.image_id)" alt="Couverture du jeu" />
        </router-link>
      </li>
    </ul>
    <Pagination :currentPage="currentPage" :totalPages="totalPages" />
  </div>
</template>
