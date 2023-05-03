<template>
  <div class="domis-container">
    <div
      class="m-3 domi_container rounded-3"
      v-for="(persona, index) in domiciliariosHoy"
      :key="index"
      :persona="persona"
      @selected="setDomiSelected"
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
            {{ persona.pedidosEntregados?.length }} pedidos entregados en total.
          </p>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import DomiciliarioAvatar from "../icons/domiciliarioAvatar.vue";

export default {
  props: ["listaDomiciliarios"],
  components: { DomiciliarioAvatar },
  methods: {
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
    domiciliariosHoy() {
      return this.listaDomiciliarios.filter((domiciliario) =>
        domiciliario.pedidosEntregados.some(
          (pedido) =>
            moment(pedido.fecha).valueOf() >=
              moment().startOf("day").valueOf() &&
            moment(pedido.fecha).valueOf() <= moment().endOf("day").valueOf()
        )
      );
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