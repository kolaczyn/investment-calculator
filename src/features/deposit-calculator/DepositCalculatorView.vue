<script setup lang="ts">
import AppContainer from '@/shared/components/AppContainer.vue'
import DepositCalculator from './components/DepositCalculator.vue'
import { depositInit } from './utils/depositInit'

const data = depositInit('example')
</script>

<template>
  <AppContainer>
    <h1 class="text-2xl">Kalkulator lokat</h1>
    <DepositCalculator :data="data" :disable-inputs="false" />
  </AppContainer>
</template>
