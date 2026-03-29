<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import TimedDepositCalculator from './TimedDepositCalculator.vue';

const initialData = {
    id: "example",
    amount: 1000,
    annualInterest: 2,
    periodMonths: 6,
    startDate: "2026-01-19",
}


</script>

<template>
    <Container>
        <h1 class="text-2xl">Kalkulator lokat</h1>
        <TimedDepositCalculator :data="initialData" :is-edit="true" />
    </Container>
</template>
