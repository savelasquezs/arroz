<template>
  <div class="card">
    <div class="card-body">
      <form @submit.prevent="submitEnviar" class="">
        <Icon
          @click="cerrarPedido"
          icon="material-symbols:close"
          color="red"
          width="30"
          class="float-end close-form"
        />
        <div class="section-container d-flex gap-5 justify-content-evenly">
          <cliente-pedido-form
            @cambio="setCliente"
            :editingPedido="editingPedido"
          />
          <section
            class="pago border p-3 my-3 rounded-2 w-50 shadow d-grid align-content-around"
          >
            <div class="rounded border p-3">
              <h4 class="">Pago</h4>
              <hr />
              <button
                @click.prevent="addTipoPago"
                class="addInvoiceItem btn btn-outline-success btn-sm"
              >
                <Icon
                  icon="material-symbols:add-circle-outline"
                  color="white"
                  width="30"
                  height="30"
                />
                Agregar Tipo Pago
              </button>
              <div class="">
                <h5>
                  Total a pagar: <strong> ${{ total }}</strong>
                </h5>
                <h6>
                  Pago efectivo: <strong>{{ totalEfectivo }}</strong>
                </h6>
              </div>
              <tipos-pago
                :listaTipos="listaTipos"
                @deleteTipo="deleteTipoPago"
                :listaBancos="listaBancos"
              />
            </div>
            <div class="border p-3 rounded mt-3" v-if="editingPedido">
              <h5>Domiciliario</h5>
              <div class="form-floating">
                <select
                  class="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  v-model="domiciliario"
                >
                  <option
                    v-for="domiciliario in allDomiciliarios"
                    :key="domiciliario.nombreDomiciliario"
                    :value="{
                      nombre: domiciliario.nombreDomiciliario,
                      docId: domiciliario.docId,
                    }"
                  >
                    {{ domiciliario.nombreDomiciliario }}
                  </option>
                </select>
                <label for="floatingSelect">Domiciliario</label>
              </div>
            </div>
          </section>
        </div>
        <hr />
        <hr />
        <produto-pedido-form
          @listChanged="changeList"
          :editingPedido="editingPedido"
        />

        <div class="button-container d-flex justify-content-around">
          <button
            type="button"
            @click="cerrarPedido"
            class="btn btn-lg btn-warning"
          >
            Salir</button
          ><button v-if="!editingPedido" type="submit" class="btn btn-success">
            Guardar</button
          ><button v-else type="submit" class="btn btn-success">
            Actualizar
          </button>
          <impresora />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useUtilsStore } from "@/store/utils";
import { useClientesStore } from "@/store/clientes";
import { usePedidosStore } from "@/store/pedidos";
import { useProductsStore } from "@/store/productos";
import Swal from "sweetalert2";
import { db } from "../../firebase/firebaseInit.js";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Icon } from "@iconify/vue";
import { mapState } from "pinia";
import ClienteForm from "../clientes/ClienteForm.vue";
import TiposPago from "./TiposPago.vue";
import { useDomiciliarios } from "../../store/domiciliario.js";
import Impresora from "../utils/Impresora.vue";
import ClientePedidoForm from "./ClientePedidoForm.vue";
import ProdutoPedidoForm from "./ProdutoPedidoForm.vue";

