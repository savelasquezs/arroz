<template>
  <modal v-if="formOpenned || deletingGasto">
    <gasto-hoy-form v-if="formOpenned" />
    <borrar
      v-if="deletingGasto"
      collection="Gastos"
      :itemId="currentGasto.docId"
      :itemName="currentGasto.gasto.nombre"
    />
  </modal>
  <div class="container clientesCont">
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button-add mensaje="Nuevo Gasto" @click="toggleModal" />
    </div>
  </div>

  <div class="container clientesCont">
    <h2>{{ titulo }}</h2>
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
        <tr v-for="(gasto, index) in listaGastos" :key="index">
          <td>{{ fechaLocal(gasto.fecha) }}</td>
          <td class="text-capitalize">{{ gasto.gasto.categoria }}</td>
          <td class="text-capitalize">{{ gasto.gasto.nombre }}</td>
          <td>{{ gasto.cantidad }}</td>
          <td>{{ gasto.valorTotal }}</td>
          <td>{{ gasto.valorUnitario }}</td>
          <td>{{ gasto.comentario }}</td>

          <td>
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
import buttonAdd from "../utils/buttonAdd.vue";
import { mapState } from "pinia";
import { useGastosHoy } from "../../store/gastos";
import Modal from "../utils/Modal.vue";
import GastoHoyForm from "./GastoHoyForm.vue";
import { useUtilsStore } from "../../store/utils";
import { Icon } from "@iconify/vue";
import Borrar from "../utils/Borrar.vue";
export default {
  data() {
    return {};
  },
  props: ["titulo", "listaGastos"],
  components: {
    buttonAdd,
    Modal,
    GastoHoyForm,
    Icon,
    Borrar,
  },
  methods: {
    toggleModal() {
      useGastosHoy().toggleForm();
      console.log(this.allGastos);
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
    borrarGasto(id) {
      useGastosHoy().setCurrent(id);
      useGastosHoy().toggleDeleting();
    },
    editarGasto(id) {
      useGastosHoy().setCurrent(id);
      useGastosHoy().toggleEditing();
      useGastosHoy().toggleForm();
    },
  },
  computed: {
    ...mapState(useGastosHoy, [
      "allGastos",
      "deletingGasto",
      "formOpenned",
      "currentGasto",
    ]),
  },
};
</script>

<style scoped>
</style>