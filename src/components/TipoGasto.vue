<template>
  <div class="d-flex justify-content-between my-3">
    <h3>Tipos de Gastos</h3>
    <button-add
      ref="addButton"
      class="float-end mt-3"
      mensaje="Crear nuevo tipo de gasto"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasTop"
      aria-controls="offcanvasTop"
      @click="guardarOActualizar"
    />
  </div>
  <div class="mt-5">
    <cat-container-tipo-gasto
      @editingPressed="toggleForm"
      v-for="gasto in allTipoGastos"
      :key="gasto.docId"
      :gasto="gasto"
    />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useTipoGastos } from "../store/gastos";
import CatContainerTipoGasto from "./CatContainerTipoGasto.vue";
import TipoGastoForm from "./TipoGastoForm.vue";
import ButtonAdd from "./buttonAdd.vue";
export default {
  data() {
    return {};
  },
  methods: {
    toggleForm() {
      this.$refs.addButton.$refs.buttonPlus.click();
    },
    guardarOActualizar() {
      if (this.editingTipoGasto) {
        this.$parent.$parent.$refs.formTipoGasto.setEditting();
        return;
      }
      this.$parent.$parent.$refs.formTipoGasto.borrarDatos();
    },
  },
  computed: {
    ...mapState(useTipoGastos, ["allTipoGastos", "editingTipoGasto"]),
  },

  components: {
    CatContainerTipoGasto,
    TipoGastoForm,
    ButtonAdd,
  },
};
</script>

<style scoped>
.cat-container {
  width: 100px;
}
</style>