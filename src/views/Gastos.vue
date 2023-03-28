<template>
  <gasto-form />
  <div class="container gastosCont">
    <h2>Tabla de Gastos</h2>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button-add
        mensaje="Nuevo Gasto"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasTop"
        aria-controls="offcanvasTop"
      />
    </div>
  </div>
  <h3></h3>
</template>

<script>
import { Icon } from "@iconify/vue";
import GastoForm from "../components/gastoForm.vue";
import buttonAdd from "../components/buttonAdd.vue";
export default {
  components: { Icon, GastoForm, buttonAdd },
};
</script>

<style scoped>
.gastosCont {
  padding-top: 100px;
}
</style>