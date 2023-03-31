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
    <div class="offcanvas-body position-relative">
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
      <autocomplete-drop-down
        ref="autocomplete"
        :lista="lista"
        titulo="Categoria"
        @catSeleccionada="setCategoria"
      />
      <p class="text-danger">{{ error }}</p>

      <button
        class="btn btn-outline-info mb-3"
        v-if="categoriaNoValida"
        @click="confirmarAddCategoria(this.categoria)"
      >
        Agregar Categoria
      </button>
      <acordion> </acordion>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="anotaciones"
          id="floatingTextarea"
        ></textarea>
        <label for="floatingTextarea">Anotaciones</label>
      </div>

      <button
        class="btn btn-success position-absolute bottom-0 mb-5 end-0 mx-3"
      >
        Guardar Gasto
      </button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Acordion from "./Acordion.vue";
import AutocompleteDropDown from "./AutocompleteDropDown.vue";
export default {
  data() {
    return {
      lista: ["algo", "luna", "carajo", "gata", "daños"],
      categoria: "",
      categoriaNoValida: null,
      error: "",
    };
  },
  components: {
    AutocompleteDropDown,
    Acordion,
  },
  methods: {
    setCategoria(nombre, elementoInLista) {
      if (nombre.length > 0) {
        this.categoriaNoValida = !elementoInLista;
        this.categoria = nombre;
        if (this.categoriaNoValida) {
          this.error = "Categoria No Encontrada";
        } else {
          this.error = "";
        }
      }
    },
    confirmarAddCategoria(categoria) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: `Seguro que quieres guardar "${categoria}" como una nueva categoria?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Si, agregar!",
          cancelButtonText: "No, cancelar!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.lista.push(categoria);
            this.categoriaNoValida = false;
            this.error = "";
            swalWithBootstrapButtons.fire(
              "Categoria Guardada!",
              `${categoria} ha sido guardada como una nueva categoria`,
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            swalWithBootstrapButtons.fire(
              "Cancelado",
              "Hemos cancelado le guardado de la categoria :)",
              "error"
            );
          }
        });
    },
    borrarDatos() {
      this.$refs.autocomplete.filtro = "";
      this.categoria = "";
      this.error = "";
      this.categoriaNoValida = false;
    },
  },
};
</script>

<style scoped></style>
