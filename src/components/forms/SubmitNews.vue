<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { supabase } from "../../supabase";

let title = ref("");
let newsPost = ref("");
let relation = ref("");
const statusMsg = ref("");
const errorMsg = ref("");
const emit = defineEmits(['newPost'])

const handleSubmit = async () => {
  if (title && newsPost && relation) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      const { error } = await supabase.from("announcements").insert({
        title: title.value,
        announcement: newsPost.value,
        relation: relation.value,
        creator: user.id,
      });
      if (error) throw error;
      statusMsg.value = "Announcement";
      title.value = "";
      newsPost.value = "";
      relation.value = "";
      emit('newPost')
    } catch (error) {
      errorMsg.value = `Error: ${error.message}`;
      setTimeout(() => {
        errorMsg.value = "";
      }, 5000);
    }
  }
};
</script>

<template>
  <div
    class="rounded-xl bg-gray-800 bg-opacity-50 px-10 py-5 shadow-lg max-sm:px-8"
  >
    <div class="text-white">
      <form action="#" @submit.prevent="handleSubmit">
        <div class="text-center text-sm text-emerald-400">
          create new announcement
        </div>
        <div class="relative mt-2 z-0 mb-6 w-full group">
          <input
            type="title"
            name="floating_title"
            v-model="title"
            class="login-input block py-2.5 px-40 w-full text-center text-sm rounded-3xl border-none bg-emerald-800 bg-opacity-50 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_title"
            class="absolute text-sm duration-300 ml-6 transform -translate-y-8 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >title</label
          >
        </div>
        <div class="relative z-0 mb-6 w-full group text-sm">
          <select
            v-model="relation"
            class="form-select appearance-none block w-full py-1.5 px-6 text-sm text-emerald-400 bg-emerald-900 bg-clip-padding bg-no-repeat rounded-lg transition ease-in-out m-0 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
          >
            <option selected disabled>select related system</option>
            <option value="general">general</option>
            <option value="frontend">frontend</option>
            <option value="backend">backend</option>
          </select>
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <textarea
            class="form-control block w-full px-3 py-1.5 text-base bg-emerald-800 bg-opacity-50 bg-clip-padding border-none rounded-lg transition ease-in-out m-0 focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
            type="newsPost"
            name="floating_newsPost"
            v-model="newsPost"
            rows="3"
            placeholder=" "
            required
          />
          <label
            for="floating_newsPost"
            class="absolute text-sm duration-300 ml-6 transform -translate-y-8 scale-75 top-2.5 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
            >what's the news?</label
          >
        </div>
        <!-- TODO: Make file upload possible -->
        <div class="mt-8 flex justify-end text-md">
          <button
            type="submit"
            class="rounded-3xl bg-emerald-800 bg-opacity-50 px-5 py-1 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-teal-800"
          >
            share
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
