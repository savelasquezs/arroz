<template>
  <form>
    <div class="mb-3">
      <label for="email" class="form-label">Correo registrado</label>
      <input
        type="email"
        class="form-control"
        id="email"
        aria-describedby="emailHelp"
        v-model="emailToAdmin"
      />
      <div id="emailHelp" class="form-text">Este correo se volverá admin.</div>
    </div>

    <button
      type="submit"
      @click.prevent="agregarAdmins"
      class="btn btn-primary"
    >
      Convertir a Admin
    </button>
  </form>
</template>

<script>
import { httpsCallable } from "firebase/functions";
import { functions } from "../../firebase/firebaseInit";
export default {
  data() {
    return {
      emailToAdmin: "",
    };
  },
  methods: {
    agregarAdmins() {
      const addAdminRole = httpsCallable(functions, "addAdminRole");
      addAdminRole({ email: this.emailToAdmin }).then((result) => {
        console.log(result);
      });
      this.emailToAdmin = "";
    },
  },
};
</script>

<style scoped>
</style>