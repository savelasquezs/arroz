<template>
  <Modal v-if="pedidoFormOpen"><PedidosForm /></Modal>
  <Modal v-if="detallePedidoAbierto">
    <DetallePedido v-if="detallePedidoAbierto" :pedido="currentPedido" />
  </Modal>
  <Modal v-if="deletingPedido"
    ><Borrar
      :itemId="currentPedido.docId"
      collection="pedidos"
      :itemName="currentPedido.cliente.nombre"
      v-if="deletingPedido"
  /></Modal>

  <div class="container clientesCont">
    <h2>Tabla de Pedidos</h2>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button
        class="btn btn-danger"
        @click="borrarfiltros"
        v-if="date || filtroPorNombre"
      >
        <Icon icon="game-icons:broom" color="white" width="30" height="30" />
        Borrar filtros
      </button>
      <button-add mensaje="Nuevo Pedido" @click="createPedido" />
    </div>
    <div class="row">
      <div class="mb-5 col">
        <input
          type="text"
          v-model="filtroPorNombre"
          @keyup="filtrar"
          class="form-control"
          placeholder="  ...Filtra por Nombre"
        />
      </div>
      <div class="col">
        <VueDatePicker
          placeholder="Filtra por Fecha"
          range
          v-model="date"
          close-on-scroll
          auto-apply
          :highlight-week-days="[3]"
          hide-offset-dates
          :year-range="[2023, 2100]"
          :enable-time-picker="false"
          format="dd/MM/yyyy"
          locale="es"
          :preset-ranges="presetDateRanges"
          ><template #yearly="{ label, range, presetDateRange }">
            <span @click="presetDateRange(range)">{{ label }}</span>
          </template></VueDatePicker
        >
      </div>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Direccion</th>
          <th>Valor</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pedido, index) in filtrados" :key="index">
          <td>{{ pedido.cliente.nombre }}</td>
          <td>{{ pedido.cliente.direccion.split(",")[0] }}</td>
          <td>{{ pedido.total }}</td>
          <td align="center" @click="actualizarEstado(pedido.docId)">
            <span v-if="pedido.enPreparacion"
              ><Icon
                icon="mdi:pot-steam"
                color="#7e0000"
                width="20"
                height="20"
            /></span>
            <span v-if="pedido.enCamino"
              ><Icon
                icon="mdi:delivery-dining-electric"
                color="green"
                width="20"
                height="20"
            /></span>
            <span v-if="pedido.enMesa"
              ><Icon
                icon="material-symbols:table-restaurant"
                color="orange"
                width="20"
                height="20"
            /></span>

            <span v-if="pedido.entregado">
              <Icon icon="healthicons:happy" width="20" height="20" />
              <Icon
                icon="material-symbols:check"
                color="green"
                width="20"
                height="20"
              />c
            </span>
          </td>
          <td>{{ fechaLocal(pedido.horaToma) }}</td>
          <td>{{ horaLocal(pedido.horaToma) }}</td>
          <td>
            <button
              class="btn btn-sm btn-info"
              @click="verDetalles(pedido.docId)"
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
              @click="editarPedido(pedido.docId)"
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
              @click="borrarPedido(pedido.docId)"
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
import ButtonAdd from "../components/buttonAdd.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { useClientesStore } from "../store/main";
import ClienteForm from "@/components/ClienteForm.vue";
import DetallePedido from "@/components/DetallePedido.vue";
import Modal from "@/components/Modal.vue";
import PedidosForm from "@/components/PedidosForm.vue";
import { mapState } from "pinia";
import { usePedidosStore, useUtilsStore } from "@/store/main";
import { Icon } from "@iconify/vue";
import moment from "moment";
import Borrar from "@/components/Borrar.vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseInit.js";

import {
  endOfMonth,
  endOfYear,
  startOfMonth,
  startOfYear,
  subMonths,
} from "date-fns";
export default {
  name: "home",
  data() {
    return {
      filtroPorNombre: "",
      date: "",
      presetDateRanges: [
        { label: "Hoy", range: [new Date(), new Date()] },
        {
          label: "Ayer",
          range: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        },
        {
          label: "Este Mes",
          range: [startOfMonth(new Date()), endOfMonth(new Date())],
        },
        {
          label: "Mes Pasado",
          range: [
            startOfMonth(subMonths(new Date(), 1)),
            endOfMonth(subMonths(new Date(), 1)),
          ],
        },
        {
          label: "Este Año",
          range: [startOfYear(new Date()), endOfYear(new Date())],
        },
      ],
      filtrados: [],
    };
  },

  components: {
    Modal,
    PedidosForm,
    ClienteForm,
    Icon,
    Borrar,
    DetallePedido,
    VueDatePicker,
    ButtonAdd,
  },
  computed: {
    ...mapState(usePedidosStore, [
      "pedidoFormOpen",
      "pedidosDatabase",
      "deletingPedido",
      "currentPedido",
      "detallePedidoAbierto",
    ]),
  },
  methods: {
    borrarfiltros() {
      this.date = "";
      this.filtroPorNombre = "";
    },
    createPedido() {
      usePedidosStore().tooglePedidoFormOpen();
    },

    filtrar() {
      if (!this.date && this.filtroPorNombre == "") {
        console.log("vacios");
        console.log(this.pedidosDatabase);
        this.filtrados = [...this.pedidosDatabase];
        console.log(this.filtrados[0]);
        return;
      }
      if (!this.date && this.filtroPorNombre !== "") {
        this.filtrados = this.pedidosDatabase.filter((pedido) =>
          pedido.cliente.nombre
            .toLowerCase()
            .includes(this.filtroPorNombre.toLocaleLowerCase())
        );
        return;
      }

      this.filtrados = this.pedidosDatabase.filter(
        (pedido) =>
          moment(pedido.horaToma).valueOf() >=
            moment(this.date[0]).subtract(1, "days").valueOf() &&
          moment(pedido.horaToma).valueOf() <= moment(this.date[1]).valueOf() &&
          pedido.cliente.nombre
            .toLowerCase()
            .includes(this.filtroPorNombre.toLocaleLowerCase())
      );
    },
    borrarPedido(id) {
      usePedidosStore().setCurrentPedido(id);
      usePedidosStore().toggleDelete();
    },
    editarPedido(id) {
      usePedidosStore().setCurrentPedido(id);
      usePedidosStore().toggleEditPedido();
      usePedidosStore().tooglePedidoFormOpen();
    },
    verDetalles(id) {
      console.log(id);
      console.log(this.detallePedidoAbierto);
      usePedidosStore().setCurrentPedido(id);
      usePedidosStore().toggleDetallePedidoAbierto();
    },
    siguienteEstado(id) {
      return usePedidosStore().siguienteEstado(id);
    },
    async actualizarEstado(id) {
      const docRef = await doc(db, "pedidos", id);
      await updateDoc(docRef, this.siguienteEstado(id));
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
    horaLocal(hora) {
      return useUtilsStore().horaLocal(hora);
    },
  },
  watch: {
    pedidosDatabase() {
      this.filtrar();
    },
    date() {
      this.filtrar();
    },
  },
  created() {
    this.filtrar();
  },
};
</script>

<style scoped>
hr {
  margin-bottom: 50px;
}
.clientesCont {
  padding-top: 100px;
}
</style>
