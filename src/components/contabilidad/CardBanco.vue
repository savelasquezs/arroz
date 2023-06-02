<template>
  <div class="card" style="width: 18rem">
    <img
      v-if="banco == 'Bancolombia'"
      src="/src/assets/img/bancolombia.png"
      class="card-img-top"
      alt="..."
    />
    <img
      v-else-if="banco == 'Nequi'"
      src="/src/assets/img/nequi.png"
      class="card-img-top"
      alt="..."
    />
    <img
      v-else-if="banco == 'Didi'"
      src="/src/assets/img/didi.png"
      class="card-img-top"
      alt="..."
    />
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
  props: ["valor", "banco", "descripcion"],
};
</script>

<style scoped>
img {
  width: 200px;
  margin: 0 auto;
}
</style>