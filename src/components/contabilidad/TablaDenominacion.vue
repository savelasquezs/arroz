<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Denominación</th>
        <th>Cantidad</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tr>
      <td align="center">$100.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 100"
            aria-label="Billetes de 100"
            v-model="cien"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 100"
            aria-label="Billetes de 100"
            v-model="totalcien"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
    <tr>
      <td align="center">$50.000</td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder="💸 de 50"
            aria-label="Billetes de 50"
            v-model="cincuenta"
          />
        </div>
      </td>
      <td>
        <div class="input-group py-1">
          <input
            type="number"
            class="form-control"
            placeholder=" Total 💸 de 50"
            aria-label="Billetes de 50"
            v-model="totalcincuenta"
            disabled
          />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      cien: 0,
    };
  },
  computed: {
    totalcien() {
      return this.cien * 100000;
    },
  },
};
</script>

<style scoped>
table {
  width: 40%;
}
</style>