import { defineStore } from 'pinia'
import { ref } from 'vue'
import defaultCover from '@/assets/images/default_cover.png'
import type { Game } from '../features/models/Game'

export const useUpComingGames = defineStore('upcomingGames', () => {
  const upComingGames = ref<Game[]>([])
  const error = ref<string | null>(null)
  const currentDate = Math.floor(Date.now() / 1000)

  const fetchUpcomingsGames = async () => {
    try {
      const response = await fetch('/release_dates', {
        method: 'POST',
        headers: {
          'Client-ID': import.meta.env.VITE_API_CLIENT_ID,
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: `fields game.name, game.cover.image_id, game.genres.name, date; where release_region = 1 & date > ${currentDate}; sort date asc; limit 5;`,
      })

      if (!response.ok) {
        throw new Error('Erreur API: ' + response.statusText)
      }

      const data = await response.json()
      console.log('Données reçues:', data)

      upComingGames.value = data.map((release: any) => ({
        id: release.game.id,
        name: release.game.name,
        cover: release.game.cover ? { image_id: release.game.cover.image_id } : defaultCover,
        genres: release.game.genres
          ? release.game.genres.map((g: any) => g.name).join(', ')
          : 'Genre inconnu',
        release_dates: release.date
          ? new Date(release.date * 1000).toLocaleDateString()
          : 'Date inconnue',
      }))

      console.log('Jeux chargés:', upComingGames.value)
    } catch (err) {
      error.value = 'Erreur de chargement des jeux: ' + (err as Error).message
      console.error(error.value)
    }
  }

  return { upComingGames, error, fetchUpcomingsGames }
})
