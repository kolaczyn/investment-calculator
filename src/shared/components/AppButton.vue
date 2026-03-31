<script setup lang="ts">
const {
  type = 'primary',
  disabled = false,
  className = '',
} = defineProps<{
  type?: 'primary' | 'danger'
  disabled?: boolean
  className?: string
}>()

defineEmits(['click'])
</script>

<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="[
      className,
      'px-3 py-1.5 rounded-full border shadow',
      type === 'primary' ? 'bg-green-300  border-green-400' : 'bg-red-300  border-red-400',
      disabled ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer',
      disabled ? 'opacity-75' : '',
    ]"
  >
    <slot></slot>
  </button>
</template>
