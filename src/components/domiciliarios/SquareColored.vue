<template>
  <div class="pedido_container"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.pedido_container {
  height: 200px;
  width: 200px;
  background: red;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  animation-duration: 180s;
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