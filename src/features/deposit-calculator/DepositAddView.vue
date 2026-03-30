<script setup lang="ts">
import AppButton from '@/shared/components/AppButton.vue';
import Container from '@/shared/components/Container.vue';
import type { DepositDto } from '@/shared/types/DepositDto';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { depositsApi } from '../api/depositsApi';
import DepositCalculator from './components/DepositCalculator.vue';
import { depositInit } from './utils/depositInit';

const router = useRouter()

const loading = ref(false)

const data = reactive<DepositDto>(depositInit('adding'))
const addDeposit = async () => {
    loading.value = true

    const response = await depositsApi.post(data)
    await router.push({ path: `/lokaty/${response.id}` })

    loading.value = false
}

</script>

<template>
    <Container>
        <h1 class="text-2xl">Dodaj informacje o nowej lokacie</h1>
        <DepositCalculator :data="data" :disable-inputs="loading">
            <template v-slot:action>
                <AppButton @click="addDeposit">
                    Dodaj lokatę
                </AppButton>
            </template>
        </DepositCalculator>
    </Container>
</template>
