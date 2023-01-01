<script setup lang="ts">
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
import { onMounted, ref } from "vue";
import { supabase } from "./supabase";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>

<template>
  <div>
    <div v-if="$route.path != '/'">
      <Nav />
    </div>
    <RouterView :session="session"/>
  </div>
</template>

<style>
html {
  min-height: 100vh;
  background: radial-gradient(
    ellipse at bottom,
    rgba(9, 121, 20, 1) 0%,
    rgba(0, 33, 36, 0.969625350140056) 100%
  );
}
</style>
