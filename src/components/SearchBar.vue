<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const emit = defineEmits()
const searchQuery = ref<string>('')

const handleSearchInput = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <div class="search-game">
    <input
      class="search-input"
      type="text"
      placeholder="Rechercher un jeu..."
      v-model="searchQuery"
      @input="handleSearchInput"
    />
    <span class="icon-container">
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </span>
  </div>
</template>
<style scoped>
.search-game {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: 3rem;
  border: 1px solid #ccc;
  border-radius: 100px;
  font-size: 1rem;
  outline: none;
}

.search-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.15);
}

.icon-container {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: #888;
}

.search-icon {
  width: 20px;
  height: 20px;
}
</style>
