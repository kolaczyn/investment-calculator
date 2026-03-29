<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

const { disabled = false } = defineProps<{
    label: string
    id: string,
    type: InputTypeHTMLAttribute,
    step?: string
    disabled?: boolean
}>()
const model = defineModel()
</script>

<template>
    <div>
        <label class="block mb-1" :for="id">{{ label }}</label>
        <input class="bg-white border border-black rounded-sm p-1 mb-1.5 disabled:bg-gray-50 disabled:border-gray-200"
            :id="id" v-model="model" :type="type" :step="step" :disabled="disabled" />
    </div>
</template>
