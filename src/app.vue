<script setup lang="ts">
const posts = ref<{ id: number; title: string; content: string }[]>([]);

const readPosts = async () => {
  try {
    const { data, error } = await useFetch("/api/posts");
    posts.value = data.value ? [...data.value.data] : [...posts.value];
    if (error.value) {
      console.error(error.value);
    }
  } catch (error) {}
};

const newPost = ref<{ title: string; content: string }>({
  title: "",
  content: "",
});

const resetPost = () => {
  newPost.value = {
    title: "",
    content: "",
  };
};

const savePost = () =>
  useAsyncData(async () => {
    try {
      const { data } = await $fetch("/api/posts", {
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
        body: {
          ...newPost.value,
        },
      });

      posts.value = [...data.data];
      resetPost();
    } catch (error) {
      console.error(error);
    }
  });
</script>

<template>
  <div class="flex flex-col items-center mt-2">
    <h1 class="text-3xl font-bold underline text-indigo-500">Hello world!</h1>

    <div class="mt-4">
      <button type="button" @click="readPosts">Read posts</button>
    </div>

    <ul>
      <li v-for="post in posts" :key="post.id">
        <div class="font-semibold">{{ post.title }}</div>
        <p class="text-gray-600">{{ post.content }}</p>
      </li>
    </ul>

    <form
      @submit.prevent="savePost"
      class="mx-auto bg-gray-100 p-4 shadow shadow-gray-200 mt-4"
    >
      <fieldset class="flex flex-col space-y-2 max-w-lg">
        <label for="title"></label>
        <input
          id="title"
          name="title"
          v-model="newPost.title"
          type="text"
          class="shadow shadow-gray-200 px-2 py-1 placeholder:text-gray-500"
          placeholder="title"
        />

        <label for="content"></label>
        <input
          id="content"
          name="content"
          v-model="newPost.content"
          type="text"
          class="shadow shadow-gray-200 px-2 py-1 placeholder:text-gray-500"
          placeholder="content"
        />
      </fieldset>

      <div class="flex justify-end">
        <button
          class="bg-indigo-600 text-white font-semibold mt-2 py-1 rounded-md px-2"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
