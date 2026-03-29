<script setup lang="ts">
import AppLink from '@/shared/components/AppLink.vue';
import Card from '@/shared/components/Card.vue';
import Container from '@/shared/components/Container.vue';
import { apiUrl } from '@/shared/const/apiUrl';
import type { TimedDeposit } from '@/shared/types/TimedDeposit';
import { onMounted, ref } from 'vue';

const data = ref<TimedDeposit[] | null>(null)

onMounted(() => {
    fetch(`${apiUrl}/deposits`).then(x => x.json()).then(response => {
        data.value = response
    })
})
</script>

<template>
    <main>
        <Container>
            <h1 class="text-2xl">Kalkulator inwestycji</h1>
            <Card class="my-4">
                <template v-slot:header>
                    <h2 class="text-xl">Lokaty</h2>
                </template>
                <ul v-if="data" class="list-disc list-inside">
                    <li v-for="d in data" :key="d.id">
                        <AppLink to="/">
                            {{ d.amount }} zł, {{ d.annualInterest }}%, {{ d.periodMonths }} miesięcy, rozpoczęta {{
                                (d.startDate)
                            }}.
                        </AppLink>
                    </li>
                </ul>
            </Card>

            <Card class="my-4">
                <template v-slot:header>
                    <h2 class="text-xl">Obligacje Indeksowane Inflacją</h2>
                </template>
                <p>Brak</p>
            </Card>
        </Container>
    </main>
</template>