<template>
  <div class="cat-header mt-3 d-flex justify-content-between">
    <h3 class="">Categorias</h3>
    <button-add mensaje="Agregar categoria" @click="abrirModal" />
  </div>

  <acordion :list="allCategories" />

  <modal v-if="modal">
    <div class="card px-5 py-5">
      <form>
        <h3 class="text-center mb-3">Agregar Categoria</h3>
        <div class="offcanvas-body position-relative">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="Nombre Gasto"
              v-model="categorieToCreate"
              required
            />
            <label for="floatingInput">Nombre Categoria</label>
          </div>
          <div class="form-floating">
            <textarea
              class="form-control"
              placeholder="Descripción"
              id="floatingTextarea"
              v-model="descriptionCategorie"
            ></textarea>
            <label for="floatingTextarea">Descripción de la categoria</label>
          </div>
        </div>
        <div class="d-flex justify-content-between mt-5">
          <button class="btn btn-success" @click.prevent="agregarCategoria">
            Agregar
          </button>
          <button class="btn btn-danger" @click.prevent="cerrarModal">
            Salir
          </button>
        </div>
      </form>
    </div>
  </modal>
</template>

<script>
import buttonAdd from "../components/buttonAdd.vue";
import Modal from "./Modal.vue";
import { useCategorias, useUtilsGastos } from "../store/gastos";
import Acordion from "./Acordion.vue";
import { mapState } from "pinia";

export default {
  components: {
    buttonAdd,
    Modal,
    Acordion,
  },
  data() {
    return {
      modal: null,
      categorieToCreate: "",
      descriptionCategorie: "",
    };
  },
  methods: {
    abrirModal() {
      this.modal = true;
    },
    cerrarModal() {
      this.modal = false;
    },
    async agregarCategoria() {
      const data = {
        categorie: this.categorieToCreate,
        description: this.descriptionCategorie,
      };
      useUtilsGastos().saveElement(data, "categories");
      this.cerrarModal();
    },
  },
  computed: {
    ...mapState(useCategorias, ["allCategories"]),
  },
  watch: {
    allCategories() {
      this.allCategories = this.allCategories;
    },
  },
};
</script>

<style scoped>
</style>