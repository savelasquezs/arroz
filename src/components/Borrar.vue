<template>
  <div class="card">
    <div class="card-body">
      <h3 class="text-center">Seguro que quieres borrar:</h3>
      <h2 class="text-center">
        <span v-if="collection == 'pedidos'">El pedido de </span>
        <strong>"{{ itemName }}"</strong>
      </h2>
      <h3 class="text-center">De el registro?</h3>
      <p class="text-center">
        Se borrara tambien de la base de datos permanentemente
      </p>
      <div class="button-container d-flex justify-content-around">
        <button class="btn btn-xl btn-warning" @click="cerrarModal">
          No, regresar
        </button>
        <button class="btn btn-xl btn-danger" @click="borrarregistro">
          Si, Borrar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  useClientesStore,
  useProductsStore,
  usePedidosStore,
  useUtilsStore,
} from "@/store/main";
import { useCategorias, useGastosHoy, useTipoGastos } from "../store/gastos";
import Swal from "sweetalert2";

import { mapState } from "pinia";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseInit";
export default {
  name: "deleteconfirmation",

  props: ["itemName", "collection", "itemId"],
  methods: {
    cerrarModal() {
      switch (this.collection) {
        case "clientes":
          useClientesStore().toggleDelete();

          break;
        case "productos":
          useProductsStore().toggleDeleteProduct();
          break;
        case "pedidos":
          usePedidosStore().toggleDelete();
          break;
        case "categories":
          useCategorias().toogleDelete();
          break;
        case "tipoGastos":
          useTipoGastos().toggleDeleting();
          break;
        case "Gastos":
          useGastosHoy().toggleDeleting();
          break;

        default:
          console.log(this.collection);
          break;
      }
    },
    async borrarregistro() {
      console.log(this.collection);
      console.log(this.itemId);

      const docRef = await doc(db, this.collection, this.itemId);
      await deleteDoc(docRef);
      this.cerrarModal();
      switch (this.collection) {
        case "clientes":
          console.log(this.collection);
          // useClientesStore().deletecliente(this.itemId);
          break;
        case "productos":
          console.log(this.collection);
          useProductsStore().deleteProduct(this.itemId);
          break;
        case "pedidos":
          console.log(this.collection);
          usePedidosStore().deletePedido(this.itemId);
          break;
        case "categories":
          console.log(this.collection);
          useCategorias().deleteCat(this.itemId);
          break;
        case "tipoGastos":
          console.log(this.collection);
          useTipoGastos().deleteTipoGasto(this.itemId);
          break;
        case "Gastos":
          console.log(this.collection);
          useGastosHoy().deleteGasto(this.itemId);
          break;

        default:
          break;
      }
      useUtilsStore().confirmAction(`Se borró "${this.itemName}" exitosamente`);
    },
  },
};
</script>

<style scoped>
.card {
  position: fixed;
  background: white;
  z-index: 101;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
