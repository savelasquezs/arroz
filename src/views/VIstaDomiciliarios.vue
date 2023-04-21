<template>
  <div>Domiciliarios al ataque</div>
  <button @click="cerrarSesion" class="btn btn-danger">Cerrar Sesion</button>
</template>

<script>
import { useAuth } from "../store/auth";

export default {
  methods: {
    cerrarSesion() {
      useAuth().logout();
    },
  },
};
</script>

<style scoped>
</style>