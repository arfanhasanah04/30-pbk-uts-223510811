<template>
    <q-page>
      <q-list bordered padding>
        <q-item-label header>Albums</q-item-label>
        <q-item v-for="album in albums" :key="album.id" clickable @click="$router.push(`/albums/${album.id}`)">
          <q-item-section>{{ album.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-page>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue';
  import { useAlbumStore } from '../stores/albumStore';
  
  const albumStore = useAlbumStore();
  
  onMounted(() => {
    albumStore.fetchAlbums();
  });
  
  const albums = computed(() => albumStore.albums);
  </script>
  