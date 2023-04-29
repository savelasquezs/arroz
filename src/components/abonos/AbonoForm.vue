<template>
  <div class="card">
    <h4 class="text-center">Abonar</h4>
    <div class="form-floating mb-3">
      <input
        type="number"
        class="form-control"
        id="floatingInput"
        v-model="abono"
        placeholder="Valor del abono"
        autocomplete="off"
      />
      <label for="floatingInput">Valor del abono</label>
    </div>
    <div class="d-flex justify-content-between mt-3">
      <button class="btn btn-success" @click.prevent="agregarAbono">
        Agregar
      </button>
      <button class="btn btn-danger" @click.prevent="cerrarModal">Salir</button>
    </div>
  </div>
</template>

<script>
import { useAbonos } from "../../store/domiciliario";
export default {
  props: ["user"],
  data() {
    return {
      abono: null,
    };
  },
  methods: {
    cerrarModal() {
      useAbonos().toogleAbonoForm();
    },
    agregarAbono() {
      const data = {
        valor: this.abono,
      };
    },
  },
};
</script>

<style scoped>
</style>