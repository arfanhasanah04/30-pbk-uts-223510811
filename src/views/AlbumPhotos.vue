<template>
    <q-page>
      <q-list bordered padding>
        <q-item-label header>Photos in Album</q-item-label>
        <q-item v-if="photos.length === 0">Loading...</q-item>
        <div v-else class="photo-list">
          <q-img
            v-for="photo in photos"
            :key="photo.id"
            :src="photo.thumbnailUrl"
            :alt="photo.title"
            @click="showPhoto(photo.url)"
            class="photo-item"
          />
        </div>
      </q-list>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAlbumStore } from '../stores/albumStore';
  
  const albumStore = useAlbumStore();
  const route = useRoute();
  const photos = ref([]);
  
  onMounted(async () => {
    await albumStore.fetchPhotos(route.params.id);
    photos.value = albumStore.photos;
  });
  
  const showPhoto = (url) => {
    window.open(url, '_blank');
  };
  </script>
  
  <style>
  .photo-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
    padding: 10px;
  }
  
  .photo-item {
    cursor: pointer;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .photo-item:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  </style>
  