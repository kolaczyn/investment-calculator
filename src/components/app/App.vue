<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppHeader from '../app-header/AppHeader.vue';
</script>

<template>
  <AppHeader />
  <div class="py-2">
    <RouterView />
  </div>
</template>
