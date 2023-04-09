<template>
  <Modal v-if="deletingTipoGasto"
    ><Borrar
      :itemId="currentTipoGasto.docId"
      collection="tipoGastos"
      :itemName="currentTipoGasto.nombre"
      v-if="deletingTipoGasto"
  /></Modal>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasTop"
    aria-labelledby="offcanvasTopLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasTopLabel">Nuevo Gasto</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        @click="borrarDatos"
        ref="botonCerrar"
      ></button>
    </div>
    <div class="offcanvas-body position-relative">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Nombre Gasto"
          v-model="nombreGasto"
          required
        />
        <label for="floatingInput">Nombre Gasto</label>
      </div>
      <div class="form-floating mb-3">
        <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
          v-model="medida"
        >
          <option value="Lb">Libra</option>
          <option value="Kg">Kilo</option>
          <option value="Pq">Paquete</option>
          <option value="Un">Unidades</option>
        </select>
        <label for="floatingSelect">Unidad de Medida</label>
      </div>
      <autocomplete-drop-down
        ref="autocomplete"
        :lista="allCategories.map((cat) => cat.categorie)"
        titulo="Categoria"
        @catSeleccionada="setCategoria"
      />
      <p class="text-danger">{{ error }}</p>

      <button
        class="btn btn-outline-info mb-3"
        v-if="categoriaNoValida"
        @click="addcat"
      >
        Agregar Categoria
      </button>
      <acordion> </acordion>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="anotaciones"
          id="floatingTextarea"
          v-model="anotaciones"
        ></textarea>
        <label for="floatingTextarea">Anotaciones</label>
      </div>

      <button
        class="btn btn-success position-absolute bottom-0 mb-5 end-0 mx-3"
        @click="guardarTipoGasto"
        v-if="editingTipoGasto"
      >
        Actualizar Registro
      </button>

      <button
        v-else
        class="btn btn-success position-absolute bottom-0 mb-5 end-0 mx-3"
        @click="guardarTipoGasto"
      >
        Guardar Gasto
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Acordion from "./Acordion.vue";
import AutocompleteDropDown from "./AutocompleteDropDown.vue";
import { mapState } from "pinia";
import { useCategorias, useTipoGastos, useUtilsGastos } from "../store/gastos";
import { useUtilsStore } from "../store/main";
import Modal from "./Modal.vue";
import Borrar from "./Borrar.vue";
export default {
  data() {
    return {
      categoria: "",
      categoriaNoValida: null,
      medida: "",
      error: "",
      anotaciones: "",
      nombreGasto: "",
    };
  },
  components: {
    AutocompleteDropDown,
    Acordion,
    Modal,
    Borrar,
  },
  methods: {
    setCategoria(nombre, elementoInLista) {
      if (nombre.length > 0) {
        this.categoriaNoValida = !elementoInLista;
        this.categoria = nombre;
        if (this.categoriaNoValida) {
          this.error = "Categoria No Encontrada";
        } else {
          this.error = "";
        }
      }
    },
    addcat() {
      useCategorias().toggleForm();
    },

    borrarDatos() {
      this.$refs.autocomplete.filtro = "";
      this.error = "";
      this.categoriaNoValida = false;
      this.medida = "";
      this.nombreGasto = "";
      this.anotaciones = "";
      this.categoria = "";
      if (this.editingTipoGasto) {
        useTipoGastos().toggleEditing();
      }
    },
    setEditting() {
      this.$refs.autocomplete.filtro = this.currentTipoGasto.categoria;
      this.nombreGasto = this.currentTipoGasto.nombre;
      this.medida = this.currentTipoGasto.medida;
      this.anotaciones = this.currentTipoGasto.anotaciones;
    },
    guardarTipoGasto() {
      if (this.categoriaNoValida) return;
      if (this.nombreGasto == "" || this.categoria == "" || this.medida == "") {
        useUtilsStore().confirmAction(
          "Los campos no pueden ir vacios",
          2000,
          "error"
        );
        return;
      }
      const data = {
        categoria: this.categoria,
        nombre: this.nombreGasto,
        medida: this.medida,
        anotaciones: this.anotaciones,
      };

      useUtilsGastos().saveElement(data, "tipoGastos");
      this.$refs.botonCerrar.click();
    },
  },
  computed: {
    ...mapState(useCategorias, ["allCategories"]),
    ...mapState(useTipoGastos, [
      "editingTipoGasto",
      "currentTipoGasto",
      "deletingTipoGasto",
    ]),
  },
};
</script>

<style scoped></style>
