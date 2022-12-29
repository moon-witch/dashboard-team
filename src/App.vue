<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Account from './components/Account.vue'
  import SignIn from './components/SignIn.vue'
  import { supabase } from './supabase'

  const session = ref()

  onMounted(() => {
    supabase.auth.getSession().then(({ data }) => {
      session.value = data.session
    })

    supabase.auth.onAuthStateChange((_, _session) => {
      session.value = _session
    })
  })
</script>

<template>
  <div>
    <Account v-if="session" :session="session" />
    <SignIn v-else />
  </div>
</template>
