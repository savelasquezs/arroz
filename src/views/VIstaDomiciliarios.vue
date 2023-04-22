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
</template>

<script>
import { mapState } from "pinia";
import { useAuth } from "../store/auth";
import { usePedidosStore } from "../store/main";

export default {
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
  },
};
</script>

<style scoped>
</style>