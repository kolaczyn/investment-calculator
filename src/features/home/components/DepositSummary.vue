<script setup lang="ts">
import { formatCurrency } from '@/shared/utils/formatCurrency'
import type { DepositFullInfo } from '../types/DepositFullInfo'
import { pluralsMonths } from '@/shared/utils/plurals'
import AppLink from '@/shared/components/AppLink.vue'

const { depositFullInfo: d } = defineProps<{ depositFullInfo: DepositFullInfo }>()

const title = `Zyski: brutto - ${formatCurrency(d.results.profitsProjected.gross)}, netto - ${formatCurrency(d.results.profitsProjected.net)}`
</script>
<template>
  <AppLink :to="`/lokaty/${d.info.id}`" :title="title">
    {{ formatCurrency(d.info.amount) }}, {{ d.info.interest }}%, {{ d.info.periodMonths }}
    {{ pluralsMonths(d.info.periodMonths) }}, od {{ d.info.startDate }}
  </AppLink>
</template>
