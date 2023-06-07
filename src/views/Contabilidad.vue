<template>
  <navbar class="position-fixed" />
  <div class="contenido">
    <div class="detalle d-flex gap-2 justify-content-evenly my-3">
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
        v-for="entidad in bancoDatabase"
        :key="entidad.docId"
        :titulo="entidad.nombre"
        icon="healthicons:bills-negative"
        :valor="valorPedidosBancoHoy(entidad.nombre)"
      />

      <detalle-contabilidad
        titulo="Cuadre"
        icon="healthicons:bills-negative"
        :valor="cuadre"
        :class="cuadre < 0 ? 'text-danger' : cuadre == 0 ? 'text-success' : ''"
      />
    </div>
    <tabs-contabilidad>
      <template #cuadreDiario>
        <tabla-denominacion @cambioCuadre="cambiarValorCuadre" />
      </template>
      <template #totalesBancos>
        <totales-bancos />
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
import TotalesBancos from "../components/contabilidad/TotalesBancos.vue";
import { useBancos } from "../store/bancos";
export default {
  data() {
    return {
      cuadre: 0,
    };
  },
  components: {
    TabsContabilidad,
    Navbar,
    TablaDenominacion,
    DetalleContabilidad,
    TotalesBancos,
  },
  methods: {
    cambiarValorCuadre(cuadre) {
      this.cuadre = cuadre;
    },
  },
  computed: {
    ...mapState(usePedidosStore, [
      "totalPedidosHoy",
      "pedidosBancoHoy",
      "valorPedidosBancoHoy",
    ]),
    ...mapState(useGastosHoy, ["valorGastosHoy"]),
    ...mapState(useBancos, ["bancoDatabase"]),
  },
};
</script>

<style scoped>
</style>