<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasTop"
    aria-labelledby="offcanvasTopLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasTopLabel">Nuevo Gasto</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
        @click="borrarDatos"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Nombre Gasto"
          required
        />
        <label for="floatingInput">Nombre Gasto</label>
      </div>
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          id="valorGasto"
          placeholder="Valor Gasto"
          required
        />
        <label for="valorGasto">Valor Gasto</label>
      </div>

      <autocomplete-drop-down :lista="lista" titulo="Categoria" />
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="anotaciones"
          id="floatingTextarea"
        ></textarea>
        <label for="floatingTextarea">Anotaciones</label>
      </div>
    </div>
  </div>
</template>

<script>
import AutocompleteDropDown from "./AutocompleteDropDown.vue";
export default {
  data() {
    return {
      lista: ["algo", "luna", "carajo", "gata", "daños"],
    };
  },
  components: {
    AutocompleteDropDown,
  },
};
</script>

<style scoped>
</style>