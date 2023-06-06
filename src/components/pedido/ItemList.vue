<template>
  <tr>
    <product-item-list
      @elementSelected="setPrecio"
      :editingPedido="editingPedido"
      :producto="index"
    />
    <td>
      <input
        type="number"
        v-model="cantidad"
        class="form-control"
        @keyup="setItem"
        @change="setItem"
      />
    </td>
    <td>
      <input
        type="number"
        v-model="precio"
        class="form-control"
        @keyup="setItem"
        @change="setItem"
      />
    </td>
    <td>
      <input
        type="number"
        v-model="descuento"
        class="form-control"
        @keyup="setItem"
        @change="setItem"
      />
    </td>
    <td>
      <input type="number" readonly v-model="subtotal" class="form-control" />
    </td>
    <img @click="borrarItem()" src="@/assets/icon-delete.svg" alt="" />
  </tr>
</template>

<script>
import ProductItemList from "./ProductItemList.vue";
export default {
  props: ["index", "editingPedido"],
  data() {
    return {
      cantidad: 1,
      precio: 0,
      selected: {},
      nombre: "",
      descuento: 0,
    };
  },

  methods: {
    borrarItem() {
      this.$emit("borrarItem", this.index.id);
    },
    setItem() {
      this.$emit("itemSetted", this.settedItem, this.index.id);
      console.log(this.index.id);
    },
    setPrecio(item) {
      this.precio = item.valor;
      this.nombre = item.nombre;
      this.setItem();
      this.selected = { ...item };
    },
  },
  components: {
    ProductItemList,
  },
  computed: {
    subtotal() {
      return this.cantidad * this.precio * (1 - this.descuento * 0.01);
    },
    settedItem() {
      return {
        nombre: this.nombre,
        precio: this.precio,
        cantidad: this.cantidad,
        descuento: this.descuento,
        subtotal: this.subtotal,
      };
    },
  },
  watch: {
    cantidad() {
      if (this.cantidad >= 3 && this.nombre.toLowerCase().includes("super")) {
        this.descuento = 10;
      }
    },
  },
  created() {
    if (this.editingPedido) {
      this.nombre = this.index.nombre;
      this.precio = this.index.precio;
      this.cantidad = this.index.cantidad;
      this.descuento = this.index?.descuento;
    }
  },
};
</script>

<style scoped>
</style>