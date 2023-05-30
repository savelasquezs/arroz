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
          ref="autocompleteInput"
          @focus="typing = true"
          @blur="validate"
        />
        <label for="floatingInput">{{ titulo }}</label>
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
      console.log(this.filtro);
      this.typing = false;
      const elementoInLista = this.lista.some((item) => item == this.filtro);
      this.$emit("elSeleccionado", this.filtro, elementoInLista);
    },
    validate() {
      setTimeout(() => {
        this.typing = false;
        const elementoInLista = this.lista.some((item) => item == this.filtro);
        this.$emit("elSeleccionado", this.filtro, elementoInLista);
      }, 500);
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
