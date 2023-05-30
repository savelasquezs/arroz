<template>
  <h3 class="text-center mt-2 pb-2 border-bottom" v-if="!todosMostrados">
    Domiciliarios de hoy
  </h3>
  <h3 class="text-center mt-2 pb-2 border-bottom" v-else>
    Todos los domiciliarios
  </h3>
  <div class="domis-container">
    <button
      class="btn btn-outline-dark w-100"
      @click="todosMostrados = !todosMostrados"
      v-if="!todosMostrados"
    >
      Ver Todos los domiciliarios
    </button>
    <button
      class="btn btn-outline-dark w-100"
      @click="todosMostrados = !todosMostrados"
      v-else
    >
      Ver domiciliarios Hoy
    </button>
    <div
      class="m-3 domi_container rounded-3"
      v-for="(persona, index) in domiciliariosArray"
      :key="index"
      :persona="persona"
    >
      <input
        type="radio"
        name="domiSelected"
        :id="persona.docId"
        :value="persona.nombreDomiciliario"
        ref="radio"
        @change="highlight(persona)"
      />
      <label
        :for="persona.docId"
        class="d-flex justify-content-center align-items-center"
      >
        <domiciliario-avatar />
        <div class="d-grid mx-3">
          <h5 class="m-0 pt-3">
            {{ persona.nombreDomiciliario }}
          </h5>
          <p class="cuentaPedidos m-0 pb-3">
            {{ todosPedidosDomiciliario(persona.nombreDomiciliario).length }}
            pedidos entregados en total.
          </p>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DomiciliarioAvatar from "../icons/domiciliarioAvatar.vue";
import { mapState } from "pinia";
import { usePedidosStore } from "../../store/pedidos";
import { useDomiciliarios } from "../../store/domiciliario";

export default {
  data() {
    return {
      todosMostrados: null,
    };
  },
  props: ["listaDomiciliarios"],
  components: { DomiciliarioAvatar },
  methods: {
    pedidosDomiciliarioHoy(nombreDomiciliario) {
      return this.pedidosHoy.filter(
        (pedido) => pedido.domiciliario.nombre == nombreDomiciliario
      );
    },
    todosPedidosDomiciliario(nombreDomiciliario) {
      return this.pedidosDatabase.filter(
        (pedido) => pedido.domiciliario?.nombre == nombreDomiciliario
      );
    },

    highlight(persona) {
      console.log(this.domiciliariosHoy);
      this.$refs.radio.forEach((radio) => {
        if (radio.checked) {
          radio.parentNode.classList.add("selected");
          this.$emit("selected", persona);
          return;
        }
        radio.parentNode.classList.remove("selected");
      });
    },
  },
  computed: {
    ...mapState(usePedidosStore, ["pedidosDatabase"]),
    ...mapState(useDomiciliarios, ["currentDomiciliario"]),
    pedidosHoy() {
      return this.pedidosDatabase.filter(
        (pedido) =>
          moment(pedido.fecha).valueOf() >= moment().startOf("day").valueOf() &&
          moment(pedido.fecha).valueOf() <= moment().endOf("day").valueOf()
      );
    },

    totalPedidosDomiciliario() {},
    domiciliariosHoy() {
      return this.listaDomiciliarios.filter((domiciliario) =>
        this.pedidosHoy.some(
          (pedido) =>
            pedido.domiciliario.nombre == domiciliario.nombreDomiciliario
        )
      );
    },
    domiciliariosArray() {
      if (this.todosMostrados) {
        return this.listaDomiciliarios;
      }
      return this.domiciliariosHoy;
    },
  },
};
</script>

<style scoped>
.cuentaPedidos {
  opacity: 0.5;
  color: gray;
}
input[type="radio"] {
  display: none;
}
label {
  cursor: pointer;
}
.selected {
  box-shadow: 1px 9px 16px 13px #d7c6f9 !important;
}
.domi_container {
  box-shadow: 0 0.125rem 0.25rem rgba(#000, 0.075);
}
.domi_container:hover {
  box-shadow: 1px 9px 16px 13px rgba(0, 0, 0, 0.1);
}
.domi_container:focus-visible {
  box-shadow: 1px 9px 16px 13px rgba(0, 0, 0, 0.1) !important;
}
h5 {
  text-transform: capitalize;
}
.domis-container {
  height: 80vh;
  overflow-y: scroll;
}
p {
  font-size: 0.8rem;
}
</style>