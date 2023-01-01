<script setup lang="ts">
import SubmitIdea from "../../components/forms/SubmitIdea.vue";
import IdeaCard from "../../components/cards/IdeaCard.vue";
</script>

<template>
  <div
    class="flex flex-col items-center justify-center bg-transparent bg-cover bg-no-repeat"
  >
    <div class="mt-2">
      <SubmitIdea />
    </div>
    <div class="text-center p-2 text-emerald-400 text-lg">
      ideas
    </div>
    <IdeaCard />
    <IdeaCard />
    <IdeaCard />
  </div>
</template>
