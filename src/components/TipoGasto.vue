<template>
  <cat-container-tipo-gasto
    v-for="gasto in allTipoGastos"
    :key="gasto.docId"
    :gasto="gasto"
  />
</template>

<script>
import { mapState } from "pinia";
import { useTipoGastos } from "../store/gastos";
import CatContainerTipoGasto from "./CatContainerTipoGasto.vue";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(useTipoGastos, ["allTipoGastos"]),
  },

  components: {
    CatContainerTipoGasto,
  },
};
</script>

<style scoped>
.cat-container {
  width: 100px;
}
</style>