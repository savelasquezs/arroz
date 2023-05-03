<template>
  <div class="card">
    <form action="">
      <h4 class="text-center">Abonar</h4>
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          id="floatingInput"
          v-model="abono"
          placeholder="Valor del abono"
          autocomplete="off"
        />
        <label for="floatingInput">Valor del abono</label>
      </div>
      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="Comentario"
          id="comentario"
          style="height: 100px"
          v-model="comentario"
        ></textarea>
        <label for="comentario">Comentario</label>
      </div>
      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-success" @click.prevent="agregarAbono">
          Agregar
        </button>
        <button class="btn btn-danger" @click.prevent="cerrarModal">
          Salir
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useAbonos, useDomiciliarios } from "../../store/domiciliario";
import { useUtilsStore } from "../../store/main";
import { useUtilsGastos } from "../../store/gastos";
export default {
  props: ["user"],
  data() {
    return {
      abono: null,
      comentario: null,
    };
  },
  methods: {
    cerrarModal() {
      useAbonos().toogleAbonoForm();
    },
    async agregarAbono() {
      const { nombreDomiciliario, docId } = this.currentDomiciliario;
      const data = {
        valor: this.abono,
        domiciliario: { nombreDomiciliario, docId },
        fecha: new Date().getTime(),
        comentario: this.comentario,
      };
      if (!this.abono) {
        useUtilsStore().confirmAction(
          "Debes poner un valor de abono",
          2000,
          "error"
        );
        return;
      }
      await useUtilsGastos().saveElement(data, "abonos");
      console.log(this.allAbonos);
      this.cerrarModal();
    },
  },
  computed: {
    ...mapState(useDomiciliarios, ["currentDomiciliario"]),
    ...mapState(useAbonos, ["allAbonos"]),
  },
};
</script>

<style scoped>
</style>