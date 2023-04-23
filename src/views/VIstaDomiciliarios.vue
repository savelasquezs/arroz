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
  <div class="pedidos container">
    <square-colored v-for="(pedido, index) in porEntregar" :key="index" />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAuth } from "../store/auth";
import { usePedidosStore } from "../store/main";
import SquareColored from "../components/domiciliarios/SquareColored.vue";

export default {
  components: { SquareColored },
  methods: {
    cerrarSesion() {
      useAuth().logout();
    },
  },
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
  methods: {
    filtrar() {
      return this.pedidosDatabase.filter((pedido) => pedido.enMesa);
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