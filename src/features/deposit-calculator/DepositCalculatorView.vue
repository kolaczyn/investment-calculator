<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import DepositCalculator from './components/DepositCalculator.vue';
import { depositInit } from './utils/depositInit';

const data = depositInit('example')
</script>

<template>
    <Container>
        <h1 class="text-2xl">Kalkulator lokat</h1>
        <DepositCalculator :data="data" :disable-inputs="false" />
    </Container>
</template>
