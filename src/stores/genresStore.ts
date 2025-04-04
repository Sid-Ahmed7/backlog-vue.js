import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGenresStore = defineStore('genres', () => {
  const genres = ref([])
  const error = ref<string | null>(null)

  const fetchGenres = async () => {
    try {
      const response = await fetch('/genres', {
        method: 'POST',
        headers: {
          'Client-ID': import.meta.env.VITE_API_CLIENT_ID,
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: 'fields name; limit 500;',
      })

      if (!response.ok) {
        throw new Error('Erreur API: ' + response.statusText)
      }

      const data = await response.json()
      console.log('Données reçues:', data)
      genres.value = data.map((genre: { name: string }) => ({
        name: genre.name,
      }))
    } catch (err) {
      error.value = 'Erreur de chargement des genres: ' + (err as Error).message
      console.error(error.value)
    }
  }
  return { genres, error, fetchGenres }
})
