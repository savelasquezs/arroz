<template>
  <navbar class="position-fixed" />
  <div class="d-flex h-100 contenido">
    <div
      class="d-flex container justify-content-evenly align-items-center gap-3 align-self-center h-75 shadow-sm position-relative"
    >
      <div class="bancos w-50 shadow pb-5 pt-3 px-5">
        <h3 class="text-center">Bancos registrados</h3>
        <div v-for="entidad in bancosRegistrados" :key="entidad.docId">
          <banco-config :banco="entidad" />
        </div>
      </div>

      <div class="bancos w-50 shadow pb-5 pt-3 px-5">
        <h3 class="text-center">Apps registradas</h3>
        <div v-for="entidad in appsRegistradas" :key="entidad.docId">
          <banco-config :banco="entidad" />
        </div>
      </div>
      <Icon
        icon="gridicons:add"
        color="#198754"
        width="50"
        class="position-absolute end-50 me-2 bottom-0 addbutton"
        role="button"
        @click="openBancoForm"
      />
    </div>
  </div>
</template>

<script>
import BancoConfig from "../components/bancos/BancoConfig.vue";
import Navbar from "../components/Navbar.vue";
import { Icon } from "@iconify/vue";
import { useBancos } from "../store/bancos";
import AddBancoForm from "../components/bancos/addBancoForm.vue";
import { mapState } from "pinia";
export default {
  components: { Navbar, BancoConfig, Icon, AddBancoForm },
  data() {
    return {};
  },
  methods: {
    openBancoForm() {
      useBancos().togglebancoForm();
    },
  },
  computed: {
    ...mapState(useBancos, ["bancoDatabase"]),
    bancosRegistrados() {
      return this.bancoDatabase.filter((entidad) => entidad.tipo == "Banco");
    },
    appsRegistradas() {
      return this.bancoDatabase.filter((entidad) => entidad.tipo == "App");
    },
  },
  mounted() {},
};
</script>

<style scoped>
.contenido {
  height: 100vh !important;
}
.addbutton {
  transition: 300ms ease transform;
}
.addbutton:hover {
  transform: scale(1.1);
}
</style>