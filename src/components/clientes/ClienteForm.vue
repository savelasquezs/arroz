<template>
  <div class="card">
    <div class="card-body">
      <h2 v-if="!editClient" class="text-center mb-5">Guardar nuevo Cliente</h2>
      <h2 v-else class="text-center mb-5">Editar cliente</h2>

      <div class="clientForm px-5">
        <form @submit.prevent="submitCliente">
          <div class="row">
            <div class="mb-2 col">
              <label for="numero" class="form-label">Telefono</label>
              <input
                required
                type="number"
                class="form-control"
                id="numero"
                v-model="numero"
              />
            </div>
            <div class="mb-2 col">
              <label for="cedula" class="form-label">Cedula</label>
              <input
                required
                type="number"
                class="form-control"
                id="cedula"
                v-model="cedula"
              />
            </div>
            <div class="mb-2 col">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                required
                type="text"
                class="form-control"
                id="nombre"
                v-model="nombre"
              />
            </div>
          </div>
          <div class="row">
            <div class="mb-2">
              <label for="direccion" class="form-label">Dirección</label>
              <input
                required
                type="text"
                class="form-control"
                id="direccion"
                v-model="direccion"
              />
            </div>
            <div class="mb-2">
              <label for="barrio" class="form-label">Barrio-Ciudad</label>
              <input
                required
                type="text"
                class="form-control"
                id="barrio"
                aria-describedby="barriodescription"
                v-model="barrio"
              />
              <div id="barriodescription" class="form-text">
                Si no es un barrio reconocido, separa la ciudad con guión
              </div>
            </div>
          </div>
          <div class="mb-2">
            <label for="notasDireccion" class="form-label"
              >Notas dirección</label
            >
            <input
              type="text"
              class="form-control"
              id="notasDireccion"
              aria-describedby="descriptionAddress"
              v-model="notasDir"
            />
            <div id="descriptionAddress" class="form-text">
              Piso, apt o cualquier punto de interes
            </div>
          </div>
          <div class="mb-2">
            <label for="notasPedidos" class="form-label">Notas Pedidos</label>
            <input
              type="text"
              class="form-control"
              id="notasPedidos"
              aria-describedby="descriptionPedidos"
              placeholder="cucharas, sin
						pimenton...."
              v-model="notasPedido"
            />
            <div id="descriptionPedidos" class="form-text">
              Notas importantes para su pedido
            </div>
          </div>
          <div class="mb-2">
            <label for="valor_domi" class="form-label">Valor del domi</label>
            <input
              required
              type="number"
              class="form-control"
              id="valor_domi"
              v-model="valorDomi"
            />
          </div>
          <div class="button-container d-flex justify-content-around">
            <button
              type="button"
              @click="cerrarCliente"
              class="btn btn-lg btn-warning"
            >
              Salir
            </button>
            <button v-if="!editClient" type="submit" class="btn btn-success">
              Guardar
            </button>
            <button v-else type="submit" class="btn btn-success">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useClientesStore, useUtilsStore } from "@/store/main";
import { db } from "../../firebase/firebaseInit.js";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { mapState } from "pinia";
export default {
  name: "clientForm",
  data() {
    return {
      dateOptions: { year: "numeric", month: "short", day: "numeric" },
      docId: null,
      numero: null,
      nombre: null,
      direccion: null,
      barrio: null,
      notasDir: null,
      notasPedido: null,
      valorDomi: null,
      createdDate: null,
      cedula: null,
    };
  },
  methods: {
    toogleClienteForm() {
      useClientesStore().toggleClientForm();
    },
    cerrarCliente() {
      useClientesStore().toggleClientForm();
      if (this.editClient) {
        useClientesStore().toggleEditCliente();
      }
    },
    async guardarCliente() {
      if (
        this.clientDatabase.some((cliente) => cliente.cedula == this.cedula)
      ) {
        alert("Este numero de cedula ya está registrado");
        return;
      }
      try {
        const data = {
          numero: this.numero,
          nombre: useUtilsStore().capitalize(this.nombre),
          direccion: this.direccion,
          barrio: this.barrio,
          notasDir: this.notasDir,
          notasPedido: this.notasPedido,
          valorDomi: this.valorDomi,
          createdDate: this.createdDate,
          cedula: this.cedula,
        };

        const docRef = await addDoc(collection(db, "clientes"), data);

        console.log("Document written with ID: ", docRef.id);
        this.toogleClienteForm();

        useClientesStore().setCurrentCliente(docRef.id);
        useUtilsStore().confirmAction("Cliente Guardado exitosamente");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async updateCliente() {
      try {
        const data = {
          numero: this.numero,
          nombre: this.nombre,
          direccion: this.direccion,
          barrio: this.barrio,
          notasDir: this.notasDir,
          notasPedido: this.notasPedido,
          valorDomi: this.valorDomi,
        };

        const docRef = doc(db, "clientes", this.docId);
        const document = await updateDoc(docRef, data);
        useClientesStore().setCurrentCliente(this.docId);
        this.toogleClienteForm();
        useClientesStore().toggleEditCliente();
        useUtilsStore().confirmAction("Cliente Actualizado exitosamente");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },

    submitCliente() {
      if (!this.editClient) {
        this.guardarCliente();
        return;
      }
      this.updateCliente();
    },
  },

  created() {
    this.createdDate = new Date();

    if (this.editClient) {
      this.docId = this.currentcliente.docId;
      this.numero = this.currentcliente.numero;
      this.nombre = this.currentcliente.nombre;
      this.direccion = this.currentcliente.direccion;
      this.barrio = this.currentcliente.barrio;
      this.notasDir = this.currentcliente.notasDir;
      this.notasPedido = this.currentcliente.notasPedido;
      this.valorDomi = this.currentcliente.valorDomi;
      this.cedula = this.currentcliente.cedula;
    }
  },
  computed: {
    ...mapState(useClientesStore, [
      "clientDatabase",
      "editClient",
      "currentcliente",
    ]),
  },
};
</script>

<style scoped></style>
