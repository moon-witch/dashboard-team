<script setup lang="ts">
import { anyTypeAnnotation } from "@babel/types";
import { ref, toRefs, watch } from "vue";
import { supabase } from "../supabase";

const prop = defineProps({"path": String, "size": String, showUpload: String});
const { path, size } = toRefs(prop);

const emit = defineEmits(["upload", "update:path"]);
const uploading = ref(false);
const src = ref("");
const files = ref();

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("avatars")
      .download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error("Error downloading image: ", error.message);
  }
};

const uploadAvatar = async (evt: any) => {
  files.value = evt.target.files;
  try {
    uploading.value = true;
    if (!files.value || files.value.length === 0) {
      throw new Error("You must select an image to upload.");
    }

    const file = files.value[0];
    const fileExt = file.name.split(".").pop();
    const filePath = `${Math.random()}.${fileExt}`;

    let { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file);

    if (uploadError) throw uploadError;
    emit("update:path", filePath);
    emit("upload");
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

watch(path, () => {
  if (path.value) downloadImage();
});
</script>

<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image rounded-full"
      :style="{ height: size + 'em', width: size + 'em' }"
    />
    <div
      v-else
      class="avatar no-image"
      :style="{ height: size + 'em', width: size + 'em' }"
    />

    <div v-if="showUpload == 'true'" :style="{ width: size + 'em' }" class="mt-6">
      <label
        class="button primary block rounded-3xl border shadow my-2 py-0.5"
        for="single"
      >
        {{ uploading ? "uploading ..." : "upload picture" }}
      </label>
      <input
        style="visibility: hidden; position: absolute"
        type="file"
        id="single"
        accept="image/*"
        @change="uploadAvatar"
        :disabled="uploading"
      />
    </div>
  </div>
</template>
