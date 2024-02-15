<template>
  <div>
    <div class="map-container" id="map"></div>
    <div v-if="markersVisible">
      <AddMarkers :map="map"></AddMarkers>
    </div>
    <div v-if="startPointVisible">
      <AddStartPoint :map="map"></AddStartPoint>
    </div>
    <div v-if="infoVisible">
      <mapRender :map="map" :mapTiles="tiles"></mapRender>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps } from 'vue';
import * as L from 'leaflet';
import { useGeoSearchControl } from './SearchControl.vue';
import AddMarkers from './AddMarkers.vue';
import AddStartPoint from './AddStartPoint.vue';
import mapRender from './mapRender.vue';

const props = defineProps(['searchBarVisible', 'startPointVisible', 'markersVisible', 'infoVisible']);
const map = ref(null);
const tiles = ref(null);

onMounted(() => {
  // MAP INIT
  map.value = L.map('map', {
    center: [50.8503, 4.3517],
    zoom: 15,
  });

  tiles.value = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 15,
  }).addTo(map.value);

  if (props.searchBarVisible === true) {
    // ADD SEARCH BAR
    const { searchControl } = useGeoSearchControl(map.value);
  }
});
</script>

<style>
#map {
  width: 100vw;
  height: 45vh;
}
</style>
