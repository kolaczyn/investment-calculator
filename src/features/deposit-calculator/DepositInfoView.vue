<script setup lang="ts">
import AppButton from '@/shared/components/AppButton.vue';
import AppContainer from '@/shared/components/AppContainer.vue';
import type { DepositDto, FirebaseDepositDto } from '@/shared/types/DepositDto';
import type { FetchInfo } from '@/shared/types/FetchInfo';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DepositCalculator from './components/DepositCalculator.vue';
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/shared/api/firebaseApp.ts";

const route = useRoute()
const router = useRouter()
const data = reactive<FetchInfo<DepositDto>>({ type: 'loading', value: null })
const editMode = ref(false)
const isSaving = ref(false)
const idRef = ref<string | null>(null)

const docRef = (id: string) => doc(db, 'deposits', id)

const fetchData = async (id: string) => {
    try {
        const result = await getDoc(docRef(id))
        data.type = 'resolved'
        data.value = result.data() as DepositDto
    } catch (err) {
        console.error(err)
        data.type = 'error'
        data.value = null
    }
}

const startEditing = () => {
    editMode.value = true
}

const save = async () => {
    if (data.type !== 'resolved') return
    isSaving.value = true

    const payload: FirebaseDepositDto = {
        amount: data.value.amount,
        interest: data.value.interest,
        periodMonths: data.value.periodMonths,
        startDate: data.value.startDate,
    }

    await updateDoc(docRef(idRef.value!), payload)

    isSaving.value = false
    editMode.value = false
}

const removeDeposit = async () => {
    if (data.type !== 'resolved') return

    const confirmation = window.confirm('Czy na pewno chcesz usunąć informacje o tej lokacie?')
    if (!confirmation) return

    await deleteDoc(docRef(idRef.value!))

    await router.push({ path: '/' })
}

watch(() => route.params.id as string, id => {
    idRef.value = id
    fetchData(id);
}, { immediate: true })
</script>

<template>
    <main>
        <AppContainer>
            <template v-if="data.type === 'resolved'">
                <h1 class="text-2xl">Dane o lokacie</h1>
                <DepositCalculator :data="data.value" :disable-inputs="!editMode">
                    <template v-slot:action>
                        <AppButton v-if="editMode" type="primary" @click="save" :disabled="isSaving">
                            Zapisz
                        </AppButton>
                        <AppButton v-else type="primary" @click="startEditing">
                            Edytuj
                        </AppButton>
                        <AppButton class="ml-2" type="danger" @click="removeDeposit">
                            Usuń
                        </AppButton>
                    </template>
                </DepositCalculator>
            </template>
            <template v-if="data.type === 'error'">
                <h1 class="text-2xl">Brak wyników</h1>
                <p>Nie udało się znaleźć danej lokaty</p>
            </template>
        </AppContainer>
    </main>
</template>
