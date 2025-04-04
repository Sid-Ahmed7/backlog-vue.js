<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}
const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <nav class="nav">
    <div class="logo-container">
      <router-link to="/">
        <img src="../assets/images/logo.png" alt="Logo" id="logo" />
      </router-link>
    </div>

    <div class="menu-icon" @click="toggleMenu">
      <div class="menu-button"></div>
    </div>

    <ul class="menu" :class="{ 'menu-open': isOpen }">
      <li>
        <router-link to="/">Accueil</router-link>
      </li>
      <li>
        <router-link to="/catalogue-des-jeux">Jeux</router-link>
      </li>
      <li>
        <router-link to="/about">À propos</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #292729;
  height: 4rem;
  padding: 1rem 2rem;
  position: relative;
}

.logo-container {
  flex-grow: 1;
}

#logo {
  max-height: 100%;
  max-width: 120px;
}

.menu {
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu > li {
  margin: 0 1rem;
}
.menu a {
  color: var(--main-color);
  text-decoration: none;
}

.menu-icon {
  display: none;
  cursor: pointer;
  z-index: 10;
}

.menu-button {
  width: 2rem;
  height: 0.25rem;
  background-color: #eee;
  position: relative;
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

.menu-button::before,
.menu-button::after {
  content: '';
  position: absolute;
  width: 2rem;
  height: 0.25rem;
  background-color: #eee;
  border-radius: 0.5rem;
  transition: transform 0.3s ease;
}

.menu-button::before {
  top: -0.5rem;
}

.menu-button::after {
  top: 0.5rem;
}

@media (max-width: 768px) {
  .menu-icon {
    display: block;
  }

  .menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #292729;
    margin-top: 4rem;
    z-index: 9;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s ease,
      visibility 0s 0.3s;
  }

  .menu.menu-open {
    display: block;
    opacity: 1;
    visibility: visible;
    transition:
      opacity 0.3s ease,
      visibility 0s 0s;
  }
  .menu > li {
    width: 88%;
    text-align: center;
    padding: 1rem;
    border-bottom: 1px solid #444;
    transition: background-color 0.3s ease;
  }

  .menu > li:hover {
    background-color: #444;
  }

  .menu > li:last-child {
    border-bottom: none;
  }
}
</style>
