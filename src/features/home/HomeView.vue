<script setup lang="ts">
import AppLink from '@/shared/components/AppLink.vue';
import Card from '@/shared/components/Card.vue';
import Container from '@/shared/components/Container.vue';
import { apiUrl } from '@/shared/const/apiUrl';
import type { DepositDto } from '@/shared/types/DepositDto';
import { computed, onMounted, ref } from 'vue';
import { getDepositGains } from '../deposit-calculator/utils/getDepositGains';
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { pluralsMonths } from '@/shared/utils/plurals';
import { depositsApi } from '../api/depositsApi';

const data = ref<DepositDto[] | null>(null)

const dataMapped = computed(() => data.value?.map(d => ({
    base: d,
    gains: getDepositGains({
        ...d,
        startDate: new Date(d.startDate),
        // TODO make the names consistant
        interest: d.interest / 100
    })
})) ?? null)

const stats = computed(() => {
    if (dataMapped.value == null) return null
    const totalInvested = dataMapped.value.reduce<number>((acc, curr) => acc + curr.base.amount, 0)
    const projectedGrossGain = dataMapped.value.reduce<number>((acc, curr) => acc + curr.gains.grossGain, 0)
    const projectedNetGain = dataMapped.value.reduce<number>((acc, curr) => acc + curr.gains.netGain, 0)
    return {
        totalInvested,
        projectedGrossGain,
        projectedNetGain
    }
})


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
                    <li v-for="{ base: d, gains: g } in dataMapped" :key="d.id">
                        <AppLink :to="`/lokaty/${d.id}`"
                            :title="`Zyski: brutto - ${formatCurrency(g.grossGain)}., netto - ${formatCurrency(g.netGain)}`">
                            {{ formatCurrency(d.amount) }}, {{ d.interest }}%, {{ d.periodMonths }} {{
                                pluralsMonths(d.periodMonths) }},
                            od {{
                                (d.startDate)
                            }}
                        </AppLink>
                    </li>
                </ul>
                <ul class="my-2 list-disc list-inside" v-if="stats">
                    <li>W sumie na lokatach masz - <b>{{ formatCurrency(stats.totalInvested) }}</b></li>
                    <li>Zyski brutto po zakończeniu - <b>{{ formatCurrency(stats.projectedGrossGain) }}</b></li>
                    <li>Zyski netto po zakończeniu - <b>{{ formatCurrency(stats.projectedNetGain) }}</b></li>
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