<template>
  <div class="container d-flex justify-content-between mt-3">
    <div>Domiciliarios al ataque</div>
    <div class="d-flex justify-content-between">
      <h4 class="mx-3 my-0">
        {{ usuario }}
      </h4>
      <button @click="cerrarSesion" class="btn btn-outline-danger">
        Cerrar Sesion
      </button>
    </div>
  </div>

  <square-colored :porEntregar="porEntregar" />
</template>

<script>
import { mapState } from "pinia";
import { useAuth } from "../store/auth";
import { usePedidosStore } from "../store/main";
import SquareColored from "../components/domiciliarios/SquareColored.vue";
import Modal from "../components/utils/Modal.vue";
import RegisterFormDomiciliarios from "../components/domiciliarios/registerFormDomiciliarios.vue";

export default {
  data() {
    return {
      selectedOrders: [],
      modal: null,
 
    };
  },
  methods: {
    cerrarSesion() {
      console.log("Diablos señorita");
      useAuth().logout();
    },
    printSelected() {
      console.log(this.selectedOrders);
    },
    filtrar() {
      return this.pedidosDatabase.filter((pedido) => pedido.enMesa);
    },
  },
  components: { SquareColored, Modal, RegisterFormDomiciliarios },
  computed: {
    usuario() {
      return localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
            .displayName.split(" ")
            .map((word) => word[0].toUpperCase() + word.substring(1))
            .join(" ")
        : "";
    },
    ...mapState(usePedidosStore, ["pedidosDatabase"]),
    porEntregar() {
      const filtrados = this.filtrar();
      return filtrados;
    },
  },

  watch: {
    pedidosDatabase() {
      this.filtrar();
    },
  },
};
</script>

<style scoped>
</style>