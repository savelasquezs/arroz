<template>
  <div class="pedido_container" :class="colorClass">
    <div class="container">
      <h5>{{ pedido.cliente.nombre }}</h5>
      <p>{{ pedido.cliente.direccion }}</p>
      <p>{{ pedido.horaMesa }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    pedido: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      elapsedTime: 0,
    };
  },
  computed: {
    colorClass() {
      if (this.elapsedTime < 10) {
        return "yellow";
      } else if (this.elapsedTime < 20) {
        return "yellowDark";
      } else if (this.elapsedTime < 30) {
        return "orange";
      } else if (this.elapsedTime < 40) {
        return "orangeDark";
      } else if (this.elapsedTime < 50) {
        return "fucsia";
      } else {
        return "red";
      }
    },
    orderMesaTime() {
      return this.pedido.horaMesa;
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      // Update the elapsedTime data property
      const now = new Date();
      this.elapsedTime = Math.floor((now - this.orderMesaTime) / 1000);
    }, 1000);
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
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
</style>