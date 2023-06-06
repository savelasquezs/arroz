<template>
  <section class="cliente border p-3 my-3 rounded-2 w-50 shadow">
    <div class="d-flex justify-content-between">
      <h4>Cliente</h4>
      <button
        class="btn btn-info"
        v-show="clienteCompleto"
        @click.prevent="editarCliente(currentcliente.docId)"
      >
        <Icon
          icon="material-symbols:edit"
          color="black"
          width="24"
          height="24"
        />
      </button>
    </div>
    <hr />
    <div class="row">
      <div class="mb-2 col list-container">
        <label for="numero" class="form-label">Cedula</label>
        <button
          class="btn btn-sm btn-outline-success float-end"
          v-if="
            filtradosClientesArray(filtroClientes).length == 0 &&
            filtroClientes !== ''
          "
          @click.prevent="createCliente"
        >
          <Icon icon="mdi:create-new-folder" color="white" />
          Crear Cliente
        </button>

        <input
          required
          type="number"
          class="form-control"
          id="cedula"
          v-model="filtroClientes"
          autocomplete="off"
          @keydown="searchingCliente = true"
          @blur="hideButtons"
        />

        <div class="list-group lista" v-if="searchingCliente">
          <button
            type="button"
            class="list-group-item list-group-item-action btn-filtro"
            v-for="(cliente, index) in filtradosClientesArray(filtroClientes)"
            :key="index"
            @click="setcliente(cliente.docId)"
          >
            {{ cliente.cedula }}
          </button>
        </div>
      </div>
      <div class="mb-2 col" v-show="clienteCompleto">
        <label for="numero" class="form-label">Telefono</label
        ><input
          required
          type="text"
          class="form-control"
          id="numero"
          :value="currentcliente.numero"
          @keyup="changedDefaultInputs"
        />
      </div>
      <div class="mb-2 col" v-show="clienteCompleto">
        <label for="nombre" class="form-label">Nombre</label
        ><input
          required
          type="text"
          class="form-control"
          id="nombre"
          :value="currentcliente.nombre"
          @keyup="changedDefaultInputs"
        />
      </div>
    </div>
    <div class="cliente-data" v-show="clienteCompleto">
      <div class="row">
        <div class="mb-2">
          <label for="direccion" class="form-label">Dirección</label
          ><input
            required
            type="text"
            class="form-control"
            id="direccionCompleta"
            :value="direccionCompleta"
            @keyup="changedDefaultInputs"
          />
        </div>
      </div>
      <div class="mb-2">
        <label for="notasPedidos" class="form-label">Notas Pedidos</label
        ><input
          type="text"
          class="form-control"
          id="notasPedido"
          placeholder="cucharas, sin pimenton...."
          :value="currentcliente.notasPedido"
          @keyup="changedDefaultInputs"
        />
      </div>
      <div class="mb-2">
        <label for="valorDomi" class="form-label">Valor del domi</label
        ><input
          required
          type="number"
          class="form-control"
          id="valorDomi"
          :value="currentcliente.valorDomi"
          @keyup="changedDefaultInputs"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "pinia";
import { useClientesStore } from "../../store/clientes";
import { Icon } from "@iconify/vue";
export default {
  emits: ["cambio"],
  data() {
    return {
      filtroClientes: "",
      searchingCliente: null,
      clienteCompleto: null,
      clienteParaEnviar: {},
    };
  },
  props: ["editingPedido"],
  components: {
    Icon,
  },
  computed: {
    ...mapState(useClientesStore, ["currentcliente", "filtradosClientesArray"]),
    direccionCompleta() {
      if (this.currentcliente) {
        return `${this.currentcliente.direccion}, ${this.currentcliente.notasDir}, ${this.currentcliente.barrio} `;
      }
      return "";
    },
  },
  methods: {
    hideButtons() {
      setTimeout(() => {
        this.searchingCliente = false;
      }, 500);
    },
    changedDefaultInputs(e) {
      const valor = e.target.value;
      const campo = e.target.id;
      this.clienteParaEnviar[campo] = valor;
      this.$emit("cambio", this.clienteParaEnviar);
    },
    algo() {
      console.log("algo");
      this.searchingCliente = true;
    },
    setcliente(id) {
      this.clienteCompleto = true;
      this.searchingCliente = false;
      useClientesStore().setCurrentCliente(id);
      this.clienteParaEnviar = {
        cedula: this.currentcliente.cedula,
        nombre: this.currentcliente.nombre,
        numero: this.currentcliente.numero,
        notasPedido: this.currentcliente.notasPedido,
        valorDomi: this.currentcliente.valorDomi,
        direccionCompleta: this.direccionCompleta,
      };
      this.$emit("cambio", this.clienteParaEnviar);
      this.filtroClientes = this.currentcliente.cedula;
    },

    editarCliente(id) {
      useClientesStore().toggleEditCliente();
      useClientesStore().toggleClientForm();
      useClientesStore().setCurrentCliente(id);
    },
    createCliente() {
      this.clienteCompleto = true;
      useClientesStore().toggleClientForm();
    },
  },
  mounted() {
    if (this.editingPedido) {
      this.setcliente(this.currentcliente.docId);
    }
  },
};
</script>

<style scoped>
.lista {
  z-index: 102;
  position: absolute;
  width: 90%;
}

.lista button {
  border-radius: 5px;
  width: 100%;
}

.lista button:hover {
  background: rgb(215, 212, 212);
}

.list-container {
  position: relative;
}
</style>