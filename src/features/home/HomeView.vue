<script setup lang="ts">
import AppLink from '@/shared/components/AppLink.vue';
import Card from '@/shared/components/Card.vue';
import Container from '@/shared/components/Container.vue';
import type { DepositDto } from '@/shared/types/DepositDto';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { pluralsMonths } from '@/shared/utils/plurals';
import { computed, onMounted, ref } from 'vue';
import { depositsApi } from '../api/depositsApi';
import { getDepositGains } from '../deposit-calculator/utils/getDepositGains';
import type { HomeDepositStats } from './types/HomeDepositStats';

const data = ref<DepositDto[] | null>(null)

const dataMapped = computed(() => data.value?.map(d => ({
    info: d,
    results: getDepositGains({
        ...d,
        startDate: new Date(d.startDate),
        interest: d.interest / 100
    })
})) ?? null)

const stats = computed(() => dataMapped.value?.reduce<HomeDepositStats>((acc, curr) => ({
    capital: acc.capital + curr.info.amount,
    gross: acc.gross + curr.results.profitsProjected.gross,
    net: acc.net + curr.results.profitsProjected.net,
}), { capital: 0, gross: 0, net: 0 }))

onMounted(async () => {
    const response = await depositsApi.getAll()
    data.value = response
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
                    <li v-for="d in dataMapped" :key="d.info.id">
                        <AppLink :to="`/lokaty/${d.info.id}`"
                            :title="`Zyski: brutto - ${formatCurrency(d.results.profitsProjected.gross)}, netto - ${formatCurrency(d.results.profitsProjected.net)}`">
                            {{ formatCurrency(d.info.amount) }}, {{ d.info.interest }}%, {{ d.info.periodMonths }} {{
                                pluralsMonths(d.info.periodMonths) }},
                            od {{
                                (d.info.startDate)
                            }}
                        </AppLink>
                    </li>
                </ul>
                <ul class="my-2 list-disc list-inside" v-if="stats">
                    <li>W sumie na lokatach masz - <b>{{ formatCurrency(stats.capital) }}</b></li>
                    <li>Zyski brutto po zakończeniu - <b>{{ formatCurrency(stats.gross) }}</b></li>
                    <li>Zyski netto po zakończeniu - <b>{{ formatCurrency(stats.net) }}</b></li>
                </ul>
                <div class="mt-1">
                    <AppLink to="/lokaty/dodaj">Dodaj lokatę</AppLink>
                </div>
            </Card>

            <Card class="my-4">
                <template v-slot:header>
                    <h2 class="text-xl">Obligacje indeksowane inflacją</h2>
                </template>
                <p>Brak</p>
            </Card>
        </Container>
    </main>
</template>