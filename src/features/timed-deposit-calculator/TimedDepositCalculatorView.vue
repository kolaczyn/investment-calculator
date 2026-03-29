<script setup lang="ts">
import { mockData } from '@/shared/mockData';
import TimedDepositCalculator from './TimedDepositCalculator.vue';

const init = mockData.timedDeposits[0]!

</script>

<template>
    <TimedDepositCalculator :amount="init.amount" :start-date="init.startDate" :annual-interest="init.annualInterest"
        :period-months="init.periodMonths" />
</template>
