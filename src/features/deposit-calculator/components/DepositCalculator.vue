<script setup lang="ts">
import AppInput from '@/shared/components/AppInput.vue';
import AppCard from '@/shared/components/AppCard.vue';
import type { DepositDto } from '@/shared/types/DepositDto';
import { computed } from 'vue';
import DepositResults from './DepositResults.vue';
import { validateDepositForm } from '../utils/validateDepositForm';

const { data, disableInputs = false } = defineProps<{ data: DepositDto, disableInputs?: boolean, }>()

const formValidation = computed(() => validateDepositForm(data))

</script>

<template>
    <AppCard class="grid gap-0.5 my-4">
        <template v-slot:header>
            <h2 class="text-xl">Parametry</h2>
        </template>

        <AppInput label="Depozyt (zł)" id="amount" type="number" v-model.number="data.amount" :disabled="disableInputs"
            :error="formValidation.fields.amount" />

        <AppInput label="Data założenia lokaty" id="start-date" type="date" v-model="data.startDate"
            :disabled="disableInputs" :error="formValidation.fields.startDate" />

        <AppInput label="Oprocentowanie w skali roku (w procentach)" id="annual-interest" type="number"
            v-model.number="data.interest" step="0.5" :disabled="disableInputs" :error="formValidation.fields.interest"
            min="0" />

        <AppInput label="Okres czasu (w miesiącach)" id="period-months" type="number" v-model.number="data.periodMonths"
            :disabled="disableInputs" :error="formValidation.fields.periodMonths" min="1" />

        <template v-slot:footer>
            <slot name="action"></slot>
        </template>
    </AppCard>

    <AppCard>
        <template v-slot:header>
            <h2 class="text-xl">Wyniki</h2>
        </template>
        <DepositResults v-if="formValidation.isValid" :deposit="data" />
        <div v-else>
            W formularzu są błędy.
        </div>
    </AppCard>
</template>