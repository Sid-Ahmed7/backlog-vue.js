<script setup lang="ts">
import { computed } from 'vue'
import type { Game } from '../../features/models/Game'
import { useGamesStore } from '../../stores/gamesStore'
import defaultCover from '@/assets/images/default_cover.png'

const props = defineProps<{
  gameName: string
}>()

const gamesStore = useGamesStore()

const game = computed(() => {
  return gamesStore.games.find((game: Game) => game.name === props.gameName)
})

const getCoverUrl = (cover: string | undefined): string => {
  return cover ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover}.jpg` : defaultCover
}
</script>

<template>
  <div class="details">
    <h1>{{ game?.name }}</h1>
    <div class="game-infos">
      <img :src="getCoverUrl(game?.cover?.image_id)" :alt="game?.name" />
      <h2>Description</h2>
      <p>{{ game?.summary }}</p>
      <h3>Platforms</h3>
      <ul>
        <li v-for="platform in game?.platforms" :key="platform.id">{{ platform.name }}</li>
      </ul>
      <h3>Genres</h3>
      <ul>
        <li v-for="genre in game?.genres" :key="genre.id">{{ genre.name }}</li>
      </ul>
    </div>
  </div>
</template>
