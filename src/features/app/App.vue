<script setup lang="ts">
import AppHeader from '@/shared/components/AppHeader.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <AppHeader />
  <div class="py-4">
    <RouterView />
  </div>
</template>
