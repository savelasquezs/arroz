<template>
	<Modal v-if="deletingCliente"
		><Borrar
			:itemId="currentcliente.docId"
			collection="clientes"
			:itemName="currentcliente.nombre"
			v-if="deletingCliente"
	/></Modal>

	<Modal v-if="detalleCliente">
		<DetalleCliente v-if="detalleCliente" :cliente="currentcliente" />
	</Modal>
	<div class="container clientesCont">
		<h2>Tabla de Clientes</h2>
		<hr />
		<div class="input-group mb-3 d-flex justify-content-end">
			<button class="btn btn-success" @click="crearCliente">
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
				Nuevo Cliente
			</button>
		</div>
		<div class="input-group mb-5 h-5">
			<input
				type="text"
				class="form-control"
				placeholder="  ...Buscar por Cedula"
				v-model="filtro"
				@keyup="filtradosClientes"
			/>
		</div>
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Cedula</th>

					<th>Nombre</th>
					<th>Telefono</th>
					<th>Dirección</th>
					<th>Valor Domi</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-if="filtrados"
					v-for="(cliente, index) in filtrados"
					:key="index"
					@click.self="verDetalles(cliente.docId)"
				>
					<td>{{ cliente.cedula }}</td>

					<td>{{ cliente.nombre }}</td>
					<td>{{ cliente.numero }}</td>
					<td>{{ cliente.direccion }}</td>
					<td>{{ cliente.valorDomi }}</td>
					<td>
						<button
							class="btn btn-sm btn-info"
							@click="verDetalles(cliente.docId)"
						>
							<Icon
								icon="mdi:eye-outline"
								color="black"
								width="20"
								height="20"
							/>
						</button>
						<button
							class="btn btn-sm btn-warning"
							@click="editarCliente(cliente.docId)"
						>
							<Icon
								icon="material-symbols:edit"
								color="black"
								width="20"
								height="20"
							/>
						</button>
						<button
							class="btn btn-sm btn-danger"
							@click="borrarCliente(cliente.docId)"
						>
							<Icon icon="bi:trash-fill" color="black" width="20" height="20" />
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Borrar from '@/components/Borrar.vue';
import Modal from '@/components/Modal.vue';
import DetalleCliente from '@/components/DetalleCliente.vue';
import { Icon } from '@iconify/vue';

import { useClientesStore } from '../store/main';
import Navbar from '@/components/Navbar.vue';
import { mapState } from 'pinia';
export default {
	name: 'home',
	data() {
		return {
			filtro: '',
			filtrados: [],
		};
	},

	components: {
		Navbar,
		Borrar,
		Modal,
		DetalleCliente,
		Icon,
	},
	methods: {
		filtradosClientes() {
			if (this.filtro == '') {
				this.filtrados = this.clientDatabase;
				return;
			} else {
				this.filtrados = this.clientDatabase.filter((cliente) =>
					cliente.cedula.toString().includes(this.filtro)
				);
				return;
			}

			console.log(this.filtrados);
		},
		toogleClienteForm() {
			useClientesStore().toggleClientForm();
		},
		crearCliente() {
			if (this.editClient) {
				useClientesStore().toggleEditCliente();
			}
			useClientesStore().toggleClientForm();
		},
		verDetalles(id) {
			useClientesStore().toggleDetalleCliente();
			useClientesStore().setCurrentCliente(id);
		},

		editarCliente(id) {
			this.toogleClienteForm();
			useClientesStore().setCurrentCliente(id);
			useClientesStore().toggleEditCliente();
		},
		borrarCliente(id) {
			useClientesStore().setCurrentCliente(id);
			useClientesStore().toggleDelete();
		},
	},
	computed: {
		...mapState(useClientesStore, [
			'clientDatabase',
			'editClient',
			'currentcliente',
			'deletingCliente',
			'detalleCliente',
		]),
	},
	watch: {
		clientDatabase() {
			this.filtradosClientes();
		},
	},

	created() {
		this.filtradosClientes();
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
tbody tr {
	cursor: pointer;
}
</style>
