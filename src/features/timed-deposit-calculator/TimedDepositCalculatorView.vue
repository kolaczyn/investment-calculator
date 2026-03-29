<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import TimedDepositCalculator from './components/TimedDepositCalculator.vue';
import { depositInit } from './const/depositInit';

const data = depositInit('example')
</script>

<template>
    <Container>
        <h1 class="text-2xl">Kalkulator lokat</h1>
        <TimedDepositCalculator :data="data" view-mode="calculator" />
    </Container>
</template>
