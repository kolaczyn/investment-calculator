<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import { formatDate } from '@/shared/utils/formatDate';
import { computed, reactive } from 'vue';
import { getDepositEndDate } from './utils/getDepositEndDate';
import { getDepositGains } from './utils/getDepositGains';
import { mockData } from '@/shared/mockData';
import AppInput from '@/shared/components/AppInput.vue';
import Card from '@/shared/components/Card.vue';


const initial = mockData.timedDeposits[0]!
const f = reactive({
    amount: initial.amount,
    startDate: initial.startDate,
    annualInterest: initial.annualInterest,
    periodMonths: initial.periodMonths
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

                <AppInput label="Kapitał w lokacie" id="amount" type="number" v-model.number="f.amount" />
                <AppInput label="Data założenia lokaty" id="start-date" type="date" v-model="f.startDate" />
                <AppInput label="Oprocentowanie w skali roku" id="annual-interest" type="number"
                    v-model.number="f.annualInterest" step="0.5" />
                <AppInput label="Na ile miesięcy" id="period-months" type="number" v-model.number="f.periodMonths" />
            </Card>

            <Card>
                <template v-slot:header>
                    <h2 class="text-xl">Wyniki</h2>
                </template>

                <p class="mb-1">
                    Liczenie zysku z lokaty na kwotę <b>{{ f.amount }} zł</b> rozpoczętej <b>{{ f.startDate }}</b> z
                    oprocentowaniem
                    rocznym <b>{{ f.annualInterest }}%</b>
                    na <b>{{ f.periodMonths }} miesiące</b>.
                </p>
                <ul class="list-disc list-inside">
                    <li>
                        Kończy się: {{ formatDate(depositEndDate) }}.
                    </li>
                    <li>Zysk netto: {{ amountAfterEnd.netGain }} zł</li>
                    <li>Podatki {{ amountAfterEnd.taxes }} zł</li>
                    <li>Depozyt: {{ f.amount }} zł</li>
                </ul>
            </Card>
        </main>
    </Container>
</template>