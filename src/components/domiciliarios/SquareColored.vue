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
    <div class="pedidos">
      <div v-for="(order, index) in porEntregar" :key="index">
        <div
          class="pedido_container"
          :class="[colorClass(order), { selected: order.selected }]"
        >
          <label :for="'order-' + order.docId">
            <input
              type="checkbox"
              :id="'order-' + order.docId"
              :value="order"
              v-model="selectedOrders"
              @change="highlight(order)"
            />
            <div class="container">
              <h5>{{ order.cliente.nombre }}</h5>
              <p>{{ order.cliente.direccion }}</p>
              <p>{{ order.horaMesa }}</p>
              <p>Elapsed time: {{ elapsedTime(order) }}</p>
            </div>
          </label>
        </div>
      </div>
    </div>
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
export default {
  data() {
    return {
      selectedOrders: [],
    };
  },
  components: { buttonAdd, Modal, RegisterFormDomiciliarios },
  props: {
    porEntregar: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async asignarPedidos(domiciliario) {
      const domiciliosLlevados = [
        ...domiciliario.pedidosEntregados,
        ...this.selectedOrders,
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
      this.$refs.asignacion.cerrarModal();
    },
    authDomiciliario() {
      this.modal = true;
      useDomiciliarios().toggleloginFormOpened();
    },
    elapsedTime(order) {
      const now = new Date();
      const elapsedTimeInSeconds = Math.floor(
        (now - new Date(order.horaMesa)) / 1000
      );
      return elapsedTimeInSeconds;
    },
    highlight(order) {
      order.selected = !order.selected;
    },
    colorClass(order) {
      const elapsedTime = this.elapsedTime(order);
      if (elapsedTime < 10) {
        return "yellow";
      } else if (elapsedTime < 20) {
        return "yellowDark";
      } else if (elapsedTime < 30) {
        return "orange";
      } else if (elapsedTime < 40) {
        return "orangeDark";
      } else if (elapsedTime < 50) {
        return "fucsia";
      } else {
        return "red";
      }
    },
  },

  mounted() {
    this.timer = setInterval(() => {
      this.porEntregar.forEach((order) => {
        order.elapsedTime = this.elapsedTime(order);
      });
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
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
input[type="checkbox"] {
  display: none;
}
</style>
