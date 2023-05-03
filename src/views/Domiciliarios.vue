<template>
  <modal v-if="addingAbono">
    <abono-form v-if="addingAbono" />
  </modal>
  <Navbar class="position-fixed" />
  <div class="contenido row mt-3">
    <div class="col-9">
      <h3 class="text-center">Pedidos de hoy</h3>
      <div class="estadisticas d-flex gap-3">
        <estadistica-button :valorActual="mensajeValorHoy" titulo="Debe tener"
          ><Icon icon="ph:money-fill" color="#198754" width="30"
        /></estadistica-button>
        <estadistica-button
          :valorActual="mensajeNumeroPedidosHoy"
          titulo="Ha llevado"
          ><pedido-icon
        /></estadistica-button>
        <estadistica-button
          titulo="Base"
          :valorActual="Base"
          base="true"
          @cambioBase="cambiarBase"
          ><Icon icon="mdi:archive-eye" color="#198754" width="30" height="30"
        /></estadistica-button>
        <estadistica-button
          titulo="Abono"
          :valorActual="valorAbonosHoy"
          abono="true"
        >
          <Icon
            icon="streamline:money-cashier-shop-shopping-pay-payment-cashier-store-cash-register-machine"
            color="#198754"
            width="24"
            height="24"
        /></estadistica-button>
        <estadistica-button titulo="Ver" ojo="true">
          <Icon
            icon="mdi:eye"
            color="#555555"
            width="100"
            height="100"
            class="position-absolute top-50 start-50 translate-middle"
          />
        </estadistica-button>
      </div>
      <div class="grafica">
        <div class="container border rounded-4 m-3 p-4 chart-container">
          <searching-icon
            class="searchicon"
            mensaje="No hay domiciliario seleccionado"
            v-if="!domiSelected"
          />
          <canvas id="myChart" ref="myChart" v-else></canvas>
        </div>
      </div>
    </div>
    <div class="domiciliarios col-3 mt-3">
      <div class="border rounded-4">
        <h3 class="text-center mt-2 pb-2 border-bottom">Domiciliarios</h3>
        <domiciliario-array
          :listaDomiciliarios="allDomiciliarios"
          @selected="setDomiSelected"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { mapState } from "pinia";
import Navbar from "../components/Navbar.vue";
import { useAbonos, useDomiciliarios } from "../store/domiciliario";
import DomiciliarioArray from "../components/domiciliarios/DomiciliarioArray.vue";
import EstadisticaButton from "../components/utils/EstadisticaButton.vue";
import moment from "moment";
import PedidoIcon from "../components/icons/pedidoIcon.vue";
import { Chart } from "chart.js/auto";
import SearchingIcon from "../components/icons/searchingIcon.vue";
import Modal from "../components/utils/Modal.vue";
import AbonoForm from "../components/abonos/AbonoForm.vue";
export default {
  data() {
    return {
      Base: 55000,
      domiSelected: "",
      mensajeValorHoy: "",
      mensajeNumeroPedidosHoy: "",
      valorHoy: 0,
      chart: null,
      cuentaPedidos: {},
    };
  },
  components: {
    Navbar,
    DomiciliarioArray,
    EstadisticaButton,
    PedidoIcon,
    Icon,
    SearchingIcon,
    Modal,
    AbonoForm,
  },
  computed: {
    ...mapState(useDomiciliarios, ["allDomiciliarios", "currentDomiciliario"]),
    ...mapState(useAbonos, ["addingAbono", "allAbonos"]),
    valorAbonosHoy() {
      return this.abonosHoy.reduce((a, b) => a + parseInt(b.valor), 0);
    },
    abonosHoy() {
      if (this.domiSelected) {
        if (this.domiSelected?.pedidosEntregados.length > 0) {
          console.log(this.currentDomiciliario.nombreDomiciliario);
          console.log(this.allAbonos[0].domiciliario.nombreDomiciliario);
          const domis = this.allAbonos.filter(
            (abono) =>
              moment(abono.fecha).valueOf() >=
                moment().startOf("day").valueOf() &&
              moment(abono.fecha).valueOf() <=
                moment().endOf("day").valueOf() &&
              abono.domiciliario.nombreDomiciliario ==
                this.currentDomiciliario.nombreDomiciliario
          );
          return domis;
        }
      }
      return [];
    },
  },
  watch: {
    domiSelected() {
      useDomiciliarios().setCurrentDomiciliario(this.domiSelected.docId);
      this.cuentaPedidos = {};
      this.valorHoy = this.pedidosHoy().reduce(
        (a, b) => a + parseInt(b.total),
        0
      );
      const numeroPedidosHoy = this.pedidosHoy().length;
      this.mensajeNumeroPedidosHoy = `${numeroPedidosHoy} Pedidos`;
      this.mensajeValorHoy = `$${this.valorHoy + this.Base}`;
      this.domiSelected?.pedidosEntregados.forEach((domi) => {
        const fechaToma = moment(domi.fecha).format("DD/MM/YYYY");
        if (this.cuentaPedidos[fechaToma]) {
          this.cuentaPedidos[fechaToma] += 1;
        } else {
          this.cuentaPedidos[fechaToma] = 1;
        }
      });
      this.mostrarGrafica();
      console.log(this.cuentaPedidos);
    },
    Base() {
      this.mensajeValorHoy = `$${this.valorHoy + this.Base}`;
    },
  },
  methods: {
    mostrarGrafica() {
      setTimeout(() => {
        const canva = this.$refs.myChart;
        if (this.chart != null) {
          this.chart.destroy();
        }
        this.chart = new Chart(canva, {
          type: "line",
          data: {
            labels: Object.keys(this.cuentaPedidos),
            datasets: [
              {
                label: "# Pedidos",
                data: Object.values(this.cuentaPedidos),
                borderWidth: 1,
                fill: true,
                tension: 0.1,
                borderColor: "#198754",
                backgroundColor: "rgba(215, 198, 249, 0.18)",
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }, 200);
    },
    cambiarBase(valor) {
      this.Base = valor;
    },
    setDomiSelected(persona) {
      this.domiSelected = persona;
    },
    pedidosHoy() {
      if (this.domiSelected) {
        if (this.domiSelected?.pedidosEntregados.length > 0) {
          const domis = this.domiSelected?.pedidosEntregados.filter(
            (pedido) =>
              moment(pedido.fecha).valueOf() >=
                moment().startOf("day").valueOf() &&
              moment(pedido.fecha).valueOf() <= moment().endOf("day").valueOf()
          );
          return domis;
        }
      }
      return [];
    },

    pedidosSemanaPasada() {
      if (this.domiSelected) {
        if (this.domiSelected?.pedidosEntregados.length > 0) {
          const domis = this.domiSelected?.pedidosEntregados.filter(
            (pedido) =>
              moment(pedido.fecha).moment().subtract(7, "days").valueOf() >=
                moment().subtract(7, "days").startOf("day").valueOf() &&
              moment(pedido.fecha).moment().subtract(7, "days").valueOf() <=
                moment().subtract(7, "days").endOf("day").valueOf()
          );
          console.log(domis);
          return domis;
        }
      }
      return [];
    },
  },
  created() {
    useAbonos().listenChanges();
  },
};
</script>

<style scoped lang="scss">
.elementos {
  background: #f1f6f9;
}
.chart-container {
  box-shadow: 1px 9px 16px 13px rgba(0, 0, 0, 0.1);
  max-height: 70vh;
}
// .domiciliarios {
//   height: 100vh;
//   margin-top: 0;
//   margin-bottom: 0;
// }
</style>