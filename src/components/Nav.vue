<script setup lang="ts">
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import Avatar from "../components/ProfilePic.vue";
import router from "../router";

const loading = ref(true);
const avatar_url = ref("");

onMounted(() => {
  getProfile();
});

async function signOut() {
  try {
    loading.value = true;
    let { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
    router.push("/");
  }
}

async function getProfile() {
  try {
    loading.value = true;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    /* const { user } = session.value; */

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`avatar_url`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <!-- component -->
  <body class="nav-bg">
    <nav class="relative px-4 py-4 flex justify-between items-center">
        <router-link to="/acc">
            <Avatar v-model:path="avatar_url" size="3" showUpload="false"/>
        </router-link>
      <ul
        class="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 flex mx-auto items-center w-auto space-x-1 md:space-x-6"
      >
        <li>
          <router-link
            class="text-sm text-gray-400 hover:text-gray-500"
            to="/news"
            >News</router-link
          >
        </li>
        <li class="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            class="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <router-link
            class="text-sm text-gray-400 hover:text-gray-500"
            to="/guides"
            >Guides</router-link
          >
        </li>
        <li class="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            class="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <router-link
            class="text-sm text-gray-400 hover:text-gray-500"
            to="/tools"
            >Tools</router-link
          >
        </li>
        <li class="text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            class="w-4 h-4 current-fill"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </li>
        <li>
          <router-link
            class="text-sm text-gray-400 hover:text-gray-500"
            to="/ideas"
            >Ideas</router-link
          >
        </li>
      </ul>
      <button
        type="submit"
        class="text-white bg-emerald-800 hover:bg-teal-800 focus:ring-4 focus:ring-emerald-400 font-medium rounded-lg text-sm w-full w-12 md:w-auto justify-right md:px-5 py-2.5 text-center"
        @click="signOut"
      >
        logout
      </button>
    </nav>
  </body>
</template>

<style scoped>
.nav-bg {
  background: radial-gradient(
    ellipse at bottom,
    rgba(9, 121, 20, 1) 0%,
    rgba(0, 33, 36, 0.969625350140056) 100%
  );
}
</style>
