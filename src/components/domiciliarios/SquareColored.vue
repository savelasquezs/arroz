<template>
  <modal v-if="registerFormOpened || loginFormOpened">
    <register-form-domiciliarios
      ref="asignacion"
      v-if="loginFormOpened"
      @domiAuthenticado="asignarPedidos"
    />
    <register-form-domiciliarios v-if="registerFormOpened" :registro="true" />
  </modal>
  <div class="container mt-5">
    <div
      class="input-group mb-3 d-flex justify-content-end"
      v-if="selectedOrders.length > 0"
    >
      <button class="btn btn-outline-success btn-lg" @click="authDomiciliario">
        llevar
      </button>
    </div>
    <div class="pedidos" v-if="porEntregar.length > 0">
      <individual
        v-for="(order, index) in porEntregar"
        :key="index"
        :order="order"
        @pedidoSelected="adicionarSelected"
        @pedidoUnselected="sacarSelected"
      />
    </div>
    <searching-icon mensaje="No hay pedidos para entregar" v-else />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useDomiciliarios } from "../../store/domiciliario";
import buttonAdd from "../utils/buttonAdd.vue";
import Modal from "../utils/Modal.vue";
import RegisterFormDomiciliarios from "./registerFormDomiciliarios.vue";
import { useUtilsGastos } from "../../store/gastos";
import { usePedidosStore } from "../../store/main";
import Individual from "./individual.vue";
import SearchingIcon from "../icons/searchingIcon.vue";
export default {
  data() {
    return {
      selectedOrders: [],
    };
  },
  components: {
    buttonAdd,
    Modal,
    RegisterFormDomiciliarios,
    Individual,
    SearchingIcon,
  },
  props: {
    porEntregar: {
      type: Array,
      required: true,
    },
  },
  methods: {
    adicionarSelected(order) {
      if (!this.selectedOrders.some((pedido) => pedido.docId == order.docId)) {
        this.selectedOrders.push(order);
        return;
      }
      console.log("El pedido ya esta seleccionado");
    },
    sacarSelected(order) {
      this.selectedOrders = this.selectedOrders.filter(
        (pedido) => pedido.docId !== order.docId
      );
    },
    async asignarPedidos(domiciliario) {
      const orderToAdicionar = [];
      this.selectedOrders = this.selectedOrders.map((order) => {
        return {
          docId: order.docId,
          valorDomi: order.cliente.valorDomi,
          cliente: order.cliente.nombre,
          direccion: order.cliente.direccion,
          fecha: order.fecha,
          horaCamino: order.horaCamino,
          horaMesa: order.horaMesa,
          total: order.total,
        };
      });
      this.selectedOrders.forEach((order) => {
        if (
          !domiciliario.pedidosEntregados.some(
            (pedido) => pedido.docId == order.docId
          )
        ) {
          orderToAdicionar.push(order);
        }
      });
      const domiciliosLlevados = [
        ...domiciliario.pedidosEntregados,
        ...orderToAdicionar,
      ];
      const data = {
        pedidosEntregados: domiciliosLlevados,
      };
      await useUtilsGastos().updateElement(
        data,
        "domiciliarios",
        domiciliario.docId
      );
      const domiCorto = {
        nombre: domiciliario.nombreDomiciliario,
        docId: domiciliario.docId,
      };
      this.selectedOrders.forEach((order) => {
        usePedidosStore().actualizarEstado(order.docId, domiCorto);
      });
      this.selectedOrders = [];
      this.$refs.asignacion.cerrarModal();
    },
    authDomiciliario() {
      this.modal = true;
      useDomiciliarios().toggleloginFormOpened();
    },
  },
  computed: {
    ...mapState(useDomiciliarios, [
      "registerFormOpened",
      "loginFormOpened",
      "allDomiciliarios",
    ]),
  },
};
</script>

<style scoped>
.pedidos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 50px;
  justify-content: center;
  justify-items: center;
}
.selected {
  box-shadow: -1px 1px 8px 10px rgba(170, 184, 230, 1) !important;
}

.pedido_container {
  height: 200px;
  width: 200px;
  background: red;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  animation-name: bg;
}

.yellow {
  background: #c0eda6;
}
.yellowDark {
  background: #fff7bc;
}
.orange {
  background: #ff8080;
}
.orangeDark {
  background: #fd5d5d;
}
.fucsia {
  background: #ff0075;
}
.red {
  background: red;
}
</style>
