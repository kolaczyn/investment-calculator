<script setup lang="ts">
const props = defineProps({
    className: {
        type: String,
        default: ''
    }
})

const componentClass = `bg-slate-100 p-4 shadow-lg rounded border border-slate-200 ${props.className}`
</script>

<template>
    <section :class="componentClass">
        <slot></slot>
    </section>
</template>