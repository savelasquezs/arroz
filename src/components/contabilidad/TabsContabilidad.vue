<template>
  <ul class="nav nav-tabs" id="CuadreTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="cuentaCaja"
        data-bs-toggle="tab"
        data-bs-target="#cuentaCajaTab"
        role="tab"
        aria-controls="cuentaCajaTab"
        aria-selected="true"
      >
        Contar Caja
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="historicoCuadre"
        data-bs-toggle="tab"
        data-bs-target="#historicoCuadreTab"
        type="button"
        role="tab"
        aria-controls="historicoCuadreTab"
        aria-selected="false"
      >
        Historico de Cuadres
      </button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      class="tab-pane fade show active"
      id="cuentaCajaTab"
      role="tabpanel"
      aria-labelledby="cuentaCaja"
      tabindex="0"
    >
      <slot name="cuadreDiario" />
    </div>
    <div
      class="tab-pane fade"
      id="historicoCuadreTab"
      role="tabpanel"
      aria-labelledby="historicoCuadre"
      tabindex="0"
    >
      <slot name="historico" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
li button {
  border-radius: 0;
  color: gray;
  font-weight: 500;
  &:hover {
    color: black;
  }
}
</style>