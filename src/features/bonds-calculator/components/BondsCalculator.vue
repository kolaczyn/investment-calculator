<script setup lang="ts">
import AppInput from '@/shared/components/AppInput.vue'
import AppCard from '@/shared/components/AppCard.vue'
import type { BondDto } from '@/shared/types/BondsDto'
import type { Reactive } from 'vue'

const { data } = defineProps<{ data: Reactive<BondDto> }>()

const disableInputs = false

const formValidation = {
  fields: {
    count: null,
  },
  isValid: true,
}
</script>

<template>
  <AppCard class="grid gap-0.5 my-4">
    <template v-slot:header>
      <h2 class="text-xl">Parametry</h2>
    </template>

    <AppInput
      label="Ilość obligacji"
      id="amount"
      type="number"
      v-model.number="data.count"
      :disabled="disableInputs"
      :error="formValidation.fields.count"
    />

    <template v-slot:footer>
      <slot name="action"></slot>
    </template>
  </AppCard>

  <AppCard>
    <template v-slot:header>
      <h2 class="text-xl">Wyniki</h2>
    </template>
    <h2 v-if="formValidation.isValid">TODO</h2>
    <div v-else>W formularzu są błędy.</div>
  </AppCard>
</template>
