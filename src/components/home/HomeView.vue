<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import { mockData } from '@/shared/mockData';
import { formatDate } from '@/shared/utils/formatDate';
import Card from '../card/Card.vue';
import AppLink from '@/shared/components/AppLink.vue';

</script>

<template>
    <main>
        <Container>
            <h1 class="text-2xl">Kalkulator inwestycji</h1>
            <Card class="my-4">
                <template v-slot:header>
                    <h2 class="text-xl">Lokaty</h2>
                </template>
                <ul class="list-disc list-inside">
                    <li v-for="d in mockData.timedDeposits" :key="d.id">
                        {{ d.amount }} zł, {{ d.annualInterest }}%, {{ d.periodMonths }} miesięcy, rozpoczęta {{
                            formatDate(d.startDate)
                        }}. <AppLink to="/">Więcej</AppLink>
                    </li>
                </ul>
            </Card>
        </Container>
    </main>
</template>