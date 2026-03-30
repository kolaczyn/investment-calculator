<script setup lang="ts">
import AppButton from '@/shared/components/AppButton.vue';
import Container from '@/shared/components/Container.vue';
import type { DepositDto } from '@/shared/types/DepositDto';
import type { FetchInfo } from '@/shared/types/FetchInfo';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { depositsApi } from '@/shared/api/depositsApi';
import DepositCalculator from './components/DepositCalculator.vue';

const route = useRoute()
const router = useRouter()
const data = reactive<FetchInfo<DepositDto>>({ type: 'loading', value: null })
const editMode = ref(false)
const isSaving = ref(false)

const fetchData = async (id: string) => {
    const result = await depositsApi.getById(id)
    data.type = result.type
    data.value = result.value
}

const startEditing = () => {
    editMode.value = true
}

const save = async () => {
    if (data.type !== 'resolved') return
    isSaving.value = true

    const { id, ...payload } = data.value
    depositsApi.patch(id, payload)

    isSaving.value = false
    editMode.value = false
}

const removeDeposit = async () => {
    if (data.type !== 'resolved') return

    const confirmation = window.confirm('Czy na pewno chcesz usunąć informacje o tej lokacie?')
    if (!confirmation) return

    const id = data.value.id

    await depositsApi.delete(id)

    await router.push({ path: '/' })
}

watch(() => route.params.id as string, id => fetchData(id), { immediate: true })
</script>

<template>
    <main>
        <Container>
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
        </Container>
    </main>
</template>
