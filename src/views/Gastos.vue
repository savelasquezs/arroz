<template>
  <gasto-form />
  <div class="container gastosCont">
    <h2>Gastos</h2>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end"></div>
  </div>
  <div class="card px-5 py-3">
    <tabs>
      <template #gastosDia>
        <button-add
          class="float-end mt-3"
          mensaje="Nuevo Gasto de hoy"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasTop"
          aria-controls="offcanvasTop"
        />
        <h1>del</h1>
      </template>
      <template #todos>
        <h1>todos</h1>
      </template>
      <template #tipos>
        <h1>tipos</h1>
      </template>
      <template #categorias><categorias /> </template>
    </tabs>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import GastoForm from "../components/gastoForm.vue";
import Tabs from "../components/Tabs.vue";
import Categorias from "../components/Categorias.vue";
import buttonAdd from '../components/buttonAdd.vue';
export default {
  components: { Icon, GastoForm, Tabs, Categorias, buttonAdd },
  methods: {},
};
</script>

<style scoped>
.gastosCont {
  padding-top: 100px;
}
</style>