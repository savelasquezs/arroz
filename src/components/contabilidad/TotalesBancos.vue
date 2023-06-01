<template>
  <div class="d-flex gap-3 m-3 mt-5 justify-content-center">
    <card-banco
      banco="Bancolombia"
      imagenBanco="/src/assets/bancolombia.png"
      :valor="valorPedidosBancolombia"
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
    ...mapState(usePedidosStore, ["valorPedidosBancolombia"]),
  },
};
</script>

<style scoped>
</style>