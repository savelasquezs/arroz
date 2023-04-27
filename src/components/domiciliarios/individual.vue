<template>
  <div
    class="pedido_container"
    :class="[colorClass(), { selected: order.selected }]"
  >
    <label :for="'order-' + order.docId">
      <input
        type="checkbox"
        :id="'order-' + order.docId"
        :value="order"
        v-model="selectedOrder"
        :ref="order.docId"
        @change="highlight(order)"
        checked="false"
      />
      <div class="container">
        <h5>{{ order.cliente.nombre }}</h5>
        <p>{{ order.cliente.direccion }}</p>
        <p>{{ order.horaMesa }}</p>
        <p>Elapsed time: {{ elapsedTime(order) }}</p>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  props: ["order"],
  data() {
    return {
      selectedOrder: {},
    };
  },
  methods: {
    elapsedTime() {
      const now = new Date();
      const elapsedTimeInSeconds = Math.floor(
        (now - new Date(this.order.horaMesa)) / 1000
      );
      return elapsedTimeInSeconds;
    },
    highlight() {
      //   console.log(this.$refs[this.order.docId].checked);
      if (this.$refs[this.order.docId].checked) {
        this.order.selected = true;
        this.$emit("pedidoSelected", this.order);
      } else {
        this.order.selected = false;
        this.$emit("pedidoUnselected", this.order);
      }
    },
    colorClass() {
      if (this.order.elapsedTime < 10) {
        return "yellow";
      } else if (this.order.elapsedTime < 20) {
        return "yellowDark";
      } else if (this.order.elapsedTime < 30) {
        return "orange";
      } else if (this.order.elapsedTime < 40) {
        return "orangeDark";
      } else if (this.order.elapsedTime < 50) {
        return "fucsia";
      } else {
        return "red";
      }
    },
  },

  mounted() {
    this.timer = setInterval(() => {
      this.order.elapsedTime = this.elapsedTime();
    }, 1000);
  },
  computed: {},
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  display: none;
}
</style>