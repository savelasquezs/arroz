<template>
  <div class="detalleContabilidad border shadow rounded text-center">
    <h4>{{ titulo }}</h4>
    <Icon width="30" :icon="icon" color="#198754" class="mb-3" />
    <h5>${{ valor }}</h5>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  props: ["icon", "titulo", "valor"],
  components: {
    Icon,
  },
};
</script>

<style scoped>
.detalleContabilidad {
  height: 120px;
  width: 200px;
}
</style>