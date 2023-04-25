<template>
  <Navbar class="position-fixed" />

  <Modal v-if="deletingCliente"
    ><Borrar
      :itemId="currentcliente.docId"
      collection="clientes"
      :itemName="currentcliente.nombre"
      v-if="deletingCliente"
  /></Modal>

  <Modal v-if="detalleCliente">
    <DetalleCliente v-if="detalleCliente" :cliente="currentcliente" />
  </Modal>
  <div class="container clientesCont contenido">
    <h2>Tabla de Clientes</h2>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button-add mensaje="Nuevo Cliente" @click="crearCliente" />
    </div>
    <div class="input-group mb-5 h-5">
      <input
        type="text"
        class="form-control"
        placeholder="  ...Buscar por Cedula"
        v-model="filtro"
        @keyup="filtradosClientes"
      />
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Cedula</th>

          <th>Nombre</th>
          <th>Telefono</th>
          <th>Dirección</th>
          <th>Valor Domi</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody v-if="filtrados">
        <tr
          v-for="(cliente, index) in filtrados"
          :key="index"
          @click.self="verDetalles(cliente.docId)"
        >
          <td>{{ cliente.cedula }}</td>

          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.numero }}</td>
          <td>{{ cliente.direccion }}</td>
          <td>{{ cliente.valorDomi }}</td>
          <td>
            <button
              class="btn btn-sm btn-info"
              @click="verDetalles(cliente.docId)"
            >
              <Icon
                icon="mdi:eye-outline"
                color="black"
                width="20"
                height="20"
              />
            </button>
            <button
              class="btn btn-sm btn-warning"
              @click="editarCliente(cliente.docId)"
            >
              <Icon
                icon="material-symbols:edit"
                color="black"
                width="20"
                height="20"
              />
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="borrarCliente(cliente.docId)"
            >
              <Icon icon="bi:trash-fill" color="black" width="20" height="20" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Borrar from "@/components/utils/Borrar.vue";
import Modal from "@/components/utils/Modal.vue";
import DetalleCliente from "@/components/clientes/DetalleCliente.vue";
import { Icon } from "@iconify/vue";

import { useClientesStore } from "../store/main";
import Navbar from "@/components/Navbar.vue";
import { mapState } from "pinia";
import buttonAdd from "../components/utils/buttonAdd.vue";
export default {
  name: "home",
  data() {
    return {
      filtro: "",
      filtrados: [],
    };
  },

  components: {
    Navbar,
    Borrar,
    Modal,
    DetalleCliente,
    Icon,
    buttonAdd,
  },
  methods: {
    filtradosClientes() {
      if (this.filtro == "") {
        this.filtrados = this.clientDatabase;
        return;
      } else {
        this.filtrados = this.clientDatabase.filter((cliente) =>
          cliente.cedula.toString().includes(this.filtro)
        );
        return;
      }

      console.log(this.filtrados);
    },
    toogleClienteForm() {
      useClientesStore().toggleClientForm();
    },
    crearCliente() {
      if (this.editClient) {
        useClientesStore().toggleEditCliente();
      }
      useClientesStore().toggleClientForm();
    },
    verDetalles(id) {
      useClientesStore().toggleDetalleCliente();
      useClientesStore().setCurrentCliente(id);
    },

    editarCliente(id) {
      this.toogleClienteForm();
      useClientesStore().setCurrentCliente(id);
      useClientesStore().toggleEditCliente();
    },
    borrarCliente(id) {
      useClientesStore().setCurrentCliente(id);
      useClientesStore().toggleDelete();
    },
  },
  computed: {
    ...mapState(useClientesStore, [
      "clientDatabase",
      "editClient",
      "currentcliente",
      "deletingCliente",
      "detalleCliente",
    ]),
  },
  watch: {
    clientDatabase() {
      this.filtradosClientes();
    },
  },

  created() {
    this.filtradosClientes();
  },
};
</script>

<style scoped>
hr {
  margin-bottom: 50px;
}
.clientesCont {
  padding-top: 100px;
}
tbody tr {
  cursor: pointer;
}
</style>
