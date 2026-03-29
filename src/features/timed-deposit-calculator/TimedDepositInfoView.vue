<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import { apiUrl } from '@/shared/const/apiUrl';
import type { TimedDeposit } from '@/shared/types/TimedDeposit';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TimedDepositCalculator from './components/TimedDepositCalculator.vue';

const route = useRoute()
const data = ref<TimedDeposit | null>(null)

const fetchData = (id: string) => {
    fetch(`${apiUrl}/deposits/${id}`).then(x => x.json()).then(response => {
        data.value = response.error ? null : response
    })
}

watch(() => route.params.id as string, id => fetchData(id), { immediate: true })
</script>

<template>
    <main>
        <Container>
            <template v-if="data">
                <h1 class="text-2xl">Dane o lokacie</h1>
                <TimedDepositCalculator :data="data" view-mode="viewing" />
            </template>
            <template v-else>
                <h1 class="text-2xl">Brak wyników</h1>
                <p>Nie udało się znaleźć danej lokaty</p>
            </template>
        </Container>
    </main>
</template>
