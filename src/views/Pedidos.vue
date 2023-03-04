<template>
	<Modal v-if="pedidoFormOpen"><PedidosForm /></Modal>
	<Modal v-if="editClient"><ClienteForm /></Modal>

	<div class="container clientesCont">
		<h2>Tabla de Pedidos</h2>
		<hr />
		<div class="input-group mb-3 d-flex justify-content-end">
			<button class="btn btn-success" @click="createPedido">
				<span
					><svg
						xmlns="http://www.w3.org/2000/svg"
						width="30"
						height="30"
						viewBox="0 0 24 24"
					>
						<path
							fill="white"
							d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
						/></svg
				></span>
				Nuevo pedido
			</button>
		</div>
		<div class="input-group mb-5 h-5">
			<input
				type="text"
				v-model="filtroPedidos"
				@keyup="filtradosPedidos"
				class="form-control"
				placeholder="  ...Buscar"
			/>
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>Identificador</th>
					<th>Fecha</th>
					<th>Cliente</th>
					<th>Valor</th>
					<th>Estado</th>
				</tr>
			</thead>
		</table>
	</div>
</template>

<script>
import { useClientesStore } from '../store/main';
import ClienteForm from '@/components/ClienteForm.vue';
import Modal from '@/components/Modal.vue';
import PedidosForm from '@/components/PedidosForm.vue';
import { mapState } from 'pinia';
import { usePedidosStore } from '@/store/main';
export default {
	name: 'home',
	data() {
		return {
			filtroPedidos: [],
		};
	},

	components: {
		Modal,
		PedidosForm,
		ClienteForm,
	},
	computed: {
		...mapState(usePedidosStore, ['pedidoFormOpen']),
	},
	methods: {
		createPedido() {
			usePedidosStore().tooglePedidoFormOpen();
		},
	},
};
</script>

<style scoped>
hr {
	margin-bottom: 50px;
}
.clientesCont {
	padding-top: 100px;
}
</style>
