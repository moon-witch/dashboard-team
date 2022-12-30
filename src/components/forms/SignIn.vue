<script setup lang="ts">
import { ref } from "vue";
import router from "../../router/index";
import { supabase } from "../../supabase";

const loading = ref(false);
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
    router.push("/news");
  }
};
</script>

<template>
  <div
    class="flex h-screen w-full items-center justify-center bg-transparent bg-cover bg-no-repeat"
  >
    <div
      class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8"
    >
      <div class="text-white">
        <form action="#" @submit.prevent="handleLogin">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="email"
              name="floating_email"
              v-model="email"
              class="login-input block py-2.5 px-0 text-center w-full text-sm rounded-3xl border-none bg-emerald-800 bg-opacity-50 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              class="absolute text-sm duration-300 ml-6 transform -translate-y-8 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >email address</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="password"
              name="floating_password"
              v-model="password"
              class="login-input block py-2.5 px-0 text-center w-full text-sm rounded-3xl border-none bg-emerald-800 bg-opacity-50 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              class="absolute text-sm duration-300 ml-6 transform -translate-y-8 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >password</label
            >
          </div>
          <div class="mt-8 flex justify-center text-lg text-black">
            <button
              type="submit"
              class="rounded-3xl bg-emerald-800 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-teal-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-input {
  background-size: 200%;
  background-image: linear-gradient(
    to right,
    rgba(0, 128, 128, 0.556) 50%,
    rgba(0, 128, 128, 0.227) 50%
  );
  -webkit-transition: background-position 1s;
  -moz-transition: background-position 1s;
  transition: background-position 1s;
}

.login-input:focus {
  background-position: -100%;
}
</style>
