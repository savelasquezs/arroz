<template>
  <div class="contenedor">
    <Navbar class="position-fixed" v-if="usuario" />
    <div :class="usuario ? 'contenido' : ''"><router-view /></div>
  </div>
  <Modal v-if="clienteFormShowed || formOpenned">
    <ClienteForm v-if="clienteFormShowed" />
    <CatForm v-if="formOpenned" />
  </Modal>
</template>
<script>
import ClienteForm from "@/components/ClienteForm.vue";

import { mapState } from "pinia";

import {
  useClientesStore,
  useProductsStore,
  usePedidosStore,
} from "../src/store/main";

import { useCategorias, useGastosHoy, useTipoGastos } from "./store/gastos";
import Navbar from "@/components/Navbar.vue";
import Modal from "@/components/Modal.vue";
import Pedidos from "../src/views/Pedidos.vue";
import CatForm from "./components/CatForm.vue";
import { useAuth } from "./store/auth";
import { auth } from "./firebase/firebaseInit";

export default {
  components: {
    Navbar,
    Pedidos,
    ClienteForm,
    Modal,
    CatForm,
  },

  computed: {
    ...mapState(useClientesStore, ["clienteFormShowed"]),
    ...mapState(useCategorias, ["formOpenned"]),
    usuario() {
      useAuth().fetchUser();
      return auth.currentUser;
    },
  },

  methods: {
    toogleClienteForm() {
      useClientesStore().toggleClientForm();
    },
  },
  created() {
    useClientesStore().getInvoices();
    useProductsStore().getProducts();
    usePedidosStore().getPedidos();
    useCategorias().getCategories();
    useTipoGastos().getTipoGastos();
    useGastosHoy().getGastos();
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap");

// .contenedor {
//   display: grid;
//   grid-template-columns: 1fr 5fr;
// }

.btn:hover {
  box-shadow: 5px 5px 3px 0px rgba(0, 0, 0, 0.48);
  transform: scale(1.05);
}
.contenido {
  margin-left: 200px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.app {
  background-color: #141625;
  min-height: 100vh;

  @media (min-width: 900px) {
    flex-direction: row !important;
  }
}

.mobile-message {
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #141625;
  color: #fff;

  p {
    margin-top: 16px;
  }
}

button,
.button {
  cursor: pointer;
  padding: 16px 24px;
  border-radius: 30px;
  border: none;
  font-size: 12px;
  margin-right: 8px;
  color: #fff;
}

.dark-purple {
  background-color: #252945;
}

.red {
  background-color: #ec5757;
}

.purple {
  background-color: #7c5dfa;
}

.green {
  background-color: #33d69f;
}

.orange {
  background-color: #ff8f00;
}

// utility classes

.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.nav-link {
  text-decoration: none;
  color: initial;
}

// Status Button Styling

.status-button {
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 8px;
  }

  font-size: 12px;
  margin-right: 30px;
  align-items: center;
  padding: 8px 30px;
  border-radius: 10px;
}

.paid {
  &::before {
    background-color: #33d69f;
  }

  color: #33d69f;
  background-color: rgba(51, 214, 160, 0.1);
}

.pending {
  &::before {
    background-color: #ff8f00;
  }

  color: #ff8f00;
  background-color: rgba(255, 145, 0, 0.1);
}

.draft {
  &::before {
    background-color: #dfe3fa;
  }

  color: #dfe3fa;
  background-color: rgba(223, 227, 250, 0.1);
}
</style>
>
