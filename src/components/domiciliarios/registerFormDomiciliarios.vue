<template>
  <div class="card">
    <h4 v-if="registro">Registro de domiciliarios</h4>
    <h4 v-else>Ingresa tus credenciales</h4>
    <div class="form-floating my-3">
      <input
        type="text"
        class="form-control"
        id="nombreUsuario"
        placeholder="name@example.com"
        autocomplete="off"
        v-model="datosUsuario.nombreUsuario"
      />
      <label for="nombreUsuario">Nombre de Usuario</label>
    </div>
    <div class="form-floating my-3">
      <input
        type="password"
        class="form-control"
        id="password1"
        placeholder="Password"
        autocomplete="off"
        v-model="datosUsuario.password1"
      />
      <label for="password1">Contraseña</label>
    </div>
    <div class="form-floating my-3" v-if="registro">
      <input
        type="password"
        class="form-control"
        id="password2"
        placeholder="Password"
        autocomplete="off"
        v-model="datosUsuario.password2"
      />
      <label for="password2">Verifique contraseña</label>
    </div>
    <button class="btn btn-warning mb-3" v-if="registro" @click="registrar">
      Registrar
    </button>
    <button class="btn btn-warning mb-3" @click="confirmar" v-else>
      Confirmar
    </button>
    <button class="btn btn-danger mb-3" @click="cerrarModal">Salir</button>
    <a @click="cambiarModoForm" v-if="registro">Ya estoy registrado</a>
    <a v-else @click="cambiarModoForm">No estoy registrado aún</a>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useDomiciliarios } from "../../store/domiciliario";
import { useUtilsGastos } from "../../store/gastos";
import { useUtilsStore } from "../../store/main";
export default {
  props: ["registro"],
  data() {
    return {
      datosUsuario: {},
    };
  },
  methods: {
    cambiarModoForm() {
      useDomiciliarios().toggleloginFormOpened();
      useDomiciliarios().toggleregisterFormOpened();
    },
    confirmar() {
      const domiciliario = this.allDomiciliarios.find(
        (domiciliario) =>
          domiciliario.nombreDomiciliario.toLowerCase() ==
          this.datosUsuario.nombreUsuario.toLowerCase()
      );
      if (domiciliario) {
        if (domiciliario.contrasena == this.datosUsuario.password1) {
          this.$emit("domiAuthenticado", domiciliario);
        } else {
          useUtilsStore().confirmAction("Contraseña incorrecta", 3000, "error");
        }
      } else {
        useUtilsStore().confirmAction(
          "El usuario no existe, revise por favor",
          3000,
          "error"
        );
      }
    },
    cerrarModal() {
      if (this.registerFormOpened) {
        useDomiciliarios().toggleregisterFormOpened();
      }
      if (this.loginFormOpened) {
        useDomiciliarios().toggleloginFormOpened();
      }
    },
    registrar() {
      if (
        this.allDomiciliarios.some(
          (domiciliario) =>
            domiciliario.nombreDomiciliario.toLowerCase() ==
            this.datosUsuario.nombreUsuario.toLowerCase()
        )
      ) {
        useUtilsStore().confirmAction(
          "El domiciliario ya existe",
          2000,
          "error"
        );
        this.datosUsuario = {};
        return;
      } else {
        console.log(this.allDomiciliarios);
      }
      if (
        this.datosUsuario.password1.length > 0 &&
        this.datosUsuario.nombreUsuario.length > 0
      ) {
        if (this.datosUsuario.password1 == this.datosUsuario.password2) {
          const data = {
            nombreDomiciliario: this.datosUsuario.nombreUsuario,
            contrasena: this.datosUsuario.password1,
            pedidosEntregados: [],
          };
          useUtilsGastos().saveElement(data, "domiciliarios");
          this.cambiarModoForm();
          this.datosUsuario = {};
        } else {
          useUtilsStore().confirmAction(
            "Las contraseñas no coinciden, intente de nuevo",
            2000,
            "error"
          );
          this.datosUsuario = {};
        }
      } else {
        useUtilsStore().confirmAction(
          "Todos los campos son obligatorios",
          2000,
          "error"
        );
      }
    },
  },
  computed: {
    ...mapState(useDomiciliarios, [
      "allDomiciliarios",
      "registerFormOpened",
      "loginFormOpened",
    ]),
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  font-weight: 700;
  vertical-align: top;
  width: 80%;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
}
</style>