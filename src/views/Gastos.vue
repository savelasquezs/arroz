<template>
  <Navbar class="position-fixed" />
  <div class="contenido">
    <tipo-gasto-form ref="formTipoGasto" />

    <div class="container gastosCont">
      <h2>Gastos</h2>
      <hr />
      <div class="input-group mb-3 d-flex justify-content-end"></div>
    </div>
    <div class="card px-5 py-3">
      <tabs>
        <template #gastosDia>
          <gastos-hoy />
        </template>
        <template #todos>
          <gastos-todos />
        </template>
        <template #categorias><categorias /> </template>
        <template #tipos>
          <tipo-gasto />
        </template>
      </tabs>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import TipoGastoForm from "../components/gastos/TipoGastoForm.vue";
import Tabs from "../components/utils/Tabs.vue";
import Categorias from "../components/gastos/Categorias.vue";
import buttonAdd from "../components/utils/buttonAdd.vue";
import TipoGasto from "../components/gastos/TipoGasto.vue";
import GastosHoy from "../components/gastos/GastosHoy.vue";
import GastosTodos from "../components/gastos/GastosTodos.vue";
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Icon,
    TipoGastoForm,
    Tabs,
    Categorias,
    buttonAdd,
    TipoGasto,
    GastosHoy,
    GastosTodos,
    Navbar,
  },
  methods: {},
};
</script>

<style scoped>
.gastosCont {
  padding-top: 100px;
}
</style>