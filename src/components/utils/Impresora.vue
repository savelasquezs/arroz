<template>
  <div>
    <button @click="imprimirFactura">Imprimir Factura</button>
    <div id="facturaHtml" class="d-none">
      <h2>Factura de Venta</h2>
      <p>Cliente: {{ factura.cliente.nombre }}</p>
      <p>Dirección: {{ factura.cliente.direccion }}</p>
      <p>Teléfono: {{ factura.cliente.telefono }}</p>
      <hr />
      <ul>
        <li v-for="(item, index) in factura.articulos" :key="index">
          {{ item.nombre }}: ${{ item.precio }}
        </li>
      </ul>
      <hr />
      <p>Total: ${{ total }}</p>
    </div>
  </div>
</template>

<script>
import printJS from "print-js";

export default {
  data() {
    return {
      factura: {
        cliente: {
          nombre: "Juan Pérez",
          direccion: "Calle Principal 123",
          telefono: "555-1234",
        },
        articulos: [
          { nombre: "Hamburguesa", precio: 10 },
          { nombre: "Papas fritas", precio: 5 },
          { nombre: "Refresco", precio: 2 },
          { nombre: "Postre", precio: 3 },
        ],
      },
      total: 0,
    };
  },

  methods: {
    calcularTotal() {
      this.total = this.factura.articulos.reduce(
        (accumulator, item) => accumulator + item.precio,
        0
      );
    },
    imprimirFactura() {
      printJS({ printable: facturaHtml, type: "html" });
    },
  },
  mounted() {
    this.calcularTotal();
  },
};
</script>

<style scoped>
</style>