export default {
  name: "pedidoForm",
  data() {
    return {
      cliente: {},
      listaTipos: [],
      productosList: [],
      descuento: 0,
      hacerDescuento: false,
      listaBancos: ["Bancolombia", "Nequi", "Didi"],
      domiciliario: {},
    };
  },
  components: {
    ClienteForm,
    Icon,
    TiposPago,
    Impresora,
    ClientePedidoForm,
    ProdutoPedidoForm,
  },

  computed: {
    ...mapState(useClientesStore, [
      "clientDatabase",
      "editClient",
      "currentcliente",
    ]),
    ...mapState(usePedidosStore, [
      "pedidoFormOpen",
      "pedidosDatabase",
      "editingPedido",
      "currentPedido",
    ]),
    ...mapState(useDomiciliarios, ["allDomiciliarios"]),
    ...mapState(useProductsStore, ["productDatabase"]),
    bancosActivos() {
      return this.listaTipos.map((registro) => registro.banco);
    },
    bancosSelect() {
      const quedan = this.listaBancos.filter(
        (banco) => !this.bancosActivos.includes(banco)
      );
      console.log(quedan);
      return quedan;
    },

    total() {
      let recuento = 0;
      this.productosList.forEach((product) => {
        recuento += product.subtotal;
      });
      recuento = recuento + this.currentcliente.valorDomi;

      return recuento;
    },
    totalBancos() {
      if (this.listaTipos.length > 0) {
        return this.listaTipos.reduce((a, b) => a + b.valor, 0);
      }
      return 0;
    },
    totalEfectivo() {
      return this.total - this.totalBancos;
    },
  },
  methods: {
    changeList(list) {
      this.productosList = list;
    },
    setCliente(clienteEnviado) {
      this.cliente = clienteEnviado;
      console.log(clienteEnviado);
    },
    deleteTipoPago(banco) {
      console.log(banco);
      this.listaTipos = this.listaTipos.filter(
        (registro) => registro.banco !== banco
      );
    },
    addTipoPago() {
      this.listaTipos.push({
        banco: this.bancosSelect[0],
        valor: this.totalEfectivo,
      });
    },

    verificarPedido() {
      if (
        this.productosList.some(
          (product) =>
            !this.productDatabase.some((item) => item.nombre == product.nombre)
        )
      ) {
        const nombreProducto = this.productosList.find(
          (product) =>
            !this.productDatabase.some((item) => item.nombre == product.nombre)
        ).nombre;
        const indexProducto = this.productosList.findIndex(
          (product) =>
            !this.productDatabase.some((item) => item.nombre == product.nombre)
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: ` El producto: ${nombreProducto} en la casilla numero ${
            indexProducto + 1
          } no existe en la base de datos`,
        });
        return true;
      }
    },

    async guardarPedido() {
      if (this.verificarPedido()) return;

      if (this.productosList.length == 0) {
        alert("No puede guardar un pedido sin productos o productos vacios");
        return;
      }
      const data = {
        cliente: { ...this.cliente, direccion: this.cliente.direccionCompleta },
        productos: this.productosList,
        total: this.total,
        enPreparacion: true,
        enCamino: false,
        enMesa: false,
        entregado: false,
        domiciliario: this.domiciliario,
        fecha: new Date().getTime(),
        horaToma: new Date().getTime(),
        horaMesa: null,
        horaCamino: null,
        horaEntregado: null,
        descuento: this.descuento,
        pagoOnline: this.listaTipos,
        pagoEfectivo: this.totalEfectivo,
      };
      if (this.listaTipos.some((tipo) => tipo.banco == "Didi")) {
        data["liquidado"] = false;
      } else if (
        this.listaTipos.some(
          (tipo) => tipo.banco == "Bancolombia" || tipo.banco == "Nequi"
        )
      ) {
        data["pagoConfirmado"] = false;
      }
      console.log(data);
      const docRef = await addDoc(collection(db, "pedidos"), data);
      console.log(docRef.id);
      // usePedidosStore().addPedido({ ...data, docId: docRef.id });
      this.cerrarPedido();
      useUtilsStore().confirmAction("Pedido Guardado Exitosamente");
    },

    async updatePedido() {
      try {
        const data = {
          cliente: {
            ...this.cliente,
            direccion: this.cliente.direccionCompleta,
          },
          productos: this.productosList,
          total: this.total,
          descuento: this.descuento,
          pagoOnline: this.listaTipos,
          pagoEfectivo: this.totalEfectivo,
          domiciliario: this.domiciliario,
        };

        const docRef = await doc(db, "pedidos", this.currentPedido.docId);

        const pedidoRef = await updateDoc(docRef, data);

        this.cerrarPedido();

        useUtilsStore().confirmAction("Pedido Actualizado exitosamente");
      } catch (error) {
        console.log(error);
      }
    },

    submitEnviar() {
      if (this.editingPedido) {
        this.updatePedido();
        return;
      }
      this.guardarPedido();
    },

    deleteInvoiceProducto(id) {
      this.productosList = this.productosList.filter(
        (product) => product.id != id
      );
    },
    resetcliente() {
      this.descuento = 0;
      this.hacerDescuento = false;
      useClientesStore().resetCurrentClient();
    },

    cerrarPedido() {
      usePedidosStore().tooglePedidoFormOpen();
      this.resetcliente();
      if (this.editingPedido) {
        usePedidosStore().toggleEditPedido();
      }
    },
  },
  watch: {
    clientDatabase() {},
    currentcliente() {
      console.log(this.valorDomi);
    },
  },
  created() {
    if (this.editingPedido) {
      console.log(this.currentPedido);
      this.productosList = this.currentPedido.productos;
      this.domiciliario = this.currentPedido.domiciliario;

      this.listaTipos = this.currentPedido.pagoOnline
        ? this.currentPedido.pagoOnline
        : [];

      const clienteId = this.clientDatabase.find(
        (cliente) => cliente.cedula == this.currentPedido.cliente.cedula
      );
      console.log(this.currentPedido);
      if (clienteId) {
        useClientesStore().setCurrentCliente(clienteId.docId);
      } else {
        useUtilsStore().confirmAction(
          "El cliente ha sido borrado, creelo nuevamente",
          3000,
          "error"
        );
      }
    }
  },
};
</script>
<style scoped lang="scss">
.card {
  overflow: scroll;
  max-height: 90vh;
  min-width: 800px;
  width: 90vw;
  max-width: 95vw;
}

h4 {
  margin: 0;
}
hr {
  margin: 0.5rem;
}
.productos img {
  margin-top: 10px;
  width: 30px;
}
.addInvoiceItem {
  float: right;
}
.close-form {
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    background: rgb(215, 212, 212);
    border-radius: 50%;
  }
}
</style>
