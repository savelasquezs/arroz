<template>
  <header class="flex">
    <div class="main">
      <div class="brand">
        <router-link class="nav-link flex" :to="{ name: 'Home' }">
          <img src="../assets/img/arrocito.png" alt="" />
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
        <router-link class="nav-link flex" :to="{ name: 'Gastos' }">
          <div class="branding flex">
            <Icon icon="raphael:future" color="#198754" width="20" />
            <p>Reservas</p>
          </div>
        </router-link>
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
        <router-link class="nav-link flex" :to="{ name: 'Domiciliarios' }">
          <div class="branding flex">
            <domiciliario-icon />
            <p>Domiciliarios</p>
          </div>
        </router-link>
        <router-link class="nav-link flex" :to="{ name: 'Contabilidad' }">
          <div class="branding flex">
            <contabilidad-icon />
            <p>Contabilidad</p>
          </div>
        </router-link>
        <router-link class="nav-link flex" :to="{ name: 'Config' }">
          <div class="branding flex">
            <Icon icon="icon-park-solid:config" color="#198754" />
            <p>Configuración</p>
          </div>
        </router-link>
      </div>
      <div class="d-grid justify-content-center" v-if="logedUser">
        <h4 class="text-center">{{ logedUser }}</h4>
        <button class="btn btn-outline-danger" @click="cerrarSesion">
          Cerrar Sesión
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import { Icon } from "@iconify/vue";
import { useAuth } from "../store/auth";
import PedidoIcon from "./icons/pedidoIcon.vue";
import clientesIcon from "./icons/clientesIcon.vue";
import productosIcon from "./icons/productosIcon.vue";
import gastosIcon from "./icons/gastosIcon.vue";
import domiciliarioIcon from "./icons/domiciliarioIcon.vue";
import ContabilidadIcon from "./icons/contabilidadIcon.vue";
import { auth } from "../firebase/firebaseInit";
import { useUtilsStore } from "../store/utils";

export default {
  data() {
    return { logedUser: "" };
  },
  name: "navbar",
  components: {
    Icon,
    PedidoIcon,
    clientesIcon,
    productosIcon,
    gastosIcon,
    domiciliarioIcon,
    ContabilidadIcon,
  },
  methods: {
    cerrarSesion() {
      console.log("cerrar");
      useAuth().logout();
    },
  },
  mounted() {
    const dName = JSON.parse(localStorage.getItem("user")).displayName;

    const result = useUtilsStore().capitalize(dName);
    this.logedUser = result;
  },
};
</script>

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
