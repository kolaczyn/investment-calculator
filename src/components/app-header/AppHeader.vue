<script setup lang="ts">
import AppLink from '@/shared/components/AppLink.vue';
</script>

<template>
    <header class="bg-slate-100 py-3 shadow">
        <div class="container mx-auto">
            <nav class="flex gap-4">
                <AppLink to="/">Strona Główna</AppLink>
                <AppLink to="/kalkulator/lokata">Kalkulator Lokat</AppLink>
            </nav>
        </div>
    </header>
</template>
