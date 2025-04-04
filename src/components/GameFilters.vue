<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  platforms: { id: number; name: string }[]
  genres: { id: number; name: string }[]
  selectedPlatforms: string[]
  selectedGenre: string
}>()

const emit = defineEmits()

const selectedPlatform = ref(props.selectedPlatforms || [])
const selectedGenre = ref<string>('')

watch(selectedPlatform, (newPlatforms) => {
  emit('update:selectedPlatforms', newPlatforms)
})
watch(selectedGenre, (newGenre) => {
  emit('update:selectedGenre', newGenre)
})
</script>

<template>
  <div class="select-item">
    <h3>Filtrer par plateforme</h3>
    <div v-for="platform in props.platforms" :key="platform.id" class="platform-item">
      <label :for="platform.name">
        {{ platform.name }}
      </label>
      <input type="checkbox" :value="platform.name" v-model="selectedPlatform" />
    </div>
  </div>

  <div class="select-item">
    <h3>Filtrer par genre</h3>
    <select v-model="selectedGenre">
      <option value="">Choisir un genre</option>
      <option v-for="genre in props.genres" :key="genre.id" :value="genre.name">
        {{ genre.name }}
      </option>
    </select>
  </div>
</template>

<style scoped></style>
