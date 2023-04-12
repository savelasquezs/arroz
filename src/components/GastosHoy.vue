<template>
  <modal v-if="formOpenned">
    <gasto-hoy-form v-if="formOpenned" />
  </modal>
  <div class="container clientesCont">
    <h5>Gastos de hoy {{ hoy }}</h5>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button-add mensaje="Nuevo Gasto" @click="toggleModal" />
    </div>
  </div>

  <div class="container clientesCont">
    <h2>Tabla de gastos</h2>
    <hr />

    <table class="table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Categoria</th>
          <th>Nombre Gasto</th>
          <th>Cantidad</th>
          <th>Valor total</th>
          <th>Valor unitario</th>
          <th>Comentarios</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(gasto, index) in allGastos" :key="index">
          <td>{{ fechaLocal(gasto.fecha) }}</td>
          <td>{{ gasto.gasto.categoria }}</td>
          <td>{{ gasto.gasto.nombre }}</td>
          <td>{{ gasto.cantidad }}</td>
          <td>{{ gasto.valorTotal }}</td>
          <td>{{ gasto.valorUnitario }}</td>
          <td>{{ gasto.comentario }}</td>

          <td>
            <button
              class="btn btn-sm btn-info"
              @click="verDetalles(gasto.docId)"
            >
              <Icon
                icon="mdi:eye-outline"
                color="black"
                width="20"
                height="20"
              />
            </button>
            <button
              class="btn btn-sm btn-warning"
              @click="editarGasto(gasto.docId)"
            >
              <Icon
                icon="material-symbols:edit"
                color="black"
                width="20"
                height="20"
              />
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="borrarGasto(gasto.docId)"
            >
              <Icon icon="bi:trash-fill" color="black" width="20" height="20" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("es");
import buttonAdd from "./buttonAdd.vue";
import { mapState } from "pinia";
import { useGastosHoy } from "../store/gastos";
import Modal from "./Modal.vue";
import GastoHoyForm from "./GastoHoyForm.vue";
import { useUtilsStore } from "../store/main";
import { Icon } from "@iconify/vue";
export default {
  data() {
    return {};
  },
  components: {
    buttonAdd,
    Modal,
    GastoHoyForm,
    Icon,
  },
  methods: {
    toggleModal() {
      useGastosHoy().toggleForm();
      console.log(this.allGastos);
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
  },
  computed: {
    ...mapState(useGastosHoy, [
      "allGastos",
      "deletingGasto",
      "editingGasto",
      "currentGasto",
      "formOpenned",
    ]),
    hoy() {
      return moment().format("DD/MM/YY");
    },
  },
};
</script>

<style scoped>
</style>