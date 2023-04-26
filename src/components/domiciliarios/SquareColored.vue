<template>
  <div class="pedido" v-for="(order, index) in porEntregar" :key="index">
    <div
      class="pedido_container"
      :class="[colorClass(order), { selected: order.selected }]"
    >
      <label :for="'order-' + order.docId">
        <input
          type="checkbox"
          :id="'order-' + order.docId"
          :value="order"
          v-model="selectedOrders"
          @change="highlight(order)"
        />
        <div class="container">
          <h5>{{ order.cliente.nombre }}</h5>
          <p>{{ order.cliente.direccion }}</p>
          <p>{{ order.horaMesa }}</p>
          <p>Elapsed time: {{ elapsedTime(order) }}</p>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    porEntregar: {
      type: Array,
      required: true,
    },
  },
  methods: {
    elapsedTime(order) {
      const now = new Date();
      const elapsedTimeInSeconds = Math.floor(
        (now - new Date(order.horaMesa)) / 1000
      );
      return elapsedTimeInSeconds;
    },
    highlight(order) {
      order.selected = !order.selected;
      console.log(order);
    },
    colorClass(order) {
      const elapsedTime = this.elapsedTime(order);
      if (elapsedTime < 10) {
        return "yellow";
      } else if (elapsedTime < 20) {
        return "yellowDark";
      } else if (elapsedTime < 30) {
        return "orange";
      } else if (elapsedTime < 40) {
        return "orangeDark";
      } else if (elapsedTime < 50) {
        return "fucsia";
      } else {
        return "red";
      }
    },
  },

  data() {
    return {
      selectedOrders: [],
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      this.porEntregar.forEach((order) => {
        order.elapsedTime = this.elapsedTime(order);
      });
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.selected {
  box-shadow: -1px 1px 8px 10px rgba(170, 184, 230, 1) !important;
  }

.pedido_container {
  height: 200px;
  width: 200px;
  background: red;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  animation-name: bg;
}

.yellow {
  background: #c0eda6;
}
.yellowDark {
  background: #fff7bc;
}
.orange {
  background: #ff8080;
}
.orangeDark {
  background: #fd5d5d;
}
.fucsia {
  background: #ff0075;
}
.red {
  background: red;
}
input[type="checkbox"] {
  display: none;
}
</style>
