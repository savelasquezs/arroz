<template>
  <div class="loginContainer">
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div class="card card0 border-0">
        <div class="row d-flex">
          <div class="col-lg-6">
            <div class="card1 pb-5">
              <div class="row">
                <img src="../assets/arrocito.png" class="logo" />
              </div>
              <div
                class="row px-3 justify-content-center mt-4 mb-5 border-line"
              >
                <img src="https://i.imgur.com/uNGdWHi.png" class="image" />
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card2 card border-0 px-4 py-5">
              <div class="row px-3 mb-4">
                <div class="line"></div>
                <small class="or text-center">Inicio de Sesión</small>
                <div class="line"></div>
              </div>
              <div class="row px-3">
                <label class="mb-1"
                  ><h6 class="mb-0 text-sm">Correo Electronico</h6></label
                >
                <input
                  class="mb-4"
                  type="text"
                  name="email"
                  placeholder="Ingresa un correo registrado"
                  v-model="usuario.email"
                />
              </div>
              <div class="row px-3">
                <label class="mb-1"
                  ><h6 class="mb-0 text-sm">Contraseña</h6></label
                >
                <input
                  type="contrasena"
                  name="contrasena"
                  placeholder="ingresa contrasena"
                  v-model="usuario.password"
                />
              </div>
              <div class="row px-3 mb-4">
                <a href="#" class="ml-auto mb-0 text-sm"
                  >Olvide la contraseña?</a
                >
              </div>
              <div class="row mb-3 px-3">
                <button
                  type="submit"
                  class="btn btn-outline-success text-center"
                  @click="iniciarSesion"
                >
                  Iniciar!!
                </button>
              </div>
              <div class="row mb-4 px-3">
                <small class="font-weight-bold"
                  >No tienes cuenta aún?
                  <a class="text-danger">Registrate</a></small
                >
              </div>
            </div>
          </div>
        </div>
        <div class="bg-blue py-4">
          <div class="row px-3">
            <small class="ml-4 ml-sm-5 mb-2"
              >Hecho con 💖 por Santiago Velásquez</small
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../firebase/firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../store/auth";
export default {
  data() {
    return {
      usuario: {},
    };
  },
  methods: {
    iniciarSesion() {
      useAuth().login(this.usuario);
    },
  },
};
</script>

<style scoped>
.container-fluid {
  max-width: 1300px;
}
.loginContainer {
  color: #000;
  overflow-x: hidden;
  height: 100vh;
  background-color: #b0bec5;
  background-repeat: no-repeat;
  display: grid;
  align-items: center;
}

.card0 {
  box-shadow: 0px 4px 8px 0px #757575;
  border-radius: 0px;
}

.card2 {
  margin: 0px 40px;
}

.logo {
  width: 150px;
  height: 100px;
  margin-top: 20px;
  margin-left: 35px;
}

.image {
  width: 360px;
  height: 280px;
}

.border-line {
  border-right: 1px solid #eeeeee;
}

.line {
  height: 1px;
  width: 25%;
  background-color: #e0e0e0;
  margin-top: 10px;
}

.or {
  width: 50%;
  font-weight: bold;
}

.text-sm {
  font-size: 14px !important;
}

::placeholder {
  color: #bdbdbd;
  opacity: 1;
  font-weight: 300;
}

:-ms-input-placeholder {
  color: #bdbdbd;
  font-weight: 300;
}

::-ms-input-placeholder {
  color: #bdbdbd;
  font-weight: 300;
}

input,
textarea {
  padding: 10px 12px 10px 12px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 5px;
  margin-top: 2px;
  width: 100%;
  box-sizing: border-box;
  color: #2c3e50;
  font-size: 14px;
  letter-spacing: 1px;
}

input:focus,
textarea:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border: 1px solid #304ffe;
  outline-width: 0;
}

button:focus {
  -moz-box-shadow: none !important;
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  outline-width: 0;
}

a {
  color: inherit;
  cursor: pointer;
}

.bg-blue {
  color: #fff;
  background-color: #1a237e;
}

@media screen and (max-width: 991px) {
  .logo {
    margin-left: 0px;
  }

  .image {
    width: 300px;
    height: 220px;
  }

  .border-line {
    border-right: none;
  }

  .card2 {
    border-top: 1px solid #eeeeee !important;
    margin: 0px 15px;
  }
}
</style>