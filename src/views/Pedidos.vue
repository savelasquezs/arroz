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
  <Navbar class="position-fixed" />

  <div class="container clientesCont contenido">
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
          <th>Domiciliario</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Pago</th>
          <th>Liquidado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(pedido, index) in getPedidos(
            filtroPorNombre,
            date[0],
            date[1]
          )"
          :key="index"
          :class="pedido.pagoConfirmado ? 'bg-success-subtle' : ''"
        >
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
          <td>{{ pedido.domiciliario?.nombre }}</td>
          <td>{{ fechaLocal(pedido.horaToma) }}</td>
          <td>{{ horaLocal(pedido.horaToma) }}</td>
          <td class="">
            <Icon
              icon="bi:cash-coin"
              color="#198754"
              width="20"
              v-if="pedido.pagoEfectivo > 0"
            />
            <span v-for="(pago, index) in pedido?.pagoOnline" :key="index">
              <img
                v-if="pago.banco == 'Bancolombia'"
                src="/src/assets/img/bancolombia_tiny.png"
                alt=""
                width="20"
              />
              <img
                v-if="pago.banco == 'Nequi'"
                src="/src/assets/img/nequi_tiny.png"
                alt=""
                width="20"
              />
              <img
                v-if="pago.banco == 'Didi'"
                src="/src/assets/img/didi_tiny.png"
                alt=""
                width="20"
              />
            </span>
          </td>
          <td>
            <input
              v-if="
                pedido['liquidado'] != null || pedido['pagoConfirmado'] != null
              "
              type="checkbox"
              name="App"
              id=""
              class="border m-2"
              @change="
                pedido['liquidado'] != null
                  ? ActualizarLiquidado(pedido.docId)
                  : actualizarPagoConfimado(pedido.docId)
              "
              :checked="
                pedido['liquidado'] != null
                  ? pedido.liquidado
                  : pedido.pagoConfirmado
              "
            />
            <span
              v-if="
                pedido['liquidado'] != null || pedido['pagoConfirmado'] != null
              "
              :class="
                pedido.liquidado || pedido.pagoConfirmado
                  ? 'text-success'
                  : 'text-danger'
              "
              >{{
                pedido.liquidado
                  ? "Liquidado"
                  : pedido.liquidado == false
                  ? "Sin Liquidar"
                  : pedido.pagoConfirmado
                  ? "PagoConfirmado"
                  : "Sin Confirmar"
              }}</span
            >
          </td>
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
import ButtonAdd from "../components/utils/buttonAdd.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import DetallePedido from "@/components/pedido/DetallePedido.vue";
import Modal from "@/components/utils/Modal.vue";
import PedidosForm from "@/components/pedido/PedidosForm.vue";
import { mapState } from "pinia";
import { usePedidosStore } from "@/store/pedidos";
import { useUtilsStore } from "@/store/utils";
import { Icon } from "@iconify/vue";
import moment from "moment";
import Borrar from "@/components/utils/Borrar.vue";

import Navbar from "../components/Navbar.vue";
import ClienteForm from "../components/clientes/ClienteForm.vue";

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
    Navbar,
  },
  computed: {
    ...mapState(usePedidosStore, [
      "pedidoFormOpen",
      "pedidosDatabase",
      "deletingPedido",
      "currentPedido",
      "detallePedidoAbierto",
      "getPedidos",
    ]),
  },
  methods: {
    ActualizarLiquidado(id) {
      usePedidosStore().actualizarLiquidado(id);
    },
    actualizarPagoConfimado(id) {
      usePedidosStore().actualizarPagoConfimado(id);
    },
    borrarfiltros() {
      this.date = "";
      this.filtroPorNombre = "";
    },
    createPedido() {
      usePedidosStore().tooglePedidoFormOpen();
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

    async actualizarEstado(id) {
      usePedidosStore().actualizarEstado(id);
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
    horaLocal(hora) {
      return useUtilsStore().horaLocal(hora);
    },
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
