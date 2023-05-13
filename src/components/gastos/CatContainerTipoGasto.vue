<template>
  <div class="shadow-sm py-1 px-2 mb-3 mt-2 bg-body-tertiary rounded">
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div
          class="cat-container d-grid align-items-center justify-content-center text-center shadow-sm my-1 mx-5 bg-body-tertiary rounded"
        >
          <Icon
            width="14"
            class="mx-4"
            :icon="icono.icono"
            :color="icono.color"
          />

          <p class="mb-0 text-capitalize">{{ gasto.categoria }}</p>
        </div>
        <div>
          <h6 class="text-capitalize">{{ gasto.nombre }}</h6>
          <p class="">{{ gasto.anotaciones }}</p>
        </div>
      </div>
      <div class="d-flex justify-content-between w-25">
        <div>
          <p>Unidad de medida:</p>
          <h6>{{ gasto.medida }}</h6>
        </div>

        <button
          class="btn btn-sm btn-warning h-50 my-3"
          @click="editItem(gasto.docId)"
        >
          <Icon
            icon="material-symbols:edit"
            color="black"
            width="20"
            height="20"
          />
        </button>
        <button
          class="btn btn-sm btn-danger h-50 my-3"
          @click="deleteItem(gasto.docId)"
        >
          <Icon icon="bi:trash-fill" color="black" width="20" height="20" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useTipoGastos } from "../../store/gastos";

export default {
  props: ["gasto"],
  methods: {
    deleteItem(id) {
      useTipoGastos().setCurrent(id);
      useTipoGastos().toggleDeleting();
    },
    editItem(id) {
      useTipoGastos().setCurrent(id);
      useTipoGastos().toggleEditing();
      this.$emit("editingPressed");
    },
  },
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
p {
  font-size: 12px;
}
</style>