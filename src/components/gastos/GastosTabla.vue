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
          <th>Pago</th>
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
          <td>
            <Icon
              icon="bi:cash-coin"
              color="#198754"
              width="20"
              v-if="gasto.origen == 'Caja'"
            />
            <img v-else :src="imagenBanco(gasto.origen)" alt="" width="20" />
          </td>
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
import { useBancos } from "../../store/bancos";

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
    imagenBanco(banco) {
      return this.bancoDatabase.find((entidad) => entidad.nombre == banco)
        ?.imageUrl;
    },
    toggleModal() {
      useGastosHoy().toggleForm();
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
    ...mapState(useBancos, ["bancoDatabase"]),
  },
};
</script>

<style scoped>
</style>