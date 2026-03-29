<script setup lang="ts">
const props = defineProps({
    class: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['click'])
</script>

<template>
    <button @click="$emit('click')"
        :class="['mt-2 bg-green-300 px-3 py-1.5 rounded-full border border-green-400 shadow hover:cursor-pointer', props.class]">
        <slot></slot>
    </button>
</template>