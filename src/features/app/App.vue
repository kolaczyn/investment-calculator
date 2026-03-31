<script setup lang="ts">
import { firebaseAuth, googleAuthProvider } from "@/shared/api/firebaseAuth.ts";
import AppButton from "@/shared/components/AppButton.vue";
import AppContainer from '@/shared/components/AppContainer.vue';
import AppHeader from '@/shared/components/AppHeader.vue';
import { signInWithPopup } from "firebase/auth";
import { ref } from "vue";
import { RouterView } from 'vue-router';

const loggedStatus = ref<'fetching' | 'not-logged' | 'logged'>("fetching")
const userEmail = ref<string | null>(null)

firebaseAuth.onAuthStateChanged(user => {
  loggedStatus.value = user ? 'logged' : 'not-logged'
  userEmail.value = user?.email ?? null
})

const signIn = () => {
  signInWithPopup(firebaseAuth, googleAuthProvider)
}
</script>

<template>
  <AppHeader :user-email="userEmail" />
  <div class="py-4">
    <RouterView v-if="loggedStatus === 'logged'" />
    <AppContainer v-else-if="loggedStatus === 'not-logged'">
      <AppButton @click="signIn">Zaloguj się</AppButton>
    </AppContainer>
    <AppContainer v-else-if="loggedStatus === 'fetching'">
    </AppContainer>
  </div>
</template>
