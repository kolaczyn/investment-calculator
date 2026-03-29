<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <section :class="['bg-slate-100 p-4 shadow-lg rounded border border-slate-200', props.class]">
        <slot></slot>
    </section>
</template>