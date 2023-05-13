<template>
  <Modal v-if="modalProducto"><ProductForm v-if="modalProducto" /></Modal>
  <Modal v-if="borrarProducto"
    ><Borrar
      :itemId="currentProduct.docId"
      collection="productos"
      :itemName="currentProduct.nombre"
      v-if="borrarProducto"
  /></Modal>
  <Navbar class="position-fixed" />

  <div class="container clientesCont contenido">
    <h2>Tabla de Productos</h2>
    <hr />
    <div class="input-group mb-3 d-flex justify-content-end">
      <button-add mensaje="Agregar Producto" @click="abrirModal" />
    </div>
    <div class="input-group mb-5 h-5">
      <input
        type="text"
        class="form-control"
        v-model="filtro"
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
        <tr v-for="(product, index) in getProducts(filtro)" :key="index">
          <td>{{ product.nombre }}</td>
          <td>$ {{ product.valor }}</td>
          <td>{{ product.categoria }}</td>

          <td>
            <button
              class="btn btn-sm btn-warning"
              @click="editarProduct(product.docId)"
            >
              Editar
            </button>
          </td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              @click="borrarProduct(product.docId)"
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
import Modal from "@/components/utils/Modal.vue";
import ProductForm from "@/components/productos/Productform.vue";
import Borrar from "@/components/utils/Borrar.vue";
import { useProductsStore } from "../store/productos";
import { mapState } from "pinia";
import buttonAdd from "../components/utils/buttonAdd.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "home",
  data() {
    return {
      filtro: "",
      filtrados: [],
    };
  },
  methods: {
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
      useProductsStore().setCurrentProduct(id);
      useProductsStore().toggleDeleteProduct();
    },
  },
  components: {
    Modal,
    ProductForm,
    Borrar,
    buttonAdd,
    Navbar,
  },
  computed: {
    ...mapState(useProductsStore, [
      "modalProducto",
      "productDatabase",
      "borrarProducto",
      "currentProduct",
      "editProduct",
      "getProducts",
    ]),
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
