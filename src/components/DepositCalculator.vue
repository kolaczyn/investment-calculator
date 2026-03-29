<script setup lang="ts">
import { formatDate } from '@/utils/formatDate';
import { getDepositEndDate } from '@/utils/getDepositEndDate';
import { getDepositGains } from '@/utils/getDepositGains';
import { computed, ref } from 'vue';


const amount = ref('1000')
const startDate = ref("2026-01-19")
const annualInterest = ref('2')
const periodMonths = ref('6')

const form = computed(() => ({
    amount: Number(amount.value),
    startDate: new Date(startDate.value),
    annualInterest: Number(annualInterest.value),
    periodMonths: Number(periodMonths.value)

}))

const depositEndDate = computed(() => getDepositEndDate(form.value.startDate, form.value.periodMonths))


const amountAfterEnd = computed(() => {
    const f = form.value
    return getDepositGains({
        annualGain: f.annualInterest / 100,
        amount: f.amount,
        periodMonths: f.periodMonths,
        startDate: f.startDate
    })
})


const ids = {
    amount: 'amount',
    startDate: 'start-date',
    annualInterest: 'annual-interest',
    periodMonths: 'periodMonths'

}

</script>
<template>
    <h2>Kalkulator lokat</h2>

    <label :for="ids.amount">Kwota zaalokowana na lokacie</label>
    <br />
    <input :id="ids.amount" v-model="amount" type="number" />
    <br />

    <label :for="ids.startDate">Początek lokaty</label>
    <br />
    <input :id="ids.startDate" v-model="startDate" type="date" />
    <br />

    <label :for="ids.annualInterest">Oprocentowanie w skali roku</label>
    <br />
    <input :id="ids.annualInterest" v-model="annualInterest" type="number" step="0.5" />
    <br />

    <label :for="periodMonths">Ile miesięcy</label>
    <br />
    <input :id="periodMonths" v-model="periodMonths" type="number" />
    <br />
    <hr />

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
        <div>Depozyt {{ form.amount }} zł</div>
    </div>


</template>