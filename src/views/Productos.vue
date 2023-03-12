<template>
  <Modal v-if="modalProducto"><ProductForm v-if="modalProducto" /></Modal>
  <Modal v-if="borrarProducto"
    ><Borrar
      :itemId="currentProduct.idDoc"
      collection="productos"
      :itemName="currentProduct.nombre"
      v-if="borrarProducto"
  /></Modal>

  <div class="container clientesCont">
    <h2>Tabla de Productos</h2>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button class="btn btn-success" @click="abrirModal">
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
        Nuevo Producto
      </button>
    </div>
    <div class="input-group mb-5 h-5">
      <input
        type="text"
        class="form-control"
        v-model="filtro"
        @keyup="filtradosProductos"
        placeholder="  ...Buscar"
      />
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Valor</th>
          <th>Categoria</th>
          <th>Editar</th>
          <th>Borrar</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(product, index) in filtrados" :key="index">
          <td>{{ product.nombre }}</td>
          <td>$ {{ product.valor }}</td>
          <td>{{ product.categoria }}</td>

          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="editarProduct(product.idDoc)"
            >
              Editar
            </button>
          </td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              @click="borrarProduct(product.idDoc)"
            >
              Borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import ProductForm from "@/components/Productform.vue";
import Borrar from "@/components/Borrar.vue";
import { useProductsStore } from "../store/main";
import { mapState } from "pinia";

export default {
  name: "home",
  data() {
    return {
      filtro: "",
      filtrados: [],
    };
  },
  methods: {
    filtradosProductos() {
      if (this.filtro == "") {
        this.filtrados = this.productDatabase;
        return;
      } else {
        this.filtrados = this.productDatabase.filter((product) =>
          product.nombre.toLowerCase().includes(this.filtro.toLocaleLowerCase())
        );
        return;
      }

      console.log(this.filtrados);
    },
    abrirModal() {
      useProductsStore().toggleModalProducto();
      if (this.editProduct) {
        useProductsStore().toggleEditProduct();
      }
    },
    editarProduct(id) {
      useProductsStore().toggleModalProducto();
      useProductsStore().toggleEditProduct();
      useProductsStore().setCurrentProduct(id);
      console.log(this.editProduct);
    },
    borrarProduct(id) {
      useProductsStore().toggleDeleteProduct();
      useProductsStore().setCurrentProduct(id);
    },
  },
  components: {
    Modal,
    ProductForm,
    Borrar,
  },
  computed: {
    ...mapState(useProductsStore, [
      "modalProducto",
      "productDatabase",
      "borrarProducto",
      "currentProduct",
      "editProduct",
    ]),
  },

  watch: {
    productDatabase() {
      this.filtradosProductos();
    },
  },
  created() {
    this.filtradosProductos();
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
