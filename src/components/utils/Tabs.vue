<template>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="gastosDia-tab"
        data-bs-toggle="tab"
        data-bs-target="#gastosDia-tab-pane"
        role="tab"
        aria-controls="gastosDia-tab-pane"
        aria-selected="true"
      >
        Gastos del dia
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="totales-tab"
        data-bs-toggle="tab"
        data-bs-target="#totales-tab-pane"
        type="button"
        role="tab"
        aria-controls="totales-tab-pane"
        aria-selected="false"
      >
        Todos los gastos
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="tipos-tab"
        data-bs-toggle="tab"
        data-bs-target="#tipos-tab-pane"
        type="button"
        role="tab"
        aria-controls="tipos-tab-pane"
        aria-selected="false"
      >
        tipos de gasto
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="categorias-tab"
        data-bs-toggle="tab"
        data-bs-target="#categorias-tab-pane"
        type="button"
        role="tab"
        aria-controls="categorias-tab-pane"
        aria-selected="false"
      >
        Categorias de gasto
      </button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      class="tab-pane fade show active"
      id="gastosDia-tab-pane"
      role="tabpanel"
      aria-labelledby="gastosDia-tab"
      tabindex="0"
    >
      <slot name="gastosDia" />
    </div>
    <div
      class="tab-pane fade"
      id="totales-tab-pane"
      role="tabpanel"
      aria-labelledby="totales-tab"
      tabindex="0"
    >
      <slot name="todos" />
    </div>
    <div
      class="tab-pane fade"
      id="tipos-tab-pane"
      role="tabpanel"
      aria-labelledby="tipos-tab"
      tabindex="0"
    >
      <slot name="tipos" />
    </div>
    <div
      class="tab-pane fade"
      id="categorias-tab-pane"
      role="tabpanel"
      aria-labelledby="categorias-tab"
      tabindex="0"
    >
      <slot name="categorias" />
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