<template>
  <navbar class="position-fixed" />
  <div class="contenido">
    <div class="detalle d-flex gap-2 justify-content-center mt-3">
      <detalle-contabilidad
        titulo="Ventas Hoy"
        icon="healthicons:bills-negative"
        :valor="totalPedidosHoy"
      />
      <detalle-contabilidad
        titulo="Gastos hoy "
        icon="healthicons:bills-negative"
        :valor="valorGastosHoy"
      />
      <detalle-contabilidad
        titulo="Bancolombia "
        icon="healthicons:bills-negative"
        :valor="valorPedidosBancoHoy('Bancolombia')"
      />
    </div>

    <h1>{{}}</h1>
    <tabs-contabilidad>
      <template #cuadreDiario>
        <tabla-denominacion />
      </template>
    </tabs-contabilidad>
  </div>
</template>

<script>
import { mapState } from "pinia";
import TablaDenominacion from "../components/contabilidad/TablaDenominacion.vue";
import TabsContabilidad from "../components/contabilidad/TabsContabilidad.vue";
import Navbar from "../components/Navbar.vue";
import { usePedidosStore } from "../store/pedidos";
import DetalleContabilidad from "../components/utils/DetalleContabilidad.vue";
import { useGastosHoy } from "../store/gastos";
export default {
  components: {
    TabsContabilidad,
    Navbar,
    TablaDenominacion,
    DetalleContabilidad,
  },
  computed: {
    ...mapState(usePedidosStore, [
      "totalPedidosHoy",
      "pedidosBancoHoy",
      "valorPedidosBancoHoy",
    ]),
    ...mapState(useGastosHoy, ["valorGastosHoy"]),
  },
};
</script>

<style scoped>
</style>