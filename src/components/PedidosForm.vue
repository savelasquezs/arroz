<template>
	<div class="card">
		<div class="card-body">
			<form>
				<section class="cliente">
					<div class="d-flex justify-content-between">
						<h4>Cliente</h4>
						<button
							class="btn btn-info"
							v-show="clienteCompleto"
							@click.prevent="editarCliente(currentcliente.docId)"
						>
							<Icon
								icon="material-symbols:edit"
								color="black"
								width="24"
								height="24"
							/>
						</button>
					</div>
					<hr />
					<div class="row">
						<div class="mb-2 col list-container">
							<label for="numero" class="form-label">Telefono</label>
							<button
								class="btn btn-sm btn-outline-success float-end"
								v-if="filtradosClientesArray.length == 0"
								@click.prevent="createCliente"
							>
								<Icon icon="mdi:create-new-folder" color="white" />
								Crear Cliente
							</button>

							<input
								required
								type="number"
								class="form-control"
								id="numero"
								v-model="filtroClientes"
								@keyup="filtradosClientes"
							/>
							<div class="list-group lista" v-if="searchingCliente">
								<button
									type="button"
									class="list-group-item list-group-item-action"
									v-for="(cliente, index) in filtradosClientesArray"
									:key="index"
									@click="setcliente(cliente.docId)"
								>
									{{ cliente.numero }}
								</button>
							</div>
						</div>
						<div class="mb-2 col" v-show="clienteCompleto">
							<label for="nombre" class="form-label">Nombre</label
							><input
								required
								type="text"
								class="form-control"
								id="nombre"
								v-model="nombre"
							/>
						</div>
					</div>
					<div class="cliente-data" v-show="clienteCompleto">
						<div class="row">
							<div class="mb-2">
								<label for="direccion" class="form-label">Dirección</label
								><input
									required
									type="text"
									class="form-control"
									id="direccion"
									v-model="direccionCompleta"
								/>
							</div>
						</div>
						<div class="mb-2">
							<label for="notasPedidos" class="form-label">Notas Pedidos</label
							><input
								type="text"
								class="form-control"
								id="notasPedidos"
								placeholder="cucharas, sin pimenton...."
								v-model="notasPedido"
							/>
						</div>
						<div class="mb-2">
							<label for="valor_domi" class="form-label">Valor del domi</label
							><input
								required
								type="number"
								class="form-control"
								id="valor_domi"
								v-model="valorDomi"
							/>
						</div>
					</div>
				</section>
				<hr />
				<section class="productos">
					<div class="work-items">
						<div class="d-flex justify-content-between">
							<h4>Productos</h4>
							<button
								@click.prevent="addNewInvoiceItem"
								class="addInvoiceItem btn btn-outline-success btn-sm"
							>
								<Icon
									icon="material-symbols:add-circle-outline"
									color="white"
									width="30"
									height="30"
								/>
								Agregar
							</button>
						</div>
						<hr />
						<table class="table table-hover">
							<thead>
								<tr>
									<th class="col-sm-6">Producto</th>
									<th class="col-sm-1">Cantidad</th>
									<th class="col-sm-2">Precio</th>
									<th>Subtotal</th>
								</tr>
							</thead>
							<tbody>
								<tr
									v-for="(producto, indexProducto) in productosList"
									:key="indexProducto"
								>
									<td>
										<input
											required
											type="text"
											class="form-control"
											id="producto"
											v-model="producto.nombre"
											@keyup="
												filtradosProductos(producto.nombre, indexProducto)
											"
										/>
										<div ref="listaDesplegable" class="list-group lista">
											<button
												type="button"
												class="list-group-item list-group-item-action"
												v-for="(item, index) in filtradosProductosArray"
												:key="index"
												@click="
													setProducto(
														item.nombre,
														item.valor,
														producto.id,
														indexProducto
													)
												"
											>
												{{ item.nombre }}
											</button>
										</div>
									</td>
									<td>
										<input
											type="text"
											v-model="producto.cantidad"
											class="form-control"
										/>
									</td>
									<td>
										<input
											type="text"
											v-model="producto.precio"
											class="form-control"
										/>
									</td>
									<td>
										<input
											type="text"
											readonly
											:value="
												(producto.subtotal =
													producto.cantidad * producto.precio)
											"
											class="form-control"
										/>
									</td>
									<img
										@click="deleteInvoiceProducto(producto.id)"
										src="@/assets/icon-delete.svg"
										alt=""
									/>
								</tr>
							</tbody>
						</table>
					</div>
				</section>
				<div class="button-container d-flex justify-content-around">
					<button
						type="button"
						@click="cerrarPedido"
						class="btn btn-lg btn-warning"
					>
						Salir</button
					><button v-if="!editClient" type="submit" class="btn btn-success">
						Guardar</button
					><button v-else type="submit" class="btn btn-success">
						Actualizar
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import {
	useClientesStore,
	usePedidosStore,
	useProductsStore,
} from '@/store/main';
import ClienteForm from '@/components/ClienteForm.vue';
import { Icon } from '@iconify/vue';

