<template>
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
        <button
          class="btn btn-success"
          @click.prevent="editarCat"
          v-if="editingCat"
        >
          Actualizar
        </button>
        <button
          class="btn btn-success"
          v-else
          @click.prevent="agregarCategoria"
        >
          Agregar
        </button>
        <button class="btn btn-danger" @click.prevent="cerrarModal">
          Salir
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { useCategorias, useUtilsGastos } from "../../store/gastos";
import Acordion from "../utils/Acordion.vue";
import { mapState } from "pinia";
import { useUtilsStore } from "../../store/utils";

export default {
  components: {
    Acordion,
  },
  data() {
    return {
      categorieToCreate: "",
      descriptionCategorie: "",
    };
  },
  methods: {
    editarCat() {
      const id = this.currentCat.docId;
      const data = {
        categorie: this.categorieToCreate,
        description: this.descriptionCategorie,
      };
      useUtilsGastos().updateElement(data, "categories", id);
      this.cerrarModal();
    },
    cerrarModal() {
      if (this.editingCat) {
        useCategorias().toggleEditingd();
      }
      useCategorias().toggleForm();
    },

    async agregarCategoria() {
      if (this.categorieToCreate == "" || this.descriptionCategorie == "") {
        useUtilsStore().confirmAction(
          "Los campos no pueden ir vacios",
          2000,
          "error"
        );
        return;
      }
      const data = {
        categorie: this.categorieToCreate,
        description: this.descriptionCategorie,
      };
      useUtilsGastos().saveElement(data, "categories");
      this.cerrarModal();
    },
  },
  created() {
    this.categorieToCreate = this.editingCat ? this.currentCat.categorie : "";
    this.descriptionCategorie = this.editingCat
      ? this.currentCat.description
      : "";
  },
  computed: {
    ...mapState(useCategorias, ["allCategories", "editingCat", "currentCat"]),
  },
  watch: {
    allCategories() {
      this.allCategories = this.allCategories;
    },
  },
};
</script>


<style scoped>
.card {
  z-index: 103;
}
</style>