<template>
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
    <tr>
      <th>Total Caja : {{ totalCaja }}</th>
    </tr>
  </table>
</template>

<script>
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
  },
};
</script>

<style scoped>
table {
  width: 40%;
}
</style>