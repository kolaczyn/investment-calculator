<script setup lang="ts">
const { className = '' } = defineProps<{ to: string, className?: string }>()
</script>

<template>
    <RouterLink :class="['text-blue-600 hover:underline', className]" :to="to">
        <slot></slot>
    </RouterLink>
</template>
