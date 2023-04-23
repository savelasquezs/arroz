<template>
  <div class="pedido_container" ref="cuadro">
    <div class="container">
      <h5>{{ pedido.cliente.nombre }}</h5>
      <p>{{ pedido.cliente.direccion }}</p>
      <p>{{ counter }}</p>
      <p>{{ pedido.horaMesa }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },
  props: ["pedido"],
  created() {
    setInterval(() => {
      this.counter += 1;
    }, 1000);
  },

  watch: {
    counter() {
      const background =
        this.counter < 10
          ? "#c0eda6"
          : this.counter >= 10 && this.counter < 20
          ? "#fff7bc"
          : this.counter >= 20
          ? "#ff0075"
          : "#fff";
      this.$refs.cuadro.style = `background:${background}`;
    },
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
@keyframes bg {
  0% {
    background: #c0eda6;
  }
  25% {
    background: #fff7bc;
  }
  50% {
    background: #ff8080;
  }
  75% {
    background: #fd5d5d;
  }
  100% {
    background: #ff0075;
  }
}
</style>