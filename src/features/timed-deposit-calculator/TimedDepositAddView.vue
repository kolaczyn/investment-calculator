<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import { depositInit } from './const/depositInit';
import TimedDepositCalculator from './TimedDepositCalculator.vue';

const data = depositInit('adding')
console.log(data.startDate)

</script>

<template>
    <Container>
        <h1 class="text-2xl">Dodaj informacje o nowej lokacie</h1>
        <TimedDepositCalculator :data="data" :is-edit="true" />
    </Container>
</template>
