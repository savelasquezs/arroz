<template>
  <div class="shadow-sm py-1 px-2 mb-3 mt-2 bg-body-tertiary rounded">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div
          class="cat-container d-flex flex-column text-center shadow-sm p-1 my-1 mx-5 bg-body-tertiary rounded"
        >
          <Icon
            width="30"
            class="mx-4"
            :icon="icono.icono"
            :color="icono.color"
          />

          <p class="mb-0">{{ gasto.categoria }}</p>
        </div>
        <div>
          <h4>{{ gasto.nombre }}</h4>
          <p>{{ gasto.anotaciones }}</p>
        </div>
      </div>
      <div class="d-flex justify-content-between w-25">
        <div>
          <p>Unidad de medida:</p>
          <h6>{{ gasto.medida }}</h6>
        </div>

        <button class="btn btn-sm btn-warning h-50 my-3">
          <Icon
            icon="material-symbols:edit"
            color="black"
            width="20"
            height="20"
          />
        </button>
        <button class="btn btn-sm btn-danger h-50 my-3">
          <Icon icon="bi:trash-fill" color="black" width="20" height="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  props: ["gasto"],
  components: {
    Icon,
  },
  computed: {
    icono() {
      switch (this.gasto.categoria.toLowerCase()) {
        case "nomina":
          return {
            icono: "mdi:people-outline",
            color: "#1769aa",
          };

          break;
        case "apps":
          return {
            icono: "ic:baseline-app-shortcut",
            color: "#a84448",
          };

          break;
        case "bebidas":
          return {
            icono: "ep:ice-drink",
            color: "#413543",
          };

          break;
        case "insumos":
          return {
            icono: "noto:cooked-rice",
            color: "#413543",
          };

          break;
        case "vacuna":
          return {
            icono: "icon-park:injection",
            color: "#413543",
          };

          break;
        case "aseo":
          return {
            icono: "ic:baseline-clean-hands",
            color: "#262a56",
          };

          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
</style>