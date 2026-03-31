<script setup lang="ts">
const props = defineProps({
  class: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section :class="['bg-slate-100 p-2.5 shadow rounded border border-slate-200', props.class]">
    <header>
      <slot name="header"> </slot>
      <hr v-if="$slots.header" class="text-slate-300 my-1" />
    </header>
    <slot></slot>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </section>
</template>
