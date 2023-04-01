<template>
  <div class="accordion mt-5" id="accordion-container">
    <div class="accordion-item" v-for="(item, index) in list" :key="index">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#' + item.categorie + index"
          aria-expanded="true"
          :aria-controls="item.categorie + index"
        >
          {{ item.categorie }}
        </button>
      </h2>
      <div
        :id="item.categorie + index"
        class="accordion-collapse collapse"
        data-bs-parent="#accordion-container"
      >
        <div class="accordion-body">
          {{ item.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { list: Array },
};
</script>

<style scoped>
</style>