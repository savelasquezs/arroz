<template>
  <div class="container">
    <h2 class="text-center mt-5">Dashboard</h2>
    <div class="row mt-5">
      <div class="col-lg-10 offset-1 mb-5">
        <crear-admin class="pb-5" />
        <div class="card">
          <div class="card-body">
            <h4>Pedidos por dia</h4>
            <line-chart-component
              :chartData="arrPedidosXdia"
              :options="chartOptions"
              label="Pedidos por dia"
              :chartColors="arrPedidosXdiaColors"
            />
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4>Ventas por dia</h4>
            <line-chart-component
              :chartData="arrVentasDia"
              :options="chartOptions"
              label="Ventas diarias"
              :chartColors="arrPedidosXdiaColors"
            />
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4>Ventas por hora del dia</h4>
            <line-chart-component
              :chartData="arrPedidosPorHora"
              :options="chartOptions"
              label="Pedidos por hora"
              :chartColors="arrPedidosXdiaColors"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import LineChartComponent from "@/components/LineChartComponent.vue";
import { mapState } from "pinia";
import { usePedidosStore } from "@/store/main";
import moment from "moment";
import CrearAdmin from "../components/CrearAdmin.vue";

export default {
  components: {
    LineChartComponent,
    CrearAdmin,
  },
  data() {
    return {
      arrPedidosXdia: [],
      arrPedidosXdiaColors: {
        borderColor: "rgb(170, 119, 255)",
        pointBorderColor: "rgb(201, 238, 255)",
        pointBackgroundColor: "rgb(151, 222, 255)",
        backgroundColor: "rgb(98, 205, 255)",
      },
      arrPedidosPorHora: [],
      arrVentasDia: [],
      arrVentasHora: [],
      arrVentasProductos: [],
      chartOptions: {
        responsive: true,
      },
    };
  },
  created() {
    if (this.pedidosDatabase.length > 0) {
      console.log(this.pedidosDatabase);
      moment.locale("es");
      this.pedidosDatabase.forEach((pedido) => {
        const fecha = moment(pedido.horaToma).format("DD/MM/YY");
        const hora = moment(pedido.horaToma);
        const redondeo = 60 - (hora.minute() % 60);
        const horaRedondeada = hora.add(redondeo, "minutes");
        const horaRango = horaRedondeada.clone().subtract(1, "hours");
        const rango = `${horaRango.format("h:mm")}-${horaRedondeada.format(
          "h:mm"
        )}`;

        if (this.arrPedidosPorHora.some((pedido) => pedido.label == rango)) {
          const indexPedidosPorHora = this.arrPedidosPorHora.findIndex(
            (pedido) => pedido.label == rango
          );
          const indexVentasHora = this.arrVentasHora.findIndex(
            (pedido) => pedido.label == rango
          );
          this.arrPedidosPorHora[indexPedidosPorHora].valor += 1;
          this.arrVentasHora[indexVentasHora].valor += parseInt(pedido.total);
        } else {
          this.arrPedidosPorHora.push({
            label: rango,
            valor: 1,
          });
          this.arrVentasHora.push({
            label: rango,
            valor: parseInt(pedido.total),
          });
        }

        if (this.arrPedidosXdia.some((pedido) => pedido.label == fecha)) {
          const indexPedidosPorFecha = this.arrPedidosXdia.findIndex(
            (pedido) => pedido.label == fecha
          );
          console.log(this.arrPedidosXdia);
          const indexVentasDia = this.arrVentasDia.findIndex(
            (pedido) => pedido.label == fecha
          );
          this.arrPedidosXdia[indexPedidosPorFecha].valor += 1;
          this.arrVentasDia[indexVentasDia].valor += parseInt(pedido.total);
        } else {
          this.arrPedidosXdia.push({
            label: fecha,
            valor: 1,
          });
          this.arrVentasDia.push({
            label: fecha,
            valor: parseInt(pedido.total),
          });
        }
      });
      console.log(this.arrPedidosXdia);
      console.log(this.arrPedidosPorHora);
      console.log(this.arrVentasHora);
      console.log(this.arrVentasDia);
    }
  },

  computed: {
    ...mapState(usePedidosStore, ["pedidosDatabase"]),
  },
};
</script>

<style lang="scss" scoped>
</style>