<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { supabase } from "../../supabase";

const props = defineProps({
    date: String,
    title: String,
    announcement: String,
    creator: String,
    relation: String,
});

/* let username: any = null;

onMounted(() => {
    getUser();
})

async function getUser() {
  try {
    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username`)
      .eq("id", props.creator)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username = data
      console.log(data)
    }
  } catch (error) {
    alert(error.message);
  }
} */
</script>

<template>
  <div
    class="card-custom rounded-xl bg-gray-800 bg-opacity-50 py-5 shadow-lg my-2"
  >
    <div class="grid grid-flow-row-dense grid-cols-1 md:ml-12">
      <span class="text-center md:text-left text-emerald-400 text-sm">
        {{ date }}
        <span class="text-emerald-400 text-sm ml-6">by {{ creator }}</span>
      </span>
    </div>
    <div class="text-center text-emerald-400">
      _____________________________________________________________
    </div>
    <div class="text-center p-2 text-emerald-400 text-lg">
      {{ title }}
    </div>
    <div
      class="text-center md:text-left p-2 text-emerald-400 text-sm mx-4 md:mx-12"
    >
      {{ announcement }}
    </div>
    <div
      class="text-left md:text-left p-2 text-emerald-600 text-sm mx-4 md:mx-12"
    >
      related to: {{ relation }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-custom {
  width: 40vw;

  @media (max-width: 768px) {
    width: 100vw;
  }
}
</style>
