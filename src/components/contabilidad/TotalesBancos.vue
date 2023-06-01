<template>
  <div class="d-flex gap-3 m-3 mt-5 justify-content-center">
    <card-banco
      banco="Bancolombia"
      imagenBanco="/src/assets/bancolombia.png"
      :valor="valorPedidosBancolombia"
    />
    <card-banco
      banco="Nequi"
      imagenBanco="/src/assets/nequi.png"
      :valor="valorPedidosBanco('Nequi')"
    />
    <card-banco
      banco="Didi"
      imagenBanco="/src/assets/didi.png"
      :valor="valorPedidosDidi"
    />
  </div>
</template>

<script>
import { mapState } from "pinia";
import CardBanco from "./CardBanco.vue";
import { usePedidosStore } from "../../store/pedidos";
export default {
  components: { CardBanco },
  data() {
    return {
      bancos: {},
    };
  },
  computed: {
    ...mapState(usePedidosStore, [
      "valorPedidosBancolombia",
      "valorPedidosDidi",
      "valorPedidosBanco",
    ]),
  },
};
</script>

<style scoped>
</style>