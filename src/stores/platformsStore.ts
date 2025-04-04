import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlatformsStore = defineStore('platforms', () => {
  const platforms = ref([])
  const error = ref<string | null>(null)

  const fetchPlatforms = async () => {
    try {
      const response = await fetch('/platforms', {
        method: 'POST',
        headers: {
          'Client-ID': import.meta.env.VITE_API_CLIENT_ID,
          Authorization: `Bearer ${import.meta.env.VITE_API_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: 'fields name; where id = (48, 167,6,169,49,130);',
      })

      if (!response.ok) {
        throw new Error('Erreur API: ' + response.statusText)
      }

      const data = await response.json()
      console.log('Données reçues:', data)
      platforms.value = data.map((platforms: { name: string }) => ({
        name: platforms.name,
      }))
    } catch (err) {
      error.value = 'Erreur de chargement des genres: ' + (err as Error).message
      console.error(error.value)
    }
  }
  return { platforms, error, fetchPlatforms }
})
