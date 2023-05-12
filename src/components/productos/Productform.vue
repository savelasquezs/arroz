<template>
  <div class="card">
    <div class="form" @submit="submitPorfa">
      <h2 class="text-center mb-5">Crear producto</h2>
      <div class="card-body">
        <div class="mb-4">
          <label for="Nombre" class="form-label">Nombre Producto</label>
          <input
            required
            type="text"
            class="form-control"
            id="Nombre"
            v-model="nombre"
          />
        </div>
        <div class="mb-4">
          <label for="Nombre" class="form-label">Valor de venta</label>
          <input
            required
            type="number"
            class="form-control"
            id="Valor"
            v-model="valor"
          />
        </div>
        <div class="mb-4">
          <label for="Nombre" class="form-label">Categoria</label>
          <select
            class="form-select"
            aria-label="Default select example"
            required
            v-model="categoria"
          >
            <option
              :value="categoria"
              v-for="(categoria, index) in categoriasDisponibles"
              :key="index"
            >
              {{ categoria }}
            </option>
          </select>
          <div class="button-container d-flex justify-content-around">
            <button
              type="button"
              @click="closeModal"
              class="btn btn-lg btn-warning"
            >
              Salir
            </button>
            <button
              v-if="!editProduct"
              @click="createProduct"
              class="btn btn-success"
            >
              Guardar
            </button>
            <button v-else @click="updateProduct" class="btn btn-success">
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useUtilsStore } from "@/store/utils";
import { useProductsStore } from "@/store/productos";
import { db } from "../../firebase/firebaseInit.js";
import { doc, addDoc, updateDoc, collection } from "firebase/firestore";
export default {
  components: {},
  data() {
    return {
      categoriasDisponibles: [
        "RopaVieja",
        "Paisa",
        "Ranchero",
        "Carbonara",
        "Bebidas",
        "Combos",
        "Adiciones",
      ],
      nombre: null,
      valor: null,
      categoria: null,
      idDoc: null,
    };
  },
  methods: {
    async createProduct() {
      try {
        const data = {
          nombre: this.nombre,
          valor: this.valor,
          categoria: this.categoria,
        };
        const productRef = await addDoc(collection(db, "productos"), data);
        console.log(`el producto fue guardado con el id : ${productRef.id}`);
        this.closeModal();
        // useProductsStore().addProduct({ ...data, idDoc: productRef.id });
        useUtilsStore().confirmAction("Producto Creado exitosamente");
      } catch (error) {
        console.log(error);
      }
    },

    async updateProduct() {
      try {
        const data = {
          nombre: this.nombre,
          valor: this.valor,
          categoria: this.categoria,
        };

        const docRef = doc(db, "productos", this.currentProduct.docId);

        const productRef = await updateDoc(docRef, data);

        this.closeModal();

        useUtilsStore().confirmAction("Producto Actualizado exitosamente");
      } catch (error) {
        console.log(error);
      }
    },

    closeModal() {
      useProductsStore().toggleModalProducto();
      if (this.editProduct) {
        useProductsStore().toggleEditProduct();
      }
    },
    submitPorfa() {
      console.log("algo");
      this.createProduct();
    },
  },
  computed: {
    ...mapState(useProductsStore, [
      "editProduct",
      "currentProduct",
      "productDatabase",
    ]),
  },
  created() {
    if (this.editProduct) {
      this.nombre = this.currentProduct.nombre;
      this.valor = this.currentProduct.valor;
      this.categoria = this.currentProduct.categoria;
      this.idDoc = this.currentProduct.idDoc;
    }
  },
};
</script>

<style scoped>
.button-container {
  margin-top: 50px;
}
</style>
