<template>
  <div class="d-flex gap-3 m-3 mt-5 justify-content-center">
    <card-banco
      v-for="entidad in bancoDatabase"
      :key="entidad.docId"
      :banco="entidad.nombre"
      :imagen="entidad.imageUrl"
      :valor="valorBancos(entidad)"
    />
  </div>
</template>

<script>
import { mapState } from "pinia";
import CardBanco from "./CardBanco.vue";
import { usePedidosStore } from "../../store/pedidos";
import { useBancos } from "../../store/bancos";
export default {
  components: { CardBanco },
  data() {
    return {
      bancos: {},
    };
  },
  computed: {
    ...mapState(usePedidosStore, ["valorPedidosBanco", "valorBancos"]),
    ...mapState(useBancos, ["bancoDatabase"]),
  },
};
</script>

<style scoped>
</style>