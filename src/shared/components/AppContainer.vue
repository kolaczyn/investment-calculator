<script setup lang="ts">
const props = defineProps<{ class?: string }>()
</script>
<template>
  <section :class="['max-w-2xl mx-auto', props.class]">
    <slot></slot>
  </section>
</template>
