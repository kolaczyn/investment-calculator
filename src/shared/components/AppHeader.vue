<script setup lang="ts">
import AppLink from '@/shared/components/AppLink.vue';
import AppButton from "@/shared/components/AppButton.vue";
import { firebaseAuth } from "@/shared/api/firebaseAuth.ts";
import { signOut } from "firebase/auth";

defineProps<{
  userEmail: string | null
}>()

const handleSignOut = () => {
  signOut(firebaseAuth)
}
</script>

<template>
    <header class="bg-slate-100 py-3 shadow">
        <div class="container mx-auto">
            <nav class="flex gap-4 items-center">
                <AppLink to="/">Strona Główna</AppLink>
                <AppLink to="/kalkulator/lokata">Kalkulator Lokat</AppLink>
                <AppLink to="/kalkulator/obligacje">Kalkulator Obligacji</AppLink>
                <div class="flex-1"/>
                <div>{{userEmail ?? 'Niezalogowany'}}</div>
                <AppButton @click="handleSignOut">Wyloguj się</AppButton>
            </nav>
        </div>
    </header>
</template>
