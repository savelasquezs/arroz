<template>
  <div class="d-flex shadow p-1 rounded m-2">
    <div class="shadow px-2 py-2 h-75">
      <img :src="banco?.imageUrl" alt="" width="20" />
    </div>
    <h5 class="text-end lh-lg mx-2">{{ banco?.nombre }}</h5>
  </div>
</template>

<script>
export default {
  props: ["banco"],
};
</script>

<style scoped>
</style>