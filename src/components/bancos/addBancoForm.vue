<template>
  <div class="card">
    <div class="position-absolute end-0">
      <Icon icon="carbon:close-filled" color="red" @click="close" width="30" />
    </div>
    <div class="card-body position-relative mt-3">
      <form action="">
        <h3>Crear registro de Banco</h3>
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model="nombre"
            class="form-control"
            id="nombreFloating"
            placeholder="Nombre"
          />
          <label for="nombreFloating"> Nombre</label>
        </div>

        <div class="form-floating">
          <select
            class="form-select mb-3"
            id="floatingSelect"
            aria-label="Floating label select example"
            v-model="tipo"
          >
            <option selected>...Selecciona una...</option>
            <option value="Banco">Banco</option>
            <option value="App">App</option>
          </select>
          <label for="floatingSelect">Tipo de entidad : Banco o App</label>
        </div>
        <div class="form-floating">
          <select
            class="form-select mb-3"
            id="asignarA"
            aria-label="Floating label select example"
            v-model="liquidarEn"
            v-if="tipo == 'App'"
          >
            <option selected>...Selecciona uno...</option>
            <option
              v-for="banco in listaBancos"
              :key="banco.docId"
              :value="banco.nombre"
            >
              {{ banco.nombre }}
            </option>

            <option value="App">App</option>
          </select>
          <label v-if="tipo == 'App'" for="asignarA">Donde nos consignan</label>
        </div>
        <input
          type="file"
          accept="/image"
          @change="setFile"
          class="form-control mb-3"
        />

        <img :src="preview" alt="" v-if="preview" width="150" class="d-block" />
        <button
          class="btn btn-outline-success w-100 mt-3"
          @click.prevent="GuardarBanco"
        >
          Guardar
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// Importa tu instancia de Firebase Firestore y Firebase Storage

import Modal from "../utils/Modal.vue";
import { Icon } from "@iconify/vue";
import { useBancos } from "../../store/bancos";
import { useUtilsStore } from "../../store/utils";
import { mapState } from "pinia";
export default {
  components: { Modal, Icon },
  data() {
    return {
      nombre: "",
      valor: 0,
      file: "",
      preview: null,
      tipo: "Banco",
      liquidarEn: "",
    };
  },
  methods: {
    setFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      console.log(files[0]);
      this.file = files[0];
      this.preview = URL.createObjectURL(files[0]);
    },
    close() {
      useBancos().togglebancoForm();
    },
    GuardarBanco() {
      const data = { nombre: this.nombre, tipo: this.tipo };
      if (this.liquidarEn != "") {
        data["liquidarEn"] = this.liquidarEn;
      }
      useUtilsStore().saveElementWithImage(
        data,
        "bancos",
        data.nombre,
        this.file
      );
      this.close();
    },
  },
  computed: {
    ...mapState(useBancos, ["bancoDatabase"]),
    listaBancos() {
      return this.bancoDatabase.filter((banco) => banco.tipo == "Banco");
    },
  },
};
</script>

<style scoped>
img {
  margin: 0 auto;
}
</style>