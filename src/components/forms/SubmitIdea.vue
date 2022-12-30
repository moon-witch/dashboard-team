<script setup lang="ts">
import { ref } from "vue";
import { supabase } from "../supabase";

const title = ref('');
const ideaDesc = ref('');
const ideaBody = ref('');

const handleSubmit = () => {

}
</script>

<template>
    <div
      class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8"
    >
      <div class="text-white">
        <form action="#" @submit.prevent="handleSubmit">
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="title"
              name="floating_title"
              v-model="title"
              class="login-input block py-2.5 px-0 text-center w-full text-sm rounded-3xl border-none bg-emerald-800 bg-opacity-50 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_title"
              class="absolute text-sm duration-300 ml-6 transform -translate-y-8 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >title</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="ideaDesc"
              name="floating_ideaDesc"
              v-model="ideaDesc"
              class="login-input block py-2.5 px-0 text-center w-full text-sm rounded-3xl border-none bg-emerald-800 bg-opacity-50 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_ideaDesc"
              class="absolute text-sm duration-300 ml-6 transform -translate-y-8 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >how would this benefit the team?</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="ideaBody"
              name="floating_ideaBody"
              v-model="ideaBody"
              class="login-input block py-2.5 px-0 text-center w-full text-sm rounded-3xl border-none bg-emerald-800 bg-opacity-50 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_ideaBody"
              class="absolute text-sm duration-300 ml-6 transform -translate-y-8 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >describe your idea</label
            >
          </div>
          <!-- TODO: Make file upload possible -->
          <div class="mt-8 flex justify-center text-lg text-black">
            <button
              type="submit"
              class="rounded-3xl bg-emerald-800 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-teal-800"
            >
              share
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
