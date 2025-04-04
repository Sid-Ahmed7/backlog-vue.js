<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits()

const hasPreviousPage = computed(() => props.currentPage > 1)
const hasNextPage = computed(() => props.currentPage < props.totalPages)

const previousPage = () => {
  if (hasPreviousPage.value) {
    emit('update:currentPage', props.currentPage - 1)
  }
}
const nextPage = () => {
  if (hasNextPage.value) {
    emit('update:currentPage', props.currentPage + 1)
  }
}
</script>

<template>
  <div class="pagination">
    <button @click="previousPage" :disabled="!hasPreviousPage">Précédent</button>
    <span>Page {{ props.currentPage }} sur {{ props.totalPages }}</span>
    <button @click="nextPage" :disabled="!hasNextPage">Suivant</button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 10px;
}
</style>
