<template>
  <section class="productos border p-3 my-3 rounded-2 shadow">
    <div class="work-items">
      <div class="d-flex justify-content-between">
        <h4>Productos</h4>
        <button
          @click.prevent="addNewInvoiceItem"
          class="addInvoiceItem btn btn-outline-success btn-sm"
        >
          <Icon
            icon="material-symbols:add-circle-outline"
            color="white"
            width="30"
            height="30"
          />
          Agregar Producto
        </button>
      </div>
      <p v-if="hacerDescuento" class="text-danger text-center">
        Se está haciendo un descuento de {{ descuento }} %
      </p>
      <hr />
      <table class="table table-hover">
        <thead>
          <tr>
            <th class="col-sm-4">Producto</th>
            <th class="col-sm-1">Cantidad</th>
            <th class="col-sm-2">Precio</th>
            <th class="col-sm-1">Descuento</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody class="overflow-y-scroll">
          <item-list
            v-for="producto in productosList"
            :key="producto.id"
            :index="producto"
            :editingPedido="editingPedido"
            @itemSetted="setitemList"
            @borrarItem="borrarItem"
          />
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { Icon } from "@iconify/vue";
import { uid } from "uid";
import ProductItemList from "./ProductItemList.vue";
import ItemList from "./ItemList.vue";
import { mapState } from "pinia";
import { usePedidosStore } from "../../store/pedidos";

export default {
  props: ["editingPedido"],
  data() {
    return {
      productosList: [],
      hacerDescuento: null,
    };
  },
  components: {
    Icon,
    ProductItemList,
    ItemList,
  },
  methods: {
    borrarItem(id) {
      this.productosList = this.productosList.filter(
        (producto) => producto.id !== id
      );
      this.$emit("listChanged", this.productosList);
    },
    setitemList(item, id) {
      let index = this.productosList.findIndex((producto) => producto.id == id);
      this.productosList[index] = { id, ...item };
      this.$emit("listChanged", this.productosList);
    },
    addNewInvoiceItem() {
      this.productosList.push({
        nombre: "",
        precio: 0,
        cantidad: 1,
        id: uid(),
      });
      console.log(this.productosList);
    },
  },
  computed: {
    ...mapState(usePedidosStore, ["currentPedido"]),
  },
  created() {
    if (this.editingPedido) {
      this.productosList = this.currentPedido.productos;
    }
  },
};
</script>

<style scoped>
</style>