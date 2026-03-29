<script setup lang="ts">
import AppInput from '@/shared/components/AppInput.vue';
import Card from '@/shared/components/Card.vue';
import type { TimedDeposit } from '@/shared/types/TimedDeposit';
import { formatDate } from '@/shared/utils/formatDate';
import { computed } from 'vue';
import type { ViewMode } from '../types';
import { getDepositEndDate } from '../utils/getDepositEndDate';
import { getDepositGains } from '../utils/getDepositGains';

const { data, viewMode } = defineProps<{ data: TimedDeposit, viewMode: ViewMode, }>()

const disableInputs = computed(() => viewMode === 'viewing' || viewMode === 'loading')

const errors = computed(() => ({
    amount: data.amount < 1000 ? 'Minimalna kwota to 1000 zł' : null,
    startDate: null,
    annualInterest: data.annualInterest <= 0 ? 'Oprocentowanie musi być dodatnie' : null,
    periodMonths: data.periodMonths <= 0 ? 'Miesiące muszą być dodatnie' : null
}))

const isFormValid = computed(() => !Object.values(errors.value).some(x => x != null))

const depositEndDate = computed(() => getDepositEndDate(new Date(data.startDate), data.periodMonths))

const amountAfterEnd = computed(() => getDepositGains({
    annualGain: data.annualInterest / 100,
    amount: data.amount,
    periodMonths: data.periodMonths,
    startDate: new Date(data.startDate)
}))
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
            v-model.number="data.annualInterest" step="0.5" :disabled="disableInputs" :error="errors.annualInterest"
            min="0" />

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
        <ul class="list-disc list-inside" v-if="isFormValid">
            <li>
                Kończy się - {{ formatDate(depositEndDate) }}
            </li>
            <li>Podatki - {{ amountAfterEnd.taxes }} zł</li>
            <li>Zysk netto - {{ amountAfterEnd.netGain }} zł</li>
            <li>Depozyt - {{ data.amount }} zł</li>
        </ul>
        <div v-else>
            W formularzu są błędy.
        </div>
    </Card>
</template>