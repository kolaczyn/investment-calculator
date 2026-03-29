<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

defineProps<{
    label: string
    id: string,
    type: InputTypeHTMLAttribute,
    step?: string
}>()
const model = defineModel()
</script>

<template>
    <div>
        <label class="block mb-1" :for="id">{{ label }}</label>
        <input class="bg-white border border-black rounded-sm p-1 mb-1.5" :id="id" v-model="model" :type="type"
            :step="step" />
    </div>
</template>
