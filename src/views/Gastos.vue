<template>
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
</template>

<script>
import { Icon } from "@iconify/vue";
import TipoGastoForm from "../components/TipoGastoForm.vue";
import Tabs from "../components/Tabs.vue";
import Categorias from "../components/Categorias.vue";
import buttonAdd from "../components/buttonAdd.vue";
import TipoGasto from "../components/TipoGasto.vue";
import GastosHoy from "../components/GastosHoy.vue";
import GastosTodos from "../components/GastosTodos.vue";
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
  },
  methods: {},
};
</script>

<style scoped>
.gastosCont {
  padding-top: 100px;
}
</style>