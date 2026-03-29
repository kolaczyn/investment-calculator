<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import { depositInit } from './const/depositInit';
import TimedDepositCalculator from './components/TimedDepositCalculator.vue';

const data = depositInit('adding')

</script>

<template>
    <Container>
        <h1 class="text-2xl">Dodaj informacje o nowej lokacie</h1>
        <TimedDepositCalculator :data="data" view-mode="adding">
            <template v-slot:action>
                <button
                    class="mt-2 bg-green-300 px-3 py-1.5 rounded-full border border-green-400 shadow hover:cursor-pointer">Dodaj
                    lokatę</button>
            </template>
        </TimedDepositCalculator>
    </Container>
</template>
