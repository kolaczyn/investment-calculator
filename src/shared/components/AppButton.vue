<script setup lang="ts">
const { type = 'primary' } = defineProps<{ type?: 'primary' | 'danger' }>()

const emit = defineEmits(['click'])
</script>

<template>
    <button @click="$emit('click')" :class="['mt-2 px-3 py-1.5 rounded-full border shadow hover:cursor-pointer', type === 'primary' ? 'bg-green-300  border-green-400' : 'bg-red-300  border-red-400'

    ]">
        <slot></slot>
    </button>
</template>