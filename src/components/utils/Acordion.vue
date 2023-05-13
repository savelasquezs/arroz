<template>
  <Modal v-if="deletingCat"
    ><Borrar
      :itemId="currentCat.docId"
      collection="categories"
      :itemName="currentCat.categorie"
      v-if="deletingCat"
  /></Modal>
  <div class="accordion mt-5" id="accordion-container">
    <div class="accordion-item" v-for="(item, index) in list" :key="index">
      <h2 class="accordion-header">
        <button
          class="accordion-button collapsed text-capitalize"
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
          <Icon
            icon="ph:trash-fill"
            color="red"
            width="24"
            height="24"
            class="float-end"
            role="button"
            @click="deleteCat(item.docId)"
          />
          <Icon
            icon="material-symbols:edit"
            color="orange"
            width="24"
            height="24"
            role="button"
            class="float-end mx-2"
            @click="editCat(item.docId)"
          />
          <h5>
            {{ item.description }}
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import Modal from "./Modal.vue";
import Borrar from "./Borrar.vue";
import { mapState } from "pinia";
import { useCategorias } from "../../store/gastos";
export default {
  props: { list: Array },
  components: {
    Modal,
    Borrar,
    Icon,
  },
  data() {
    return {};
  },
  methods: {
    deleteCat(id) {
      useCategorias().setCurrent(id);
      useCategorias().toogleDelete();
    },
    editCat(id) {
      useCategorias().setCurrent(id);
      this.$emit("editando", id);
    },
  },
  computed: {
    ...mapState(useCategorias, ["deletingCat", "currentCat"]),
  },
  emits: ["editando"],
};
</script>

<style scoped>
</style>