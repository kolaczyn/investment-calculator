<script setup lang="ts">
import AppLink from '@/shared/components/AppLink.vue'
import AppCard from '@/shared/components/AppCard.vue'
import AppContainer from '@/shared/components/AppContainer.vue'
import type { DepositDto, FirebaseDepositDto } from '@/shared/types/DepositDto'
import { formatCurrency } from '@/shared/utils/formatCurrency'
import { computed, onMounted, ref } from 'vue'
import { getDepositGains } from '../deposit-calculator/utils/getDepositGains'
import DepositSummary from './components/DepositSummary.vue'
import type { DepositFullInfo } from './types/DepositFullInfo'
import type { HomeDepositStats } from './types/HomeDepositStats'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { appCollections, db } from '@/shared/api/firebaseApp.ts'
import { firebaseAuth } from '@/shared/api/firebaseAuth.ts'

const depositsArr = ref<DepositDto[] | null>(null)

const depositsFullInfo = computed<DepositFullInfo[] | null>(
  () =>
    depositsArr.value?.map((d) => ({
      info: d,
      results: getDepositGains({
        ...d,
        startDate: new Date(d.startDate),
        interest: d.interest / 100,
      }),
    })) ?? null,
)

const stats = computed(() =>
  depositsFullInfo.value?.reduce<HomeDepositStats>(
    (acc, curr) => ({
      capital: acc.capital + curr.info.amount,
      gross: acc.gross + curr.results.profitsProjected.gross,
      net: acc.net + curr.results.profitsProjected.net,
    }),
    { capital: 0, gross: 0, net: 0 },
  ),
)

onMounted(async () => {
  const userId = firebaseAuth.currentUser!.uid
  const response = await getDocs(
    query(collection(db, appCollections.deposits), where('userId', '==', userId)),
  )
  depositsArr.value = response.docs.map((x) => ({ id: x.id, ...(x.data() as FirebaseDepositDto) }))
})
</script>

<template>
  <main>
    <AppContainer>
      <h1 class="text-2xl">Kalkulator inwestycji</h1>
      <AppCard class="my-4">
        <template v-slot:header>
          <h2 class="text-xl">Lokaty</h2>
        </template>
        <ul v-if="depositsArr" class="list-disc list-inside">
          <li v-for="d in depositsFullInfo" :key="d.info.id">
            <DepositSummary :deposit-full-info="d" />
          </li>
        </ul>
        <ul class="my-2 list-disc list-inside" v-if="stats">
          <li>
            W sumie na lokatach masz - <b>{{ formatCurrency(stats.capital) }}</b>
          </li>
          <li>
            Zyski brutto po zakończeniu - <b>{{ formatCurrency(stats.gross) }}</b>
          </li>
          <li>
            Zyski netto po zakończeniu - <b>{{ formatCurrency(stats.net) }}</b>
          </li>
        </ul>
        <div class="mt-1">
          <AppLink to="/lokaty/dodaj">Dodaj lokatę</AppLink>
        </div>
      </AppCard>

      <AppCard class="my-4">
        <template v-slot:header>
          <h2 class="text-xl">Obligacje indeksowane inflacją</h2>
        </template>
        <p>Brak</p>
      </AppCard>
    </AppContainer>
  </main>
</template>
