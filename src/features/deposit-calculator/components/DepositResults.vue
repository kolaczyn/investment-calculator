<script setup lang="ts">
import type { DepositDto } from '@/shared/types/DepositDto';
import { formatDate } from '@/shared/utils/formatDate';
import { computed } from 'vue';
import { getDepositEndDate } from '../utils/getDepositEndDate';
import { getDepositGains } from '../utils/getDepositGains';
import { pluralsDays } from '@/shared/utils/plurals';
import { formatCurrency } from '@/shared/utils/formatCurrency';

const { deposit } = defineProps<{
    deposit: DepositDto
}>()

const depositEndDate = computed(() => getDepositEndDate(new Date(deposit.startDate), deposit.periodMonths))

const result = computed(() => getDepositGains({
    interest: deposit.interest / 100,
    amount: deposit.amount,
    periodMonths: deposit.periodMonths,
    startDate: new Date(deposit.startDate)
}))

</script>

<template>
    <ul class="list-disc list-inside">
        <li>
            Kończy się - {{ formatDate(depositEndDate) }} (pozostało {{ result.days.remaining }} z {{
                result.days.total }} {{
                pluralsDays(result.days.total) }})
        </li>
        <li>Aktualny zysk netto - {{ formatCurrency(result.profitsSoFar.net) }}</li>
        <li>Aktualny zysk brutto - {{ formatCurrency(result.profitsSoFar.gross) }}</li>
        <li>Podatki - {{ formatCurrency(result.profitsProjected.taxes) }}</li>
        <li>Zysk netto - {{ formatCurrency(result.profitsProjected.net) }}</li>
        <li>Zysk brutto - {{ formatCurrency(result.profitsProjected.gross) }}</li>
        <li>Depozyt - {{ formatCurrency(deposit.amount) }}</li>
    </ul>
</template>