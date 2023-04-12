<template>
  <div class="card">
    <form>
      <h3 class="text-center mb-3">Agregar Gasto</h3>
      <autocomplete-drop-down
        ref="autocomplete"
        :lista="allTipoGastos.map((gasto) => gasto.nombre)"
        titulo="Gasto"
        @catSeleccionada="setGasto"
      />
      <p v-if="gastoNoValido" class="text-danger">Gasto no encontrado</p>
      <div v-if="gasto">
        <div class="form-floating my-3">
          <input
            type="number"
            class="form-control"
            id="medida"
            :placeholder="gasto.medida"
            v-model="cantidad"
            required
          />
          <label for="medida">{{ gasto.medida }}s</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="number"
            class="form-control"
            id="total"
            placeholder="Valor total"
            v-model="valorTotal"
            required
          />
          <label for="total">Valor total</label>
        </div>
        <div class="form-floating mb-3">
          <select
            class="form-select"
            id="metodosGasto"
            aria-label="Floating label select example"
            v-model="origen"
          >
            <option selected value="Caja">Caja</option>
            <option value="Bancolombia">Bancolombia</option>
            <option value="Nequi">Nequi</option>
            <option value="otro">otro</option>
          </select>
          <label for="metodosGasto">Origen</label>
        </div>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="anotaciones"
            id="floatingTextarea"
            v-model="comentario"
          ></textarea>
          <label for="floatingTextarea">Comentario</label>
        </div>
      </div>
      <div class="d-flex justify-content-between mt-5">
        <button
          class="btn btn-success"
          @click.prevent="editarCat"
          v-if="editingGasto"
        >
          Actualizar
        </button>
        <button
          class="btn btn-success"
          v-else
          @click.prevent="agregarGastoYSalir"
        >
          Guardar y Salir
        </button>
        <button class="btn btn-danger" @click.prevent="cerrarModal">
          Salir sin guardar
        </button>
      </div>
      <button
        class="btn btn-warning mt-3 w-100"
        v-if="!editingGasto"
        @click.prevent="cerrarModal"
      >
        Guardar y agregar otro
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useGastosHoy, useTipoGastos, useUtilsGastos } from "../store/gastos";
import AutocompleteDropDown from "./AutocompleteDropDown.vue";
import { useUtilsStore } from "../store/main";
export default {
  data() {
    return {
      gastoNoValido: null,
      gasto: "",
      cantidad: "",
      valorTotal: "",
      origen: "Caja",
      comentario: "",
    };
  },
  components: { AutocompleteDropDown },
  methods: {
    cerrarModal() {
      useGastosHoy().toggleForm();
    },

    setGasto(nombre, elementoInLista) {
      if (nombre.length > 0) {
        this.gastoNoValido = !elementoInLista;
        this.gasto = this.allTipoGastos.find((gasto) => gasto.nombre == nombre);
      }
    },
    agregarGastoYSalir() {
      if (this.gastoNoValido) return;
      if (this.gasto == "" || this.cantidad == "" || this.valorTotal == "") {
        useUtilsStore().confirmAction(
          "Los campos no pueden ir vacios",
          2000,
          "error"
        );
        return;
      }
      const data = {
        gasto: this.gasto,
        cantidad: this.cantidad,
        valorTotal: this.valorTotal,
        valorUnitario: this.valorUnitario,
        origen: this.origen,
        comentario: this.comentario,
        fecha: new Date().getTime(),
      };
      useUtilsGastos().saveElement(data, "Gastos");
      this.cerrarModal();
    },
  },
  computed: {
    ...mapState(useGastosHoy, ["editingGasto"]),
    ...mapState(useTipoGastos, ["allTipoGastos"]),
    valorUnitario() {
      return this.valorTotal / this.cantidad;
    },
  },
};
</script>

<style scoped>
.card {
  min-width: 500px;
}
</style>