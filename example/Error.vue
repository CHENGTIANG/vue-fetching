<template>
  <p>
    Error: {{ error }}
    <button @click="retry">Retry</button>
  </p>
</template>

<script>
export default {
  props: ["error", "retry"]
};
</script>

<style>
</style>