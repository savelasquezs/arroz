<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasTop"
    aria-labelledby="offcanvasTopLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasTopLabel">Nuevo Gasto</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control"
          id="floatingInput"
          placeholder="Nombre Gasto"
        />
        <label for="floatingInput">Nombre Gasto</label>
      </div>
      <div class="form-floating">
        <select
          class="form-select"
          id="floatingSelect"
          aria-label="Floating label select example"
        >
          <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        <label for="floatingSelect">categoria</label>
      </div>

      <div class="form-floating">
        <textarea
          class="form-control"
          placeholder="anotaciones"
          id="floatingTextarea"
        ></textarea>
        <label for="floatingTextarea">Anotaciones</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
</style>