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
        <section class="cliente">
          <div class="d-flex justify-content-between">
            <h4>Cliente</h4>
            <button
              class="btn btn-info"
              v-show="clienteCompleto"
              @click.prevent="editarCliente(currentcliente.docId)"
            >
              <Icon
                icon="material-symbols:edit"
                color="black"
                width="24"
                height="24"
              />
            </button>
          </div>
          <hr />
          <div class="row">
            <div class="mb-2 col list-container">
              <label for="numero" class="form-label">Cedula</label>
              <button
                class="btn btn-sm btn-outline-success float-end"
                v-if="
                  filtradosClientesArray.length == 0 && filtroClientes !== ''
                "
                @click.prevent="createCliente"
              >
                <Icon icon="mdi:create-new-folder" color="white" />
                Crear Cliente
              </button>

              <input
                required
                type="number"
                class="form-control"
                id="cedula"
                v-model="filtroClientes"
                @keyup="filtradosClientes"
                autocomplete="off"
              />

              <div class="list-group lista" v-if="searchingCliente">
                <button
                  type="button"
                  class="list-group-item list-group-item-action"
                  v-for="(cliente, index) in filtradosClientesArray"
                  :key="index"
                  @click="setcliente(cliente.docId)"
                >
                  {{ cliente.cedula }}
                </button>
              </div>
            </div>
            <div class="mb-2 col" v-show="clienteCompleto">
              <label for="numero" class="form-label">Telefono</label
              ><input
                required
                type="text"
                class="form-control"
                id="numero"
                v-model="currentcliente.numero"
              />
            </div>
            <div class="mb-2 col" v-show="clienteCompleto">
              <label for="nombre" class="form-label">Nombre</label
              ><input
                required
                type="text"
                class="form-control"
                id="nombre"
                v-model="currentcliente.nombre"
              />
            </div>
          </div>
          <div class="cliente-data" v-show="clienteCompleto">
            <div class="row">
              <div class="mb-2">
                <label for="direccion" class="form-label">Direcci??n</label
                ><input
                  required
                  type="text"
                  class="form-control"
                  id="direccion"
                  v-model="currentcliente.direccionCompleta"
                />
              </div>
            </div>
            <div class="mb-2">
              <label for="notasPedidos" class="form-label">Notas Pedidos</label
              ><input
                type="text"
                class="form-control"
                id="notasPedidos"
                placeholder="cucharas, sin pimenton...."
                v-model="currentcliente.notasPedido"
              />
            </div>
            <div class="mb-2">
              <label for="valor_domi" class="form-label">Valor del domi</label
              ><input
                required
                type="number"
                class="form-control"
                id="valor_domi"
                v-model="currentcliente.valorDomi"
              />
            </div>
          </div>
        </section>
        <hr />
        <section class="productos">
          <div class="work-items">
            <div class="d-flex justify-content-between">
              <h4>Productos</h4>
              <h6>
                Total a pagar: <strong> ${{ total }}</strong>
              </h6>
              <button
                @click.prevent="addNewInvoiceItem"
                class="addInvoiceItem btn btn-outline-success btn-sm"
              >
                <Icon
                  icon="material-symbols:add-circle-outline"
                  color="white"
                  width="30"
                  height="30"
                />
                Agregar
              </button>
            </div>
            <p v-if="hacerDescuento" class="text-danger text-center">
              Se est?? haciendo un descuento de {{ descuento }} %
            </p>
            <hr />
            <table class="table table-hover">
              <thead>
                <tr>
                  <th class="col-sm-6">Producto</th>
                  <th class="col-sm-1">Cantidad</th>
                  <th class="col-sm-2">Precio</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(producto, indexProducto) in productosList"
                  :key="indexProducto"
                >
                  <td>
                    <input
                      required
                      type="text"
                      class="form-control"
                      id="producto"
                      autocomplete="off"
                      v-model="producto.nombre"
                      @keyup="
                        filtradosProductos(producto.nombre, indexProducto)
                      "
                    />
                    <div ref="listaDesplegable" class="list-group lista">
                      <button
                        type="button"
                        class="list-group-item list-group-item-action"
                        v-for="(item, index) in filtradosProductosArray"
                        :key="index"
                        @click="
                          setProducto(
                            item.nombre,
                            item.valor,
                            producto.id,
                            indexProducto
                          )
                        "
                      >
                        {{ item.nombre }}
                      </button>
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="producto.cantidad"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-model="producto.precio"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      readonly
                      :value="
                        (producto.subtotal =
                          producto.cantidad * producto.precio)
                      "
                      class="form-control"
                    />
                  </td>
                  <img
                    @click="deleteInvoiceProducto(producto.id)"
                    src="@/assets/icon-delete.svg"
                    alt=""
                  />
                </tr>
              </tbody>
            </table>
          </div>
        </section>
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
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import {
  useClientesStore,
  usePedidosStore,
  useProductsStore,
  useUtilsStore,
} from "@/store/main";
import Swal from "sweetalert2";
import ClienteForm from "@/components/ClienteForm.vue";
import { db } from "../firebase/firebaseInit.js";

import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

import { Icon } from "@iconify/vue";

import { uid } from "uid";

import { mapState } from "pinia";

