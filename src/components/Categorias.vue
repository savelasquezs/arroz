

  <template>
  <div class="cat-header mt-3 d-flex justify-content-between">
    <h3 class="">Categorias</h3>
    <button-add mensaje="Agregar categoria" @click="abrirModal" />
  </div>

  <Acordion :list="allCategories" @editando="abrirEditCat" />
</template>



<script>
import { mapState } from "pinia";
import { useCategorias } from "../store/gastos";
import Acordion from "./Acordion.vue";
import buttonAdd from "./buttonAdd.vue";

export default {
  components: {
    Acordion,
    buttonAdd,
  },

  methods: {
    abrirEditCat(id) {
      useCategorias().setCurrent(id);
      useCategorias().toggleEditingd();
      useCategorias().toggleForm();
    },

    abrirModal() {
      useCategorias().toggleForm();
    },
  },
  computed: {
    ...mapState(useCategorias, ["allCategories"]),
  },
};
</script>

