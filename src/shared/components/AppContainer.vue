<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
        default: ''
    }
})
</script>
<template>
    <section :class="['max-w-2xl mx-auto', props.class]">
        <slot></slot>
    </section>
</template>