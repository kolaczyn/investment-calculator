<script setup lang="ts">
import type { BondDto } from '@/shared/types/BondsDto';
import BondsCalculator from './components/BondsCalculator.vue';
import Container from '@/shared/components/Container.vue';

const data: BondDto = {
    id: 'example',
    count: 1
}

</script>

<template>
    <Container>
        <h1 class="text-2xl">Kalkulator obligacji skarbu państa indeksowanych inflacją</h1>
        <BondsCalculator :data="data" />
    </Container>
</template>