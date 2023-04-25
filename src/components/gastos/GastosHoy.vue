<template>
  <gastos-tabla :listaGastos="gastosHoy" :titulo="titulo" />
</template>

<script>
import { mapState } from "pinia";
import GastosTabla from "./GastosTabla.vue";
import { useGastosHoy } from "../../store/gastos";
import moment from "moment";

export default {
  components: { GastosTabla },
  computed: {
    ...mapState(useGastosHoy, ["allGastos"]),
    gastosHoy() {
      return this.allGastos.filter(
        (gasto) =>
          moment(gasto.fecha).valueOf() >= moment().startOf("day").valueOf() &&
          moment(gasto.fecha).valueOf() <= moment().endOf("day").valueOf()
      );
    },
    titulo() {
      return ` Gastos de hoy ${moment().format("DD/MM/YY")}`;
    },
  },
};
</script>

<style scoped>
</style>