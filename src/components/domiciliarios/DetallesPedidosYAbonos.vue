<template>
  <div class="card">
    <h3 class="text-capitalize text-center border-bottom mb-4 pb-2">
      {{ currentDomiciliario.nombreDomiciliario }}
    </h3>
    <tabs-domiciliario>
      <template #pedidos>
        <h4 class="text-center border-bottom pb-2 my-3">Pedidos</h4>
        <div>
          <button
            class="btn btn-warning"
            v-if="mostradosTodos"
            @click="mostrarHoy"
          >
            Ver pedidos de Hoy
          </button>
          <button class="btn btn-warning" v-else @click="mostrarTodos">
            Ver Todos Los Pedidos
          </button>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Dirección</th>
              <th>Valor Cobrado</th>
              <th>Valor Total</th>
              <th>Valor Domi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pedido in listaPedidos" :key="pedido.docId">
              <td>{{ fechaLocal(pedido.fecha) }}</td>
              <td>{{ pedido.cliente.direccion }}</td>
              <td>
                {{ pedido.pagoEfectivo }}
              </td>
              <td>
                {{ pedido.total }}
              </td>
              <td>{{ pedido.cliente.valorDomi }}</td>
            </tr>
          </tbody>
        </table>
      </template>
      <template #abonos>
        <h4 class="text-center border-bottom pb-2 my-3">Abonos</h4>
        <div>
          <button
            class="btn btn-warning"
            v-if="mostradosTodos"
            @click="mostrarHoy"
          >
            Ver Abonos de Hoy
          </button>
          <button class="btn btn-warning" v-else @click="mostrarTodos">
            Ver Todos Los Abonos
          </button>
        </div>
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Valor</th>
              <th>Comentario</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="abono in listaAbonos" :key="abono.docId">
              <td>{{ horaLocal(abono.fecha) }}</td>
              <td>{{ abono.valor }}</td>
              <td>{{ abono.comentario }}</td>
            </tr>
          </tbody>
        </table>
      </template>
    </tabs-domiciliario>

    <button class="btn btn-outline-danger" @click="cerrarModal">Cerrar</button>
  </div>
</template>

<script>
import { mapState } from "pinia";
import {
  useAbonos,
  useDetallesPedidosYAbonos,
  useDomiciliarios,
} from "../../store/domiciliario";
import { useUtilsStore } from "../../store/utils";
import { usePedidosStore } from "../../store/pedidos";
import moment from "moment";
import TabsDomiciliario from "./TabsDomiciliario.vue";
export default {
  components: { TabsDomiciliario },
  data() {
    return {
      mostradosTodos: null,
    };
  },
  methods: {
    mostrarHoy() {
      this.mostradosTodos = false;
    },
    mostrarTodos() {
      this.mostradosTodos = true;
    },
    cerrarModal() {
      useDetallesPedidosYAbonos().toggleDetallesYPedidos();
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
    horaLocal(fecha) {
      return useUtilsStore().horaYFechaLocal(fecha);
    },
  },
  computed: {
    ...mapState(useDomiciliarios, ["currentDomiciliario"]),
    ...mapState(useAbonos, ["allAbonos"]),
    ...mapState(usePedidosStore, ["pedidosDatabase"]),
    pedidosEntregados() {
      return this.pedidosDatabase.filter(
        (pedido) =>
          pedido.domiciliario.nombre ==
          this.currentDomiciliario.nombreDomiciliario
      );
    },
    pedidosHoy() {
      const pedidos = this.pedidosEntregados.filter(
        (pedido) =>
          moment(pedido.fecha).format("DD-MM-YYYY") ==
          moment().format("DD-MM-YYYY")
      );
      pedidos.forEach((pedido) => {
        console.log(pedido);
        console.log(moment(pedido.fecha).format("DD-MM-YYYY"));
      });

      return pedidos;
    },
    listaPedidos() {
      if (this.mostradosTodos) {
        return this.pedidosEntregados;
      }
      return this.pedidosHoy;
    },
    listaAbonos() {
      if (this.mostradosTodos) {
        return this.abonosDomiciliario;
      }
      return this.abonosDomiciliario.filter(
        (abono) =>
          moment(abono.fecha).format("DD-MM-YYYY") ==
          moment().format("DD-MM-YYYY")
      );
    },
    abonosDomiciliario() {
      return this.allAbonos.filter(
        (abono) =>
          abono.domiciliario.nombreDomiciliario ==
          this.currentDomiciliario.nombreDomiciliario
      );
    },
  },
};
</script>

<style scoped>
</style>