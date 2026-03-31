<script setup lang="ts">
import AppContainer from '@/shared/components/AppContainer.vue';
import type { BondDto } from '@/shared/types/BondsDto';
import BondsCalculator from './components/BondsCalculator.vue';

const data: BondDto = {
    id: 'example',
    count: 1
}

</script>

<template>
    <AppContainer>
        <h1 class="text-2xl">Kalkulator obligacji skarbu państa indeksowanych inflacją</h1>
        <BondsCalculator :data="data" />
    </AppContainer>
</template>