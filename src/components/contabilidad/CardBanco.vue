<template>
  <div class="card" style="width: 18rem">
    <img :src="imagen" class="card-img-top" alt="..." />

    <div class="card-body">
      <p class="card-text">
        {{ descripcion }}
      </p>

      <h3>{{ valor }}</h3>
      <h5>{{ banco }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: ["valor", "banco", "descripcion", "imagen"],
};
</script>

<style scoped>
img {
  width: 200px;
  margin: 0 auto;
}
</style>