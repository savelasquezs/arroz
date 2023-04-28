<template>
  <Navbar class="position-fixed" />
  <div class="contenido row">
    <div class="col-9">
      <h3>soasd</h3>
    </div>
    <div class="domiciliarios col-3 my-0">
      <div :key="persona.docId" v-for="persona in allDomiciliarios">
        <input
          type="radio"
          name="domiSelected"
          :id="persona.docId"
          :value="persona.nombreDomiciliario"
          v-model="domiSelected"
        />
        <label
          :for="persona.docId"
          class="d-flex justify-content-center align-items-center"
        >
          <domiciliario-avatar />
          <div>
            <h5>
              {{ persona.nombreDomiciliario }}
            </h5>
            <p class="cuentaPedidos">
              {{ persona.pedidosEntregados.length }} pedidos entregados
            </p>
          </div>
        </label>
      </div>
      <h3>el domi seleccionado es {{ domiSelected }}</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import Navbar from "../components/Navbar.vue";
import { useDomiciliarios } from "../store/domiciliario";
import DomiciliarioAvatar from "../components/icons/domiciliarioAvatar.vue";
export default {
  data() {
    return {
      domiSelected: {},
    };
  },
  components: { Navbar, DomiciliarioAvatar },
  computed: {
    ...mapState(useDomiciliarios, ["allDomiciliarios"]),
  },
};
</script>

<style scoped lang="scss">
* {
  padding: 0;
}
.elementos {
  background: #f1f6f9;
}
.domiciliarios {
  height: 100vh;
}
.cuentaPedidos {
  opacity: 0.5;
  color: gray;
}
</style>