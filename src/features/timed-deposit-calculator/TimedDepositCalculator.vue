<script setup lang="ts">
import AppInput from '@/shared/components/AppInput.vue';
import Card from '@/shared/components/Card.vue';
import Container from '@/shared/components/Container.vue';
import { formatDate } from '@/shared/utils/formatDate';
import { computed, reactive } from 'vue';
import { getDepositEndDate } from './utils/getDepositEndDate';
import { getDepositGains } from './utils/getDepositGains';
import type { TimedDeposit } from '@/shared/types/TimedDeposit';

const props = defineProps<{ data: TimedDeposit }>()

const f = reactive({
    amount: props.data.amount,
    startDate: props.data.startDate,
    annualInterest: props.data.annualInterest,
    periodMonths: props.data.periodMonths
})

const depositEndDate = computed(() => getDepositEndDate(new Date(f.startDate), f.periodMonths))

const amountAfterEnd = computed(() => getDepositGains({
    annualGain: f.annualInterest / 100,
    amount: f.amount,
    periodMonths: f.periodMonths,
    startDate: new Date(f.startDate)
}))
</script>

<template>
    <Container>
        <main>
            <h1 class="text-2xl">Kalkulator lokat</h1>
            <Card class="grid gap-0.5 my-4">
                <template v-slot:header>
                    <h2 class="text-xl">Parametry</h2>
                </template>

                <AppInput label="Kapitał w lokacie (zł)" id="amount" type="number" v-model.number="f.amount" />
                <AppInput label="Data założenia lokaty" id="start-date" type="date" v-model="f.startDate" />
                <AppInput label="Oprocentowanie w skali roku (w %)" id="annual-interest" type="number"
                    v-model.number="f.annualInterest" step="0.5" />
                <AppInput label="Okres czasu (w miesiącach)" id="period-months" type="number"
                    v-model.number="f.periodMonths" />
            </Card>

            <Card>
                <template v-slot:header>
                    <h2 class="text-xl">Wyniki</h2>
                </template>
                <ul class="list-disc list-inside">
                    <li>
                        Kończy się - {{ formatDate(depositEndDate) }}.
                    </li>
                    <li>Zysk netto - {{ amountAfterEnd.netGain }} zł</li>
                    <li>Podatki - {{ amountAfterEnd.taxes }} zł</li>
                    <li>Depozyt - {{ f.amount }} zł</li>
                </ul>
            </Card>
        </main>
    </Container>
</template>