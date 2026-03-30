<script setup lang="ts">
import AppInput from '@/shared/components/AppInput.vue';
import Card from '@/shared/components/Card.vue';
import type { DepositDto } from '@/shared/types/DepositDto';
import { computed } from 'vue';
import DepositResults from './DepositResults.vue';
import { validateDepositForm } from '../utils/validateDepositForm';

const { data, disableInputs = false } = defineProps<{ data: DepositDto, disableInputs?: boolean, }>()

const errors = computed(() => (validateDepositForm(data)))

const isFormValid = computed(() => !Object.values(errors.value).some(x => x != null))

</script>

<template>
    <Card class="grid gap-0.5 my-4">
        <template v-slot:header>
            <h2 class="text-xl">Parametry</h2>
        </template>

        <AppInput label="Depozyt (zł)" id="amount" type="number" v-model.number="data.amount" :disabled="disableInputs"
            :error="errors.amount" />

        <AppInput label="Data założenia lokaty" id="start-date" type="date" v-model="data.startDate"
            :disabled="disableInputs" :error="errors.startDate" />

        <AppInput label="Oprocentowanie w skali roku (w procentach)" id="annual-interest" type="number"
            v-model.number="data.interest" step="0.5" :disabled="disableInputs" :error="errors.interest" min="0" />

        <AppInput label="Okres czasu (w miesiącach)" id="period-months" type="number" v-model.number="data.periodMonths"
            :disabled="disableInputs" :error="errors.periodMonths" min="1" />

        <template v-slot:footer>
            <slot name="action"></slot>
        </template>
    </Card>

    <Card>
        <template v-slot:header>
            <h2 class="text-xl">Wyniki</h2>
        </template>
        <DepositResults v-if="isFormValid" :deposit="data" />
        <div v-else>
            W formularzu są błędy.
        </div>
    </Card>
</template>