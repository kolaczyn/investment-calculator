<script setup lang="ts">
import { apiUrl } from '@/shared/const/apiUrl';
import type { TimedDeposit } from '@/shared/types/TimedDeposit';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TimedDepositCalculator from './TimedDepositCalculator.vue';

const data = ref<TimedDeposit | null>(null)

const route = useRoute()

const fetchData = (id: string) => {
    fetch(`${apiUrl}/deposits/${id}`).then(x => x.json()).then(response => {
        data.value = response
    })
}

watch(() => route.params.id as string, id => fetchData(id), { immediate: true })
</script>

<template>
    <TimedDepositCalculator v-if="data" :data="data" />
</template>
