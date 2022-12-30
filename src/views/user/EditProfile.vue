<scipt setup lang="ts">
  import { onMounted, ref } from 'vue'
  import Account from '../../components/forms/Account.vue'
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
</scipt>

<template>
  <Account />
</template>
