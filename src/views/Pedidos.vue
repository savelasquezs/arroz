<template>
  <Modal v-if="pedidoFormOpen"><PedidosForm /></Modal>
  <Modal v-if="detallePedidoAbierto">
    <DetallePedido v-if="detallePedidoAbierto" :pedido="currentPedido" />
  </Modal>
  <Modal v-if="deletingPedido"
    ><Borrar
      :itemId="currentPedido.docId"
      collection="pedidos"
      :itemName="currentPedido.cliente.nombre"
      v-if="deletingPedido"
  /></Modal>

  <div class="container clientesCont">
    <h2>Tabla de Pedidos</h2>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button class="btn btn-success" @click="createPedido">
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
            /></svg
        ></span>
        Nuevo pedido
      </button>
    </div>
    <div class="input-group mb-5 h-5">
      <input
        type="text"
        v-model="filtroPedidos"
        @keyup="filtradosPedidos"
        class="form-control"
        placeholder="  ...Buscar"
      />
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Direccion</th>
          <th>Valor</th>
          <th>Estado</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pedido, index) in pedidosDatabase" :key="index">
          <td>{{ pedido.cliente.nombre }}</td>
          <td>{{ pedido.cliente.direccion.split(",")[0] }}</td>
          <td>{{ pedido.total }}</td>
          <td align="center" @click="actualizarEstado(pedido.docId)">
            <span v-if="pedido.enPreparacion"
              ><Icon
                icon="mdi:pot-steam"
                color="#7e0000"
                width="20"
                height="20"
            /></span>
            <span v-if="pedido.enCamino"
              ><Icon
                icon="mdi:delivery-dining-electric"
                color="green"
                width="20"
                height="20"
            /></span>
            <span v-if="pedido.enMesa"
              ><Icon
                icon="material-symbols:table-restaurant"
                color="orange"
                width="20"
                height="20"
            /></span>

            <span v-if="pedido.entregado">
              <Icon icon="healthicons:happy" width="20" height="20" />
              <Icon
                icon="material-symbols:check"
                color="green"
                width="20"
                height="20"
              />c
            </span>
          </td>
          <td>{{ fechaLocal(pedido.horaToma) }}</td>
          <td>{{ horaLocal(pedido.horaToma) }}</td>
          <td>
            <button
              class="btn btn-sm btn-info"
              @click="verDetalles(pedido.docId)"
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
              @click="editarPedido(pedido.docId)"
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
              @click="borrarPedido(pedido.docId)"
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
import { useClientesStore } from "../store/main";
import ClienteForm from "@/components/ClienteForm.vue";
import DetallePedido from "@/components/DetallePedido.vue";
import Modal from "@/components/Modal.vue";
import PedidosForm from "@/components/PedidosForm.vue";
import { mapState } from "pinia";
import { usePedidosStore, useUtilsStore } from "@/store/main";
import { Icon } from "@iconify/vue";
import Borrar from "@/components/Borrar.vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseInit.js";
export default {
  name: "home",
  data() {
    return {
      filtroPedidos: [],
    };
  },

  components: {
    Modal,
    PedidosForm,
    ClienteForm,
    Icon,
    Borrar,
    DetallePedido,
  },
  computed: {
    ...mapState(usePedidosStore, [
      "pedidoFormOpen",
      "pedidosDatabase",
      "deletingPedido",
      "currentPedido",
      "detallePedidoAbierto",
    ]),
  },
  methods: {
    createPedido() {
      usePedidosStore().tooglePedidoFormOpen();
    },
    borrarPedido(id) {
      usePedidosStore().setCurrentPedido(id);
      usePedidosStore().toggleDelete();
    },
    editarPedido(id) {
      usePedidosStore().setCurrentPedido(id);
      usePedidosStore().toggleEditPedido();
      usePedidosStore().tooglePedidoFormOpen();
    },
    verDetalles(id) {
      console.log(id);
      console.log(this.detallePedidoAbierto);
      usePedidosStore().setCurrentPedido(id);
      usePedidosStore().toggleDetallePedidoAbierto();
    },
    siguienteEstado(id) {
      return usePedidosStore().siguienteEstado(id);
    },
    async actualizarEstado(id) {
      const docRef = await doc(db, "pedidos", id);
      await updateDoc(docRef, this.siguienteEstado(id));
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
    horaLocal(hora) {
      return useUtilsStore().horaLocal(hora);
    },
  },
  watch: {
    pedidosDatabase() {},
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
</style>
