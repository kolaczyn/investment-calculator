<script setup lang="ts">
import { formatDate } from '@/utils/formatDate';
import { getDepositEndDate } from '@/utils/getDepositEndDate';
import { getDepositGains } from '@/utils/getDepositGains';
import { computed, ref } from 'vue';


const depositAmount = ref('1000')
const depositStartDate = ref("2026-01-19")
const depositAnnualProfit = ref('2')
const depositMonths = ref('6')

const form = computed(() => ({
    amount: Number(depositAmount.value),
    startDate: new Date(depositStartDate.value),
    annualProfit: Number(depositAnnualProfit.value),
    months: Number(depositMonths.value)

}))

const depositEndDate = computed(() => getDepositEndDate(form.value.startDate, form.value.months))


// TODO ogarnąć zaokrąglanie
const amountAfterEnd = computed(() => {
    const f = form.value
    return getDepositGains({
        // TODO rename args, because the names are so different here :p
        annualGain: f.annualProfit / 100,
        capital: f.amount,
        periodMonths: f.months,
        startDate: f.startDate
    })
})



</script>
<template>
    <h2>Kalkulator lokat</h2>

    <label for="deposit-start-date">Kwota zaalokowana na lokacie</label>
    <br />
    <input id="deposit-start-date" v-model="depositAmount" type="number" />
    <br />

    <label for="deposit-start-date">Początek lokaty</label>
    <br />
    <input id="deposit-start-date" v-model="depositStartDate" type="date" />
    <br />

    <label for="annual-profit">Oprocentowanie w skali roku</label>
    <br />
    <input id="annual-profit" v-model="depositAnnualProfit" type="number" />
    <br />

    <label for="deposit-period">Ile miesięcy</label>
    <br />
    <input id="deposit-period" v-model="depositMonths" type="number" />
    <br />
    <hr />

    <div>
        Liczenie zysku z lokaty na kwotę <b>{{ depositAmount }} zł</b> rozpoczętej <b>{{ depositStartDate }}</b> z
        oprocentowaniem
        rocznym <b>{{ depositAnnualProfit }}%</b>
        na <b>{{ depositMonths }} miesiące</b>.
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