<template>
  <h1>Test</h1>

  <button @click="logClick">Btn</button>
</template>

<script setup lang="ts">
const logClick = () => {
  console.log("LOG CLICK LOL")
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
</style>