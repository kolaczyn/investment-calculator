<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue'

const { disabled = false } = defineProps<{
  label: string
  id: string
  type: InputTypeHTMLAttribute
  step?: string
  disabled?: boolean
  min?: string
  error: string | null
}>()
const model = defineModel()
</script>

<template>
  <div>
    <label class="block mb-1" :for="id">{{ label }}</label>
    <input
      :class="[
        'bg-white border rounded-sm p-1 mb-1.5 disabled:bg-gray-50 disabled:border-gray-200',
        error ? 'border-red-500' : 'border-black',
      ]"
      :id="id"
      v-model="model"
      :type="type"
      :step="step"
      :disabled="disabled"
      :min="min"
    />
    <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
  </div>
</template>
