<template>
  <table class="table">
    <tbody>
      <tr v-for="(pago, index) in listaTipos" :key="index">
        <td>
          <div class="form-floating bancoNombre">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="pago.banco"
              @change="emitirCambios"
            >
              <option v-for="banco in listaBancos" :key="banco" :value="banco">
                {{ banco }}
              </option>
            </select>
            <label for="floatingSelect">Banco o Applicacion</label>
          </div>
        </td>
        <td class="">
          <div class="form-floating mb-3 bancoValor">
            <input
              type="number"
              class="form-control"
              id="floatingInput"
              placeholder="Valor"
              autocomplete="off"
              v-model="pago.valor"
              @keyup="emitirCambios"
            />
            <label for="floatingInput">Valor</label>
          </div>
        </td>
        <td class="trash pb-4">
          <img
            @click="deleteTipoPago(pago.banco)"
            src="@/assets/icon-delete.svg"
            alt=""
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  props: ["listaTipos", "listaBancos"],
  data() {
    return {};
  },
  methods: {
    deleteTipoPago(banco) {
      this.$emit("deleteTipo", banco);
    },
  },
  components: {
    Icon,
  },
  computed: {
    listaBancosFaltante() {},
    pagosSeleccionados() {
      console.log(this.listaTipos);
      return [...this.listaTipos];
    },
  },
};
</script>

<style scoped>
td.trash {
  vertical-align: middle;
  cursor: pointer;
}
.bancoNombre {
  width: 125%;
  margin-right: 10px;
}
.bancoValor {
  width: 75%;
  float: right;
}
</style>