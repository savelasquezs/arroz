<template>
  <div class="card">
    <div class="card-body">
      <div class="container d-flex justify-content-between">
        <div class="left">
          <h2 class="text-center">{{ cliente.nombre }}</h2>
          <h4 class="text-center">{{ cliente.cedula }}</h4>
          <p class="text-center">{{ cliente.telefono }}</p>
          <p class="text-center">{{ cliente.direccion }}</p>
          <p class="text-center">{{ cliente.barrio }}</p>
          <p class="text-center">{{ cliente.notasDir }}</p>
          <p class="text-center">{{ cliente.valorDomi }}</p>
          <p class="text-center">{{ cliente.notasPedido }}</p>
        </div>

        <div class="right">
          <p>Numero de pedidos</p>
          <p>fecha ultimo pedido</p>
          <p>Producto favorito</p>
        </div>
      </div>
    </div>
    <div class="button-container d-flex justify-content-around">
      <button class="btn btn-xl btn-warning" @click="cerrarModal">
        cerrar
      </button>
      <button class="btn btn-xl btn-info" @click="editarModal">Editar</button>
    </div>
  </div>
</template>

<script>
import { useClientesStore } from "@/store/clientes";
import { useUtilsStore } from "@/store/utils";
import { mapState } from "pinia";
export default {
  name: "detalleCliente",
  props: ["cliente"],
  methods: {
    cerrarModal() {
      useClientesStore().toggleDetalleCliente();
    },
    editarModal() {
      useClientesStore().toggleDetalleCliente();
      useClientesStore().toggleEditCliente();
      useClientesStore().toggleClientForm();
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
    horaLocal(hora) {
      return useUtilsStore().horaLocal(hora);
    },
  },
  computed: {
    ...mapState(useClientesStore, [""]),
  },
};
</script>

<style scoped>
.card {
  min-width: 700px;
  padding: 30px;
}
</style>
