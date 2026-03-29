<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

defineProps<{
    id: string,
    type: InputTypeHTMLAttribute,
    step?: string
}>()
const model = defineModel()
</script>

<template>
    <label :for="id">Kwota zaalokowana na lokacie</label>
    <br />
    <input :id="id" v-model="model" :type="type" :step="step" />
    <br />
</template>
