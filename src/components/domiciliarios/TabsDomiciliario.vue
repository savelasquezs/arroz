<template>
  <ul class="nav nav-tabs" id="MyDomiTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="pedidosDomiciliario-tab"
        data-bs-toggle="tab"
        data-bs-target="#pedidosDomiciliario"
        role="tab"
        aria-controls="pedidosDomiciliario"
        aria-selected="true"
      >
        Pedidos
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="abonos-tab"
        data-bs-toggle="tab"
        data-bs-target="#abonos-pane"
        type="button"
        role="tab"
        aria-controls="abonos-pane"
        aria-selected="false"
      >
        Abonos
      </button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      class="tab-pane fade show active"
      id="pedidosDomiciliario"
      role="tabpanel"
      aria-labelledby="pedidosDomiciliario-tab"
      tabindex="0"
    >
      <slot name="pedidos" />
    </div>
    <div
      class="tab-pane fade"
      id="abonos-pane"
      role="tabpanel"
      aria-labelledby="abonos-tab"
      tabindex="0"
    >
      <slot name="abonos" />
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