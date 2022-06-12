<template>
  <router-view></router-view>
</template>

<script setup lang="ts">

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

onMounted(() => {
  router.push({path: "/about"})
})
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
</style>