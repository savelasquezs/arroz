<template>
  <div class="container d-flex">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>Moneda</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tr v-for="(moneda, index) in listaMonedas" :key="index">
        <td align="center">{{ convAMoneda(moneda.valor) }}</td>
        <td>
          <div class="input-group py-1 px-1">
            <input
              type="number"
              class="form-control"
              :placeholder="'💸 de ' + moneda.valor"
              aria-label="Billetes de 100.000"
              v-model="moneda.cantidad"
            />
          </div>
        </td>
        <td>
          <div class="input-group py-1">
            <input
              type="text"
              class="form-control px-1"
              placeholder=" Total 💸"
              aria-label="Billetes de 100.000"
              :value="
                (moneda.total = moneda.cantidad
                  ? convAMoneda(moneda.cantidad * moneda.valor)
                  : null)
              "
              disabled
            />
          </div>
        </td>
      </tr>
    </table>
    <div class="m-5">
      <h5><strong>Total caja: </strong>{{ totalCaja }}</h5>
      <button class="btn btn-outline-success h-25 fs-3" @click="guardarCuadre">
        Guardar Cuadre
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { usePedidosStore } from "../../store/pedidos";
import { useGastosHoy } from "../../store/gastos";
import { useCuadres } from "../../store/cuadres";
export default {
  data() {
    return {
      listaMonedas: [
        { nombre: "cienMil", valor: 100000 },
        { nombre: "cincuentaMil", valor: 50000 },
        { nombre: "veinte", valor: 20000 },
        { nombre: "diez", valor: 10000 },
        { nombre: "cinco", valor: 5000 },
        { nombre: "dos", valor: 2000 },
        { nombre: "mil", valor: 1000 },
        { nombre: "quinientos", valor: 500 },
        { nombre: "doscientos", valor: 200 },
        { nombre: "cien", valor: 100 },
        { nombre: "cincuenta", valor: 50 },
      ],
    };
  },
  methods: {
    convAMoneda(valor) {
      return valor.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0,
      });
    },
    guardarCuadre() {
      const data = {
        totalVentas: this.ventasHoy,
        totalGastos: this.gastosHoy,
        totalVentasBancolombiaHoy: this.ventasBancolombia,
        totalVentasNequi: this.ventasNequi,
        totalVentasDidi: this.ventasDidi,
        baseAnterior: this.valorUltimoCuadre,
        debeHaber: this.debeHaber,
        hay: this.hay,
        cuadre: this.cuadre,
      };
      console.log(data);
    },
  },
  computed: {
    totalCaja() {
      return Number(
        this.listaMonedas.reduce(
          (a, b) => a + (b.total ? parseInt(b.total.replace(/\D/g, "")) : 0),
          0
        )
      );
    },
    ...mapState(usePedidosStore, [
      "totalPedidosHoy",
      "pedidosBancoHoy",
      "valorPedidosBancoHoy",
    ]),
    ...mapState(useCuadres, ["allCuadres"]),
    ...mapState(useGastosHoy, ["valorGastosHoy", "gastosBancoHoy"]),
    ventasHoy() {
      return this.totalPedidosHoy;
    },
    gastosHoy() {
      return this.valorGastosHoy;
    },
    ventasBancolombia() {
      return this.valorPedidosBancoHoy("Bancolombia");
    },
    ventasNequi() {
      return this.valorPedidosBancoHoy("Nequi");
    },
    ventasDidi() {
      return this.valorPedidosBancoHoy("Didi");
    },
    gastosBancolombia() {
      return this.gastosBancoHoy("Bancolombia");
    },
    gastosNequi() {
      return this.gastosBancoHoy("Nequi");
    },
    ultimoCuadre() {
      if (this.allCuadres.length > 0) return this.allCuadres[0];
      return;
    },
    debeHaber() {
      return this.valorUltimoCuadre + this.ventasHoy - this.gastosHoy;
    },
    hay() {
      return (
        this.totalCaja +
        this.ventasBancolombia +
        this.ventasNequi +
        this.ventasDidi
      );
    },
    cuadre() {
      return this.hay - this.debeHaber;
    },
    valorUltimoCuadre() {
      if (this.ultimoCuadre) return this.ultimoCuadre.debeHaber;
      return 0;
    },
  },
  watch: {
    cuadre() {
      this.$emit("cambioCuadre", this.cuadre);
    },
  },
  mounted() {
    this.$emit("cambioCuadre", this.cuadre);
  },
};
</script>

<style scoped>
table {
  width: 40%;
}
</style>