export default {
  name: "pedidoForm",
  data() {
    return {
      clientesFiltrados: [],
      clienteCompleto: null,
      searchingCliente: null,

      filtroClientes: "",
      filtradosClientesArray: [],
      productosList: [],
      filtradosProductosArray: [],
      descuento: 0,
      hacerDescuento: false,
    };
  },
  components: {
    ClienteForm,
    Icon,
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
    ...mapState(useProductsStore, ["productDatabase"]),
    direccionCompleta() {
      if (this.direccion) {
        return `${this.direccion}, ${this.notasDir}, ${this.barrio} `;
      }
      return "";
    },
    total() {
      let recuento = 0;
      this.productosList.forEach((product) => {
        recuento += product.subtotal;
      });
      if (
        this.productosList.some(
          (product) =>
            product.cantidad >= 3 &&
            product.nombre.toLowerCase().includes("super")
        )
      ) {
        this.hacerDescuento = true;
      } else {
        this.hacerDescuento = false;
      }

      if (this.hacerDescuento) {
        this.descuento = 10;
        recuento =
          recuento * (1 - this.descuento * 0.01) +
          this.currentcliente.valorDomi;
      } else {
        recuento = recuento + this.currentcliente.valorDomi;
        this.descuento = 0;
      }
      return recuento;
    },
  },
  methods: {
    filtradosClientes() {
      console.log(this.filtradosClientesArray.length);
      this.searchingCliente = true;
      if (this.filtroClientes == "") {
        this.filtradosClientesArray = this.clientDatabase;
        this.searchingCliente = false;
        return;
      } else {
        this.filtradosClientesArray = this.clientDatabase.filter((cliente) =>
          cliente.cedula.toString().includes(this.filtroClientes)
        );
        return;
      }
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
        cliente: {
          cedula: this.currentcliente.cedula,
          valorDomi: this.currentcliente.valorDomi,
          notasPedido: this.currentcliente.notasPedido,
          direccion: this.currentcliente.direccionCompleta,
          nombre: this.currentcliente.nombre,
          numero: this.currentcliente.numero,
        },
        productos: this.productosList,
        total: this.total,
        enPreparacion: true,
        enCamino: false,
        enMesa: false,
        entregado: false,
        domiciliario: null,
        fecha: new Date(),
        horaToma: new Date().getTime(),
        horaPreparado: null,
        horaDespachado: null,
        descuento: this.descuento,
      };

      const docRef = await addDoc(collection(db, "pedidos"), data);
      console.log(docRef.id);
      usePedidosStore().addPedido({ ...data, docId: docRef.id });
      this.cerrarPedido();
      useUtilsStore().confirmAction("Pedido Guardado Exitosamente");
    },

    async updatePedido() {
      try {
        const data = {
          cliente: {
            cedula: this.currentcliente.cedula,
            valorDomi: this.currentcliente.valorDomi,
            notasPedido: this.currentcliente.notasPedido,
            direccion: this.currentcliente.direccionCompleta,
            nombre: this.currentcliente.nombre,
            numero: this.currentcliente.numero,
          },
          productos: this.productosList,
          total: this.total,
          descuento: this.descuento,
        };

        const docRef = await doc(db, "pedidos", this.currentPedido.docId);

        const pedidoRef = await updateDoc(docRef, data);

        this.cerrarPedido();
        let cambio = this.pedidosDatabase.find(
          (pedido) => pedido.docId == this.currentPedido.docId
        );
        let index = this.pedidosDatabase.findIndex(
          (pedido) => pedido.docId == this.currentPedido.docId
        );
        this.pedidosDatabase[index] = { ...cambio, ...data };
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

    filtradosProductos(filtro, indexList) {
      this.searchingProduct = true;
      this.$refs.listaDesplegable[indexList].classList.remove("d-none");
      if (filtro == "") {
        this.filtradosProductosArray = this.productDatabase;
        return;
      } else {
        this.filtradosProductosArray = this.productDatabase.filter((producto) =>
          producto.nombre.toLowerCase().includes(filtro.toLowerCase())
        );
        return;
      }
    },
    addNewInvoiceItem() {
      this.productosList.push({
        nombre: "",
        precio: 0,
        cantidad: 1,
        id: uid(),
      });
    },
    setProducto(nombre, precio, idListItem, indexList) {
      const indexProduct = this.productosList.findIndex(
        (product) => product.id == idListItem
      );
      this.productosList[indexProduct].nombre = nombre;
      this.productosList[indexProduct].precio = precio;
      console.log(
        this.$refs.listaDesplegable[indexList].classList.add("d-none")
      );
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
    toggleClienteCompleto() {
      this.clienteCompleto = !this.clienteCompleto;
    },
    setcliente(id) {
      this.clienteCompleto = true;
      this.searchingCliente = false;
      useClientesStore().setCurrentCliente(id);
      this.filtroClientes = this.currentcliente.cedula;
    },
    cerrarPedido() {
      usePedidosStore().tooglePedidoFormOpen();
      this.resetcliente();
      if (this.editingPedido) {
        usePedidosStore().toggleEditPedido();
      }
    },

    editarCliente(id) {
      useClientesStore().toggleEditCliente();
      useClientesStore().toggleClientForm();
      useClientesStore().setCurrentCliente(id);
    },
    createCliente() {
      this.clienteCompleto = true;
      useClientesStore().toggleClientForm();
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

      const clienteId = this.clientDatabase.find(
        (cliente) => cliente.cedula == this.currentPedido.cliente.cedula
      );
      if (clienteId) {
        this.setcliente(clienteId.docId);
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
}

.lista {
  z-index: 102;
  position: absolute;
}

.lista button {
  border-radius: 5px;
}

.lista button:hover {
  background: rgb(215, 212, 212);
}

.list-container {
  position: relative;
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
