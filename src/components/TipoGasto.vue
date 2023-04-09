<template>
  <gasto-form ref="formTipoGasto" />
  <button-add
    ref="addButton"
    class="float-end mt-3"
    mensaje="Crear nuevo tipo de gasto"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasTop"
    aria-controls="offcanvasTop"
    @click="guardarOActualizar"
  />
  <h1>tipos</h1>
  <cat-container-tipo-gasto
    @editingPressed="toggleForm"
    v-for="gasto in allTipoGastos"
    :key="gasto.docId"
    :gasto="gasto"
  />
</template>

<script>
import { mapState } from "pinia";
import { useTipoGastos } from "../store/gastos";
import CatContainerTipoGasto from "./CatContainerTipoGasto.vue";
import GastoForm from "./gastoForm.vue";
import ButtonAdd from "./buttonAdd.vue";
export default {
  data() {
    return {};
  },
  methods: {
    toggleForm() {
      console.log(this.$refs.addButton.$refs.buttonPlus.click());
    },
    guardarOActualizar() {
      if (this.editingTipoGasto) {
        this.$refs.formTipoGasto.setEditting();
        return;
      }
      this.$refs.formTipoGasto.borrarDatos();
    },
  },
  computed: {
    ...mapState(useTipoGastos, ["allTipoGastos", "editingTipoGasto"]),
  },

  components: {
    CatContainerTipoGasto,
    GastoForm,
    ButtonAdd,
  },
};
</script>

<style scoped>
.cat-container {
  width: 100px;
}
</style>