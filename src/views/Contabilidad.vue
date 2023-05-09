<template>
  <navbar class="position-fixed" />
  <div class="contenido">
    <tabs-contabilidad>
      <template #cuadreDiario>
        <tabla-denominacion />
      </template>
    </tabs-contabilidad>
  </div>
</template>

<script>
import TablaDenominacion from "../components/contabilidad/TablaDenominacion.vue";
import TabsContabilidad from "../components/contabilidad/TabsContabilidad.vue";
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    TabsContabilidad,
    Navbar,
    TablaDenominacion,
  },
};
</script>

<style scoped>
</style>