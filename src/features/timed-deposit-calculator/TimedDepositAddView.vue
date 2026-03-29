<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import { apiUrl } from '@/shared/const/apiUrl';
import type { TimedDeposit } from '@/shared/types/TimedDeposit';
import { reactive, ref } from 'vue';
import TimedDepositCalculator from './components/TimedDepositCalculator.vue';
import { depositInit } from './const/depositInit';
import { useRouter } from 'vue-router';
import AppButton from '@/shared/components/AppButton.vue';

const router = useRouter()

const data = depositInit('adding')
const loading = ref(false)

const f = reactive<TimedDeposit>(data)

const fetchAddDeposit = async () => {
    const result: TimedDeposit = await fetch(`${apiUrl}/deposits`, {
        method: 'POST',
        body: JSON.stringify(f)
    }).then(res => res.json())

    router.push({ path: `/lokaty/${result.id}` })

}

const addDeposit = async () => {
    loading.value = true
    await fetchAddDeposit()
    loading.value = false
}

</script>

<template>
    <Container>
        <h1 class="text-2xl">Dodaj informacje o nowej lokacie</h1>
        <TimedDepositCalculator :data="f" :view-mode="loading ? 'loading' : 'editing'">
            <template v-slot:action>
                <AppButton @click="addDeposit">
                    Dodaj lokatę
                </AppButton>
            </template>
        </TimedDepositCalculator>
    </Container>
</template>
