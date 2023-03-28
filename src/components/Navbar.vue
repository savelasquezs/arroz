<template>
  <header class="flex">
    <div class="main">
      <div class="brand">
        <router-link class="nav-link flex" :to="{ name: 'Home' }">
          <img src="../assets/arrocito.png" alt="" />
        </router-link>
        <h3>El señor arroz</h3>
      </div>
      <div class="navegacion">
        <router-link class="nav-link flex" :to="{ name: 'Pedidos' }">
          <div class="branding flex">
            <pedido-icon />
            <p>Pedidos(todos)</p>
          </div>
        </router-link>
        <router-link class="nav-link flex" :to="{ name: 'Clientes' }">
          <div class="branding flex">
            <clientes-icon />
            <p>Clientes</p>
          </div>
        </router-link>
        <div class="branding flex">
          <caja-icon />
          <p>Cuadre de caja</p>
        </div>
        <router-link class="nav-link flex" :to="{ name: 'Productos' }">
          <div class="branding flex">
            <productos-icon />
            <p>Productos</p>
          </div>
        </router-link>
        <router-link class="nav-link flex" :to="{ name: 'Gastos' }">
          <div class="branding flex">
            <gastos-icon />
            <p>Gastos</p>
          </div>
        </router-link>
        <div class="branding flex">
          <domiciliario-icon />
          <p>Domiciliarios</p>
        </div>

        <div class="branding flex">
          <contabilidad-icon />
          <p>Contabilidad</p>
        </div>
      </div>
    </div>
    <div class="nav-footer"></div>
  </header>
</template>

<script>
import PedidoIcon from "./icons/pedidoIcon.vue";
import clientesIcon from "./icons/clientesIcon.vue";
import cajaIcon from "./icons/cajaIcon.vue";
import productosIcon from "./icons/productosIcon.vue";
import gastosIcon from "./icons/gastosIcon.vue";
import domiciliarioIcon from "./icons/domiciliarioIcon.vue";
import ContabilidadIcon from "./icons/contabilidadIcon.vue";
export default {
  name: "navbar",
  components: {
    PedidoIcon,
    clientesIcon,
    cajaIcon,
    productosIcon,
    gastosIcon,
    domiciliarioIcon,
    ContabilidadIcon,
  },
};
</script>

    ,
    ContabilidadIcon
<style scoped lang="scss">
header {
  z-index: 99;
  display: grid;
  width: 200px;
  height: 100vh;
  // position: fixed;
  align-content: space-between;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  .branding {
    border-radius: 0 20px 20px 0;
    align-content: start;
    padding: 20px;
    color: gray;
    cursor: pointer;
    width: 100%;
    &:hover {
      background: #f5f5f5;
      color: black;
    }
    p {
      padding-left: 10px;
      margin: 0;
    }
  }
  .brand {
    padding: 20px;
    display: grid;
    place-items: center;
    img {
      width: 50px;
    }
  }
  .navegacion {
    margin-top: 20px;
  }
  h3 {
    text-align: center;
    font-size: 1.5rem;
  }
}
</style>
