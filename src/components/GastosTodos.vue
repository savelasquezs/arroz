<template>
  <gastos-tabla :listaGastos="allGastos" titulo="Gastos hasta la fecha" />
</template>

<script>
import { mapState } from "pinia";
import GastosTabla from "./GastosTabla.vue";
import { useGastosHoy } from "../store/gastos";
export default {
  components: {
    GastosTabla,
  },
  computed: {
    ...mapState(useGastosHoy, ["allGastos"]),
  },
};
</script>

<style scoped>
</style>