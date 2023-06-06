<template>
  <td>
    <div class="position-relative">
      <input
        required
        type="text"
        class="form-control"
        id="producto"
        autocomplete="off"
        v-model="nombre"
        @keyup="typing = true"
        @blur="desenfocar"
      />
      <div ref="listaDesplegable" class="list-group lista" v-if="typing">
        <button
          type="button"
          class="list-group-item list-group-item-action"
          v-for="(item, index) in getProducts(nombre)"
          :key="index"
          @click="setProducto(item)"
        >
          {{ item.nombre }}
        </button>
      </div>
    </div>
  </td>
</template>

<script>
import { mapState } from "pinia";
import { useProductsStore } from "../../store/productos";
import { usePedidosStore } from "../../store/pedidos";
export default {
  props: ["editingPedido", "producto"],
  data() {
    return {
      nombre: "",
      typing: false,
    };
  },
  computed: {
    ...mapState(useProductsStore, ["getProducts"]),
  },
  methods: {
    setProducto(item) {
      this.typing = false;
      this.nombre = item.nombre;
      this.$emit("elementSelected", item);
      console.log(item);
    },
    desenfocar() {
      setTimeout(() => {
        this.typing = false;
      }, 500);
    },
  },
  emits: ["elementSelected"],
  created() {
    if (this.editingPedido) {
      this.nombre = this.producto.nombre;
    }
  },
};
</script>

<style scoped>
.lista {
  z-index: 102;
  position: absolute;
  width: 100%;
}

.lista button {
  border-radius: 5px;
  width: 100%;
}

.lista button:hover {
  background: rgb(215, 212, 212);
}
</style>