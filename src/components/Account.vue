<script setup lang="ts">
import { supabase } from "../supabase";
import { onMounted, ref, toRefs } from "vue";
import Avatar from "../components/ProfilePic.vue";

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_url = ref("");
const email = ref("");

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let { data, error, status } = await supabase
      .from("profiles")
      .select(`username, website, avatar_url`)
      .eq("id", user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      email.value = user.email;
      username.value = data.username;
      website.value = data.website;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function updateProfile() {
  try {
    loading.value = true;
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const updates = {
      id: user.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    let { error } = await supabase.from("profiles").upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div
    class="flex w-full items-center justify-center bg-transparent bg-cover bg-no-repeat"
  >
    <div
      class="rounded-xl bg-emerald-900/50 bg-opacity-50 px-12 py-10 mt-2 shadow-lg max-sm:px-8"
    >
      <div class="text-white">
        <div class="text-center text-lg text-emerald-400 pb-8">
          edit profile
        </div>
        <div class="flex justify-center">
          <div
            class="text-white bg-transparent focus:ring-4 focus:ring-emerald-400 font-medium text-sm w-full sm:w-auto text-center mt-4 mb-12 ml-16 md:ml-0"
          >
            <Avatar
              v-model:path="avatar_url"
              @upload="updateProfile"
              size="16"
              showUpload="true"
            />
          </div>
        </div>
        <form @submit.prevent="updateProfile">
          <div class="relative z-0 mb-6 px-24 w-full group">
            <input
              type="text"
              name="floating_email"
              :value="email"
              disabled
              class="block py-2.5 px-0 w-full text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              class="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >email address</label
            >
          </div>
          <!-- <div class="relative z-0 mb-6 w-full group">
        <input
          type="password"
          name="floating_password"
          id="floating_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_password"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Password</label
        >
      </div>
      <div class="relative z-0 mb-6 w-full group">
        <input
          type="password"
          name="repeat_password"
          id="floating_repeat_password"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_repeat_password"
          class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Confirm password</label
        >
      </div> -->
          <!-- <div class="grid xl:grid-cols-2 xl:gap-6">
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="floating_first_name"
            id="floating_first_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_first_name"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >First name</label
          >
        </div>
        <div class="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="floating_last_name"
            id="floating_last_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="floating_last_name"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Last name</label
          >
        </div>
      </div> -->
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              v-model="username"
              name="floating_username"
              id="floating_username"
              class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_username"
              class="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >username</label
            >
          </div>
          <div class="relative z-0 mb-6 w-full group">
            <input
              type="text"
              v-model="website"
              name="floating_website"
              id="floating_website"
              class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-400 peer"
              placeholder=" "
            />
            <label
              for="floating_website"
              class="absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >portfolio</label
            >
          </div>
          <div class="text-center mt-12">
            <button
              type="submit"
              class="text-white bg-emerald-800 hover:bg-teal-800 focus:ring-4 focus:ring-emerald-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
