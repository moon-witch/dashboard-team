<script setup lang="ts">
import SubmitNews from "../../components/forms/SubmitNews.vue";
import NewsCard from "../../components/cards/NewsCard.vue";
import { supabase } from "../../supabase";
import { onMounted } from "vue";
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();

let newsData: any = [];

// catch emit from SubmitNews "newPost" and rerender component to show new post

onMounted(() => {
  getAnnouncements();
});

const getAnnouncements = async () => {
  try {
    let { data, error, status } = await supabase.from("announcements").select();

    if (error && status !== 406) throw error;

    if (data) {
      newsData = data.reverse();
      console.log(newsData);
      instance?.proxy?.$forceUpdate();
    }
  } catch (error) {
    alert(error.message);
  }
};
</script>

<template>
  <div
    class="flex flex-col items-center justify-center bg-transparent bg-cover bg-no-repeat"
  >
    <SubmitNews class="mt-2" />
    <div class="text-center p-2 text-emerald-400 text-lg">
      announcement feed
    </div>
    <NewsCard
      v-for="news in newsData"
      :date="news.created_at"
      :title="news.title"
      :creator="news.creator"
      :announcement="news.announcement"
      :relation="news.relation"
    />
  </div>
</template>
