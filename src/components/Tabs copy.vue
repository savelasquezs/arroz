<template>
  <ul class="nav nav-tabs" id="myTab" role="tablist">
    <li
      class="nav-item"
      role="presentation"
      v-for="(item, index) in items"
      :key="index"
    >
      <button
        class="nav-link active"
        :id="item.id"
        data-bs-toggle="tab"
        :data-bs-target="'#' + item.id + '-pane'"
        role="tab"
        :aria-controls="'#' + item.id + '-pane'"
        aria-selected="true"
      >
        {{ item.name }}
      </button>
    </li>
  </ul>
  <div class="tab-content" id="myTabContent">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="tab-pane fade show active"
      id="item.id-pane"
      role="tabpanel"
      aria-labelledby="item.id"
      tabindex="0"
    >
      <slot name="item.slotName" />
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