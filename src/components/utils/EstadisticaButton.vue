<template>
  <div
    class="mt-5 wrapper p-2 rounded-3 shadow-sm d-grid justify-content-between position-relative"
  >
    <slot v-if="ojo" />
    <div v-else class="heading d-flex gap-2">
      <slot />
      <h6 class="mb-0">{{ titulo }}</h6>
    </div>
    <div>
      <div class="form-floating" v-if="base">
        <input
          type="number"
          class="form-control"
          id="floatingInput"
          placeholder="Valor base"
          @keyup="cambioBase"
          v-model="baseNueva"
        />
        <label for="floatingInput">Valor base</label>
      </div>
      <h5 v-else>
        <strong> {{ valorActual }}</strong>
      </h5>
      <button-add v-if="abono" class="rounded-5" @click="openAbono" />
    </div>
  </div>
</template>

<script>
import { useAbonos } from "../../store/domiciliario";
import pedidoIcon from "../icons/pedidoIcon.vue";
import ButtonAdd from "./buttonAdd.vue";
export default {
  data() {
    return {
      baseNueva: 0,
    };
  },
  methods: {
    openAbono() {
      useAbonos().toogleAbonoForm();
    },
    cambioBase() {
      this.$emit("cambioBase", this.baseNueva);
    },
  },
  props: [
    "ojo",
    "abono",
    "base",
    "valorActual",
    "porcentaje",
    "valorSemanaPasada",
    "titulo",
  ],
  components: { pedidoIcon, ButtonAdd },
  mounted() {
    this.baseNueva = parseInt(this.valorActual);
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  height: 15vh;
  width: 19%;
  &:hover {
    box-shadow: 1px 9px 16px 13px rgba(0, 0, 0, 0.1) !important;
  }
}
</style>