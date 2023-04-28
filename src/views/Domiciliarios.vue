<template>
  <Navbar class="position-fixed" />
  <div class="contenido row">
    <div class="col-9">
      <h3>soasd</h3>
    </div>
    <div class="domiciliarios col-3 mt-3">
      <div class="border rounded-4">
        <h3 class="text-center mt-2 pb-2 border-bottom">Domiciliarios</h3>
        <div class="domis-container">
          <div
            :key="persona.docId"
            v-for="persona in allDomiciliarios"
            class="m-3 domi_container rounded-3"
          >
            <input
              type="radio"
              name="domiSelected"
              :id="persona.docId"
              :value="persona.nombreDomiciliario"
              v-model="domiSelected"
              ref="radio"
              @change="highlight"
            />
            <label
              :for="persona.docId"
              class="d-flex justify-content-center align-items-center"
            >
              <domiciliario-avatar />
              <div class="d-grid mx-3">
                <h5 class="m-0 pt-3">
                  {{ persona.nombreDomiciliario }}
                </h5>
                <p class="cuentaPedidos m-0 pb-3">
                  {{ persona.pedidosEntregados.length }} pedidos entregados
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>
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
  methods: {
    highlight() {
      this.$refs.radio.forEach((radio) => {
        if (radio.checked) {
          console.log(radio.parentNode.classList.add("selected"));
          return;
        }
        radio.parentNode.classList.remove("selected");
      });
    },
  },
  components: { Navbar, DomiciliarioAvatar },
  computed: {
    ...mapState(useDomiciliarios, ["allDomiciliarios"]),
  },
};
</script>

<style scoped lang="scss">
.elementos {
  background: #f1f6f9;
}
// .domiciliarios {
//   height: 100vh;
//   margin-top: 0;
//   margin-bottom: 0;
// }
.cuentaPedidos {
  opacity: 0.5;
  color: gray;
}
input[type="radio"] {
  display: none;
}
.selected {
  box-shadow: 1px 9px 16px 13px #d7c6f9 !important;
}
.domi_container {
  box-shadow: 0 0.125rem 0.25rem rgba(#000, 0.075);
}
.domi_container:hover {
  box-shadow: 1px 9px 16px 13px rgba(0, 0, 0, 0.1);
}
.domi_container:focus-visible {
  box-shadow: 1px 9px 16px 13px #d7c6f9;
}
h5 {
  text-transform: capitalize;
}
.domis-container {
  height: 80vh;
  overflow-y: scroll;
}
</style>