<script setup lang="ts">
import UpcomingGames from '@/components/Home/UpcomingGames.vue'
import LastOuting from '@/components/Home/LastOuting.vue'
import RatingGames from '@/components/Home/RatingGames.vue'
</script>

<template>
  <main id="main-content">
    <section class="title-section">
      <h1 class="main-title">BacklogTrack</h1>
      <p class="intro-text">
        Bienvenue sur <strong>BacklogTrack</strong>, votre compagnon idéal pour suivre, organiser et
        explorer votre collection de jeux vidéo. Créez vos propres playlists, suivez votre
        progression et gérez votre backlog de manière simple et efficace.
      </p>
    </section>

    <section class="game-discovery-section">
      <img src="../assets/images/backlog.webp" alt="backlog" class="game-image" />
      <div class="text-wrapper">
        <h2 class="section-title">À la recherche d’un jeu ? Il est ici.</h2>
        <p class="section-text">
          Grâce à notre base de données ultra-complète, retrouvez tous les jeux – des dernières
          sorties aux pépites rétro. Parcourez des milliers de titres, tous genres et plateformes
          confondus, et enrichissez votre collection en quelques clics. Avec des mises à jour
          régulières, vous êtes toujours à jour.
        </p>
        <router-link class="link-button" to="/catalogue-des-jeux">Découvrir les jeux</router-link>
      </div>
    </section>

    <section class="share-experience-section">
      <img src="../assets/images/backlog.webp" alt="backlog" class="game-image secondary-image" />
      <div class="text-wrapper">
        <h2 class="section-title">Donnez votre avis & notez vos jeux</h2>
        <p class="section-text">
          Partagez vos expériences de jeu avec la communauté : notez, commentez et découvrez les
          avis des autres joueurs. Que vous soyez amateur de RPG, de FPS ou de jeux indépendants,
          échangez des conseils, créez des liens et trouvez de nouvelles pépites à ajouter à votre
          backlog.
        </p>
        <router-link class="link-button" to="/inscription">Rejoindre la communauté</router-link>
      </div>
    </section>
    <section class="game-recommendations">
      <UpcomingGames />
      <LastOuting />
      <RatingGames />
    </section>
  </main>
</template>

<style>
.title-section,
.game-discovery-section,
.share-experience-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 100%;
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
  color: #fff;
}

.title-section .intro-text {
  margin-bottom: 2rem;
  text-align: center;
  line-height: 1.6;
  color: #fff;
}
.game-discovery-section {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 2rem;
}
.share-experience-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
}

.game-discovery-section .game-image,
.share-experience-section .game-image {
  width: 50%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.game-discovery-section .text-wrapper,
.share-experience-section .text-wrapper {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 10px;
}

.link-button {
  color: var(--main-color);
  font-size: var(--font-size-main);
  font-weight: 700;
  text-decoration: none;
  background: var(--secondary-color);
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  align-self: start;
}

.link-button:hover {
  background: var(--main-color);
  color: #fff;
}

.game-recommendations {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  width: 80%;
  margin: 0 auto;
  padding: 2rem 0;
  max-width: 100%;
}

@media screen and (max-width: 768px) {
  .title-section,
  .game-discovery-section,
  .share-experience-section {
    text-align: center;
    max-width: 90%;
    flex-direction: column;
  }

  .game-discovery-section .text-wrapper,
  .share-experience-section .text-wrapper {
    align-items: center;
    margin-bottom: 2rem;
    padding: 1rem;
    width: 100%;
  }

  .game-discovery-section .game-image,
  .share-experience-section .game-image {
    width: 100%;
    height: auto;
  }

  .link-button {
    align-self: center;
  }
}
</style>
