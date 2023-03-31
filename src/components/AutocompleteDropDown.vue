<template>
  <div position-relative>
    <div class="ulContainer">
      <div class="form-floating">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          :placeholder="titulo"
          v-model="filtro"
          required
          @focus="typing = true"
          @blur="validate"
        />
        <label for="floatingInput">{{ titulo }}</label>
        <p class="text-danger">{{ error }}</p>
      </div>

      <ul class="list-group ullist" v-if="listaFiltrada && typing">
        <li
          class="list-group-item list-group-item-action"
          v-for="(elemento, index) in listaFiltrada"
          :key="index"
          @click="seleccionar(elemento)"
        >
          {{ elemento }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titulo: String,
    lista: Array,
  },
  data() {
    return {
      typing: false,
      filtro: "",
      listaFiltrada: [],
      error: "",
    };
  },
  methods: {
    filtrar() {
      if (this.listaFiltrada.length == 0) {
        this.listaFiltrada = this.lista;
      }
      this.listaFiltrada = this.lista.filter((elemento) =>
        elemento.toLowerCase().startsWith(this.filtro.toLowerCase())
      );
    },
    seleccionar(elemento) {
      this.filtro = elemento;
      this.typing = false;
    },
    validate() {
      setTimeout(() => {
        console.log(this.filtro);
        this.typing = false;
        if (!this.lista.some((item) => item == this.filtro)) {
          this.error = "El elemento no está en la lista";
        } else {
          this.error = "";
        }
      }, 200);
    },
  },
  watch: {
    filtro() {
      this.filtrar();
    },
  },
};
</script>

<style scoped>
.ulContainer {
  position: relative;
}
.ullist {
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 3;
}
</style>