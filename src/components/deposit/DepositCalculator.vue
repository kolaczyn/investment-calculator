<script setup lang="ts">
import { formatDate } from '@/shared/utils/formatDate';
import { computed, ref } from 'vue';
import { getDepositEndDate } from './utils/getDepositEndDate';
import { getDepositGains } from './utils/getDepositGains';
import AppInput from '../app-input/AppInput.vue';
import Card from '../card/Card.vue';
import Container from '@/shared/components/Container.vue';

const amount = ref(1000)
const startDate = ref("2026-01-19")
const annualInterest = ref(2)
const periodMonths = ref(6)

const depositEndDate = computed(() => getDepositEndDate(new Date(startDate.value), periodMonths.value))

const amountAfterEnd = computed(() => getDepositGains({
    annualGain: annualInterest.value / 100,
    amount: amount.value,
    periodMonths: periodMonths.value,
    startDate: new Date(startDate.value)
}))
</script>

<template>
    <Container>
        <main class="grid gap-4">
            <Card class="grid gap-0.5">
                <h1 class="text-2xl">Kalkulator lokat</h1>
                <AppInput label="Kapitał w lokacie" id="amount" type="number" v-model.number="amount" />
                <AppInput label="Data założenia lokaty" id="start-date" type="date" v-model="startDate" />
                <AppInput label="Oprocentowanie w skali roku" id="annual-interest" type="number"
                    v-model.number="annualInterest" step="0.5" />
                <AppInput label="Na ile miesięcy" id="period-months" type="number" v-model.number="periodMonths" />
            </Card>

            <Card>
                <h2 class="text-xl">Wyniki</h2>
                <p class="mb-1">
                    Liczenie zysku z lokaty na kwotę <b>{{ amount }} zł</b> rozpoczętej <b>{{ startDate }}</b> z
                    oprocentowaniem
                    rocznym <b>{{ annualInterest }}%</b>
                    na <b>{{ periodMonths }} miesiące</b>.
                </p>
                <ul class="list-disc list-inside">
                    <li>
                        Kończy się: {{ formatDate(depositEndDate) }}.
                    </li>
                    <li>Zysk netto: {{ amountAfterEnd.netGain }} zł</li>
                    <li>Podatki {{ amountAfterEnd.taxes }} zł</li>
                    <li>Depozyt: {{ amount }} zł</li>
                </ul>
            </Card>
        </main>
    </Container>
</template>