import { uid } from 'uid';

import { mapState } from 'pinia';

export default {
	name: 'pedidoForm',
	data() {
		return {
			clientesFiltrados: [],
			clienteCompleto: null,
			searchingCliente: null,
			clienteId: null,
			valorDomi: null,
			notasPedido: null,
			notasDir: null,
			barrio: null,
			direccion: null,
			nombre: null,
			numero: null,
			filtroClientes: '',
			filtradosClientesArray: [],
			productosList: [],
			filtradosProductosArray: [],
		};
	},
	components: {
		ClienteForm,
		Icon,
	},

	computed: {
		...mapState(useClientesStore, [
			'clientDatabase',
			'editClient',
			'currentcliente',
		]),
		...mapState(usePedidosStore, ['pedidoFormOpen']),
		...mapState(useProductsStore, ['productDatabase']),
		direccionCompleta() {
			if (this.direccion) {
				return `${this.direccion}, ${this.notasDir}, ${this.barrio} `;
			}
			return '';
		},
	},
	methods: {
		filtradosClientes() {
			console.log(this.filtradosClientesArray.length);
			this.searchingCliente = true;
			if (this.filtroClientes == '') {
				this.filtradosClientesArray = this.clientDatabase;
				this.searchingCliente = false;
				return;
			} else {
				this.filtradosClientesArray = this.clientDatabase.filter((cliente) =>
					cliente.numero.toString().includes(this.filtroClientes)
				);
				return;
			}
		},

		filtradosProductos(filtro, indexList) {
			this.searchingProduct = true;
			this.$refs.listaDesplegable[indexList].classList.remove('d-none');
			if (filtro == '') {
				this.filtradosProductosArray = this.productDatabase;
				return;
			} else {
				this.filtradosProductosArray = this.productDatabase.filter((producto) =>
					producto.nombre.includes(filtro)
				);
				return;
			}
		},
		addNewInvoiceItem() {
			this.productosList.push({
				nombre: '',
				precio: 0,
				cantidad: 1,
				id: uid(),
			});
		},
		setProducto(nombre, precio, idListItem, indexList) {
			const indexProduct = this.productosList.findIndex(
				(product) => product.id == idListItem
			);
			this.productosList[indexProduct].nombre = nombre;
			this.productosList[indexProduct].precio = precio;
			console.log(
				this.$refs.listaDesplegable[indexList].classList.add('d-none')
			);
		},
		deleteInvoiceProducto(id) {
			this.productosList = this.productosList.filter(
				(product) => product.id != id
			);
		},
		resetcliente() {
			this.clienteId = null;
			this.valorDomi = null;
			this.notasPedido = null;
			this.notasDir = null;
			this.barrio = null;
			this.direccion = null;
			this.nombre = null;
			this.numero = null;
		},
		toggleClienteCompleto() {
			this.clienteCompleto = !this.clienteCompleto;
		},
		setcliente(id) {
			this.toggleClienteCompleto();
			this.searchingCliente = false;
			useClientesStore().setCurrentCliente(id);
			this.clonarClienteASelf();
		},
		cerrarPedido() {
			usePedidosStore().tooglePedidoFormOpen();
			this.resetcliente();
		},

		clonarClienteASelf() {
			this.clienteId = this.currentcliente.docId;
			this.numero = this.currentcliente.numero;
			this.nombre = this.currentcliente.nombre;
			this.direccion = this.currentcliente.direccion;
			this.barrio = this.currentcliente.barrio;
			this.notasDir = this.currentcliente.notasDir;
			this.notasPedido = this.currentcliente.notasPedido;
			this.valorDomi = this.currentcliente.valorDomi;
			this.filtroClientes = this.currentcliente.numero;
		},
		editarCliente(id) {
			useClientesStore().toggleEditCliente();
			useClientesStore().toggleClientForm();
			useClientesStore().setCurrentCliente(id);
		},
		createCliente() {
			this.clienteCompleto = true;
			useClientesStore().toggleClientForm();
			this.clonarClienteASelf();
		},
	},
	watch: {
		clientDatabase() {
			this.clonarClienteASelf();
		},
		currentcliente() {
			this.clonarClienteASelf();
			console.log(this.valorDomi);
		},
	},
};
</script>
<style scoped lang="scss">
.card {
	overflow: scroll;
	max-height: 90vh;
	min-width: 800px;
}

.lista {
	z-index: 102;
	position: absolute;
}

.lista button {
	border-radius: 5px;
}

.lista button:hover {
	background: rgb(215, 212, 212);
}

.list-container {
	position: relative;
}
h4 {
	margin: 0;
}
hr {
	margin: 0.5rem;
}
.productos img {
	margin-top: 10px;
	width: 30px;
}
.addInvoiceItem {
	float: right;
}
</style>
