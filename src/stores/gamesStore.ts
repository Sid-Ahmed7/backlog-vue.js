import { defineStore } from 'pinia'
import { ref } from 'vue'
import defaultCover from '@/assets/images/default_cover.png'
import type { Game } from '../features/models/Game'

export const useGamesStore = defineStore('games', () => {
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
        genres: game.genres ? game.genres.map((g: any) => g.name).join(', ') : 'Genre inconnu',
        first_release_date: game.first_release_date || 0,
        artworks: game.artworks || [],
        rating: game.rating || 0,
        platforms: game.platforms || [],
        year: game.first_release_date ? new Date(game.first_release_date * 1000).getFullYear() : 0,
      }))

      console.log('Jeux chargés:', games.value)
    } catch (err) {
      error.value = 'Erreur de chargement des jeux: ' + (err as Error).message
      console.error(error.value)
    }
  }

  return { games, error, fetchGames }
})
