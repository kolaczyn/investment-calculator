<script setup lang="ts">
import AppButton from '@/shared/components/AppButton.vue';
import Container from '@/shared/components/Container.vue';
import { apiUrl } from '@/shared/const/apiUrl';
import type { DepositDto } from '@/shared/types/DepositDto';
import type { FetchInfo } from '@/shared/types/FetchInfo';
import { reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()
const data = reactive<FetchInfo<DepositDto>>({ type: 'loading', value: null })
const editMode = ref(false)
const isSaving = ref(false)

const fetchData = (id: string) => {
    fetch(`${apiUrl}/deposits/${id}`).then(x => x.json()).then(response => {
        if (response.error) {
            data.type = 'error'
            data.value = null
        } else {
            data.type = 'resolved'
            data.value = response
        }
    }
    )
}

const startEditing = () => {
    editMode.value = true
}

const save = async () => {
    if (data.type !== 'resolved') return
    isSaving.value = true
    // we don't watch to patch id
    const { id, ...newData } = data.value
    await fetch(`${apiUrl}/deposits/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(newData)
    }).then(res => res.json())

    isSaving.value = false
    editMode.value = false
}

const removeDeposit = async () => {
    if (data.type !== 'resolved') return

    const confirmation = window.confirm('Czy na pewno chcesz usunąć informacje o tej lokacie?')
    if (!confirmation) return

    const id = data.value.id

    await fetch(`${apiUrl}/deposits/${id}`, {
        method: 'DELETE',
    }).then(res => res.json())

    await router.push({ path: '/' })
}

watch(() => route.params.id as string, id => fetchData(id), { immediate: true })
</script>

<template>
    <main>
        <Container>
            <template v-if="data.type === 'resolved'">
                <h1 class="text-2xl">Dane o lokacie</h1>
                <DepositCalculator :data="data.value" :view-mode="editMode ? 'editing' : 'viewing'">
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
