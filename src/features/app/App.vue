<script setup lang="ts">
import AppHeader from '@/shared/components/AppHeader.vue';
import { RouterView } from 'vue-router';
import { firebaseAuth, googleAuthProvider } from "@/shared/api/firebaseAuth.ts";
import { ref } from "vue";
import Container from "@/shared/components/Container.vue";
import AppButton from "@/shared/components/AppButton.vue";
import { signInWithPopup } from "firebase/auth";

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
    <Container v-else-if="loggedStatus === 'not-logged'">
      <AppButton @click="signIn">Zaloguj się</AppButton>
    </Container>
    <Container v-else-if="loggedStatus === 'fetching'">
    </Container>
  </div>
</template>
