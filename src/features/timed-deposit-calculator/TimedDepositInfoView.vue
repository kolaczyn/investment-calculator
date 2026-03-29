<script setup lang="ts">
import Container from '@/shared/components/Container.vue';
import { apiUrl } from '@/shared/const/apiUrl';
import type { FetchInfo } from '@/shared/types/FetchInfo';
import type { TimedDeposit } from '@/shared/types/TimedDeposit';
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TimedDepositCalculator from './components/TimedDepositCalculator.vue';
import AppButton from '@/shared/components/AppButton.vue';

const route = useRoute()
const router = useRouter()
const data = reactive<FetchInfo<TimedDeposit>>({ type: 'loading', value: null })

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
                <TimedDepositCalculator :data="data.value" view-mode="viewing">
                    <template v-slot:action>
                        <AppButton type="danger" @click="removeDeposit">
                            Usuń lokatę
                        </AppButton>
                    </template>
                </TimedDepositCalculator>
            </template>
            <template v-if="data.type === 'error'">
                <h1 class="text-2xl">Brak wyników</h1>
                <p>Nie udało się znaleźć danej lokaty</p>
            </template>
        </Container>
    </main>
</template>
