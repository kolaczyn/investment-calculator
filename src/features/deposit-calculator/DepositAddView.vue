<script setup lang="ts">
import AppButton from '@/shared/components/AppButton.vue';
import Container from '@/shared/components/Container.vue';
import type {DepositDto, FirebaseDepositDto} from '@/shared/types/DepositDto';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { addDoc, collection } from 'firebase/firestore'
import DepositCalculator from './components/DepositCalculator.vue';
import { depositInit } from './utils/depositInit';
import { db } from "@/shared/api/firebaseApp.ts";
import { firebaseAuth } from "@/shared/api/firebaseAuth.ts";

const router = useRouter()

const loading = ref(false)

const data = reactive<DepositDto>(depositInit('adding'))
const addDeposit = async () => {
    loading.value = true
    const user = firebaseAuth.currentUser

    const payload: FirebaseDepositDto = {
      amount: data.amount,
      interest: data.interest,
      periodMonths: data.periodMonths,
      startDate: data.startDate,
      userId: user!.uid
    }

    const response = await addDoc(collection(db, "deposits"), payload)
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
