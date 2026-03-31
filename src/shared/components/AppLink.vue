<script setup lang="ts">
const props = defineProps<{ to: string; class?: string }>()
</script>

<template>
  <RouterLink :class="['text-blue-600 hover:underline', props.class]" :to="to">
    <slot></slot>
  </RouterLink>
</template>
