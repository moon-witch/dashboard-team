<script setup lang="ts">
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
</script>

<template>
  <div>
    <div v-if="$route.path != '/'">
      <Nav />
    </div>
    <RouterView />
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