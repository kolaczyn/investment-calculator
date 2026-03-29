<script setup lang="ts">
defineProps<{ to: string }>()

</script>

<template>
    <RouterLink class="text-blue-600 hover:underline" :to="to">
        <slot></slot>
    </RouterLink>
</template>
