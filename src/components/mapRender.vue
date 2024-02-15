<template>
  <div class="container">
    <h2>{{ gamesStore.formData.title }}</h2>
    <p>{{ gamesStore.formData.description }}</p>
    <p>Start Date: {{ gamesStore.formData.startDate }}</p>
    <p>End Date: {{ gamesStore.formData.endDate }}</p>
  </div>
</template>

<script setup>
import { defineProps, onMounted } from 'vue';
import * as L from 'leaflet';
import { useGamesStore } from '@/stores/games';

const { map, mapTiles } = defineProps(['map', 'mapTiles']);
const gamesStore = useGamesStore();

onMounted( () => {
  // Charger les données depuis le localStorage de manière asynchrone
 gamesStore.loadFromLocalStorage();

  // Utiliser les coordonnées du startPoint comme centre initial de la carte
  if (gamesStore.startPoint && map && mapTiles) {
    const { latitude, longitude } = gamesStore.startPoint.position;

    // Ajouter des marqueurs pour les données stockées une fois que la carte est prête
    map.whenReady(() => {
      gamesStore.markers.forEach(marker => {
        const { latitude, longitude } = marker.position;
        const markerIcon = L.icon({
          iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
          iconSize: [50, 50],
          iconAnchor: [12, 41],
          popupAnchor: [0, -30],
        });
        L.marker([latitude, longitude], { icon: markerIcon }).addTo(map).bindPopup(`<b>${marker.name}</b>`);
      });

      // Ajouter un marqueur pour le startPoint
      const startPointIcon = L.icon({
        iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30],
      });
      L.marker([latitude, longitude], { icon: startPointIcon }).addTo(map).bindPopup('<b>Start Point</b>');
    });
  }
});
</script>


