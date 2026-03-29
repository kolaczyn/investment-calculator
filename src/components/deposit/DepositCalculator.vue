<script setup lang="ts">
import { formatDate } from '@/shared/utils/formatDate';
import { computed, ref } from 'vue';
import { getDepositEndDate } from './utils/getDepositEndDate';
import { getDepositGains } from './utils/getDepositGains';
import AppInput from '../app-input/AppInput.vue';

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
    <h2>Kalkulator lokat</h2>

    <AppInput id="amount" type="number" v-model.number="amount" />
    <AppInput id="start-date" type="date" v-model="startDate" />
    <AppInput id="annual-interest" type="number" v-model.number="annualInterest" step="0.5" />
    <AppInput id="period-months" type="number" v-model.number="periodMonths" />

    <div>
        Liczenie zysku z lokaty na kwotę <b>{{ amount }} zł</b> rozpoczętej <b>{{ startDate }}</b> z
        oprocentowaniem
        rocznym <b>{{ annualInterest }}%</b>
        na <b>{{ periodMonths }} miesiące</b>.
    </div>
    <hr />
    <div>
        <div>
            Kończy się {{ formatDate(depositEndDate) }}.
        </div>
        <div>Zysk netto: {{ amountAfterEnd.netGain }} zł</div>
        <div>Podatki {{ amountAfterEnd.taxes }} zł</div>
        <div>Depozyt {{ amount }} zł</div>
    </div>


</template>