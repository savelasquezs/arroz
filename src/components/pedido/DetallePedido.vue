<template>
  <div class="card">
    <div class="card-body">
      <div class="container d-flex justify-content-between">
        <div class="left w-50 mx-2">
          <h2 class="text-center">Cliente</h2>
          <hr />
          <hr />
          <h3 class="text-center">{{ pedido.cliente.nombre }}</h3>
          <h4 class="text-center">{{ pedido.cliente.cedula }}</h4>
          <p class="text-center">{{ pedido.cliente.numero }}</p>
          <p class="text-center">{{ pedido.cliente.direccion }}</p>
          <p class="text-center">
            Valor Domi: $ {{ pedido.cliente.valorDomi }}
          </p>
          <p class="text-center">Notas: {{ pedido.cliente.notasPedido }}</p>
        </div>

        <div class="right w-50">
          <h2 class="text-center">Pedido</h2>
          <hr />
          <hr />
          <h3 class="text-center">$ {{ pedido.total }}</h3>
          <h5>Descuento: {{ pedido.descuento }}</h5>
          <p>{{ fechaLocal(pedido.horaToma) }}</p>
          <p><strong>Hora toma:</strong> {{ horaLocal(pedido.horaToma) }}</p>
          <p>
            <strong>Hora preparado:</strong>
            {{ pedido.horaMesa ? horaLocal(pedido.horaMesa) : "Aún no" }}
          </p>
          <p>
            <strong>Hora despachado:</strong>
            {{ pedido.horaMesa ? horaLocal(pedido.horaCamino) : "Aún no" }}
          </p>
          <p>
            <strong>Domiciliario: </strong> {{ pedido.domiciliario?.nombre }}
          </p>
          <p>
            <strong>Hora entregado:</strong>
            {{ pedido.horaMesa ? horaLocal(pedido.horaEntregado) : "Aún no" }}
          </p>
          <p>
            Estado:
            <span class="mx-3" v-if="pedido.enPreparacion"
              ><Icon
                icon="mdi:pot-steam"
                color="#7e0000"
                width="30"
                height="30"
            /></span>
            <span v-if="pedido.enCamino"
              ><Icon
                icon="mdi:delivery-dining-electric"
                color="green"
                width="30"
                height="30"
            /></span>
            <span v-if="pedido.enMesa"
              ><Icon
                icon="material-symbols:table-restaurant"
                color="orange"
                width="30"
                height="30"
            /></span>
            <span v-if="pedido.entregado">
              <Icon icon="healthicons:happy" width="20" height="20"
            /></span>
          </p>

          <table class="table table-hover">
            <thead>
              <tr>
                <th align="center">Producto</th>
                <th align="center">Cantidad</th>
                <th align="center">ValorTotal</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in pedido.productos" :key="index">
                <td align="center">{{ item.nombre }}</td>
                <td align="center">{{ item.cantidad }}</td>
                <td align="center">$ {{ item.subtotal }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="button-container d-flex justify-content-around">
      <button class="btn btn-xl btn-warning" @click="cerrarModal">
        cerrar
      </button>
      <button class="btn btn-xl btn-info" @click="editarModal">Editar</button>
    </div>
  </div>
</template>

<script>
import { usePedidosStore } from "@/store/pedidos.js";
import { useUtilsStore } from "@/store/utils.js";
import { Icon } from "@iconify/vue";

export default {
  name: "detallePedido",
  props: ["pedido"],
  methods: {
    cerrarModal() {
      usePedidosStore().toggleDetallePedidoAbierto();
    },
    fechaLocal(fecha) {
      return useUtilsStore().fechaLocal(fecha);
    },
    horaLocal(hora) {
      return useUtilsStore().horaLocal(hora);
    },
  },
  components: {
    Icon,
  },
};
</script>

<style scoped>
.card {
  min-width: 850px;
}
</style>
