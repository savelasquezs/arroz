import { defineStore } from 'pinia';
import { getDocs, collection } from 'firebase/firestore';
import Swal from 'sweetalert2';
import moment from 'moment';

import { db } from '../firebase/firebaseInit';

export const useClientesStore = defineStore('ClientesStore', {
	state: () => {
		return {
			clienteFormShowed: null,
			clientDatabase: [],
			clientesLoaded: null,
			editClient: null,
			currentcliente: {
				docId: 'prueba',
				numero: 'prueba',
				nombre: 'prueba',
				direccion: 'prueba',
				barrio: 'prueba',
				notasDir: 'prueba',
				notasPedido: 'prueba',
				valorDomi: 0,
				numero: 0,
			},

			deletingCliente: null,
			detalleCliente: null,
		};
	},
	getters: {
		doubleCount: (state) => state.count * 2,
	},
	actions: {
		toggleDelete() {
			this.deletingCliente = !this.deletingCliente;
			console.log(this.deletingCliente);
		},
		toggleClientForm() {
			this.clienteFormShowed = !this.clienteFormShowed;
		},
		addCliente(payload) {
			this.clientDatabase.push(payload);
		},
		toggleEditCliente() {
			this.editClient = !this.editClient;
		},
		toggleDetalleCliente() {
			this.detalleCliente = !this.detalleCliente;
		},
		async getInvoices() {
			const querySnapshot = await getDocs(collection(db, 'clientes'));
			querySnapshot.forEach((doc) => {
				if (!this.clientDatabase.some((client) => client.docId == doc.id)) {
					const data = {
						docId: doc.id,
						...doc.data(),
						direccionCompleta: `${doc.data().direccion}, ${
							doc.data().notasDir
						}, ${doc.data().barrio}`,
					};
					this.clientDatabase.push(data);
				}
			});
			this.invoicesLoaded = true;
		},
		setCurrentCliente(id) {
			this.currentcliente = {
				...this.clientDatabase.find((cliente) => cliente.docId == id),
			};
			console.log(this.currentcliente);
		},
		setCurrentClienteByCell(numero) {
			this.currentcliente = this.clientDatabase.find(
				(cliente) => cliente.numero == numero
			);
			console.log(this.currentcliente);
		},

		deletecliente(id) {
			this.clientDatabase = this.clientDatabase.filter(
				(cliente) => cliente.docId !== id
			);
		},
		resetCurrentClient() {
			this.currentcliente = {
				docId: 'prueba',
				numero: 'prueba',
				nombre: 'prueba',
				direccion: 'prueba',
				barrio: 'prueba',
				notasDir: 'prueba',
				notasPedido: 'prueba',
				valorDomi: 0,
				numero: 0,
			};
		},
	},
	// other options...
});

export const useProductsStore = defineStore('ProductosStore', {
	state: () => {
		return {
			editProduct: null,
			productDatabase: [],
			modalProducto: null,
			productLoaded: false,
			currentProduct: null,
			borrarProducto: null,
		};
	},
	actions: {
		addProduct(product) {
			this.productDatabase.push(product);
		},
		toggleModalProducto() {
			this.modalProducto = !this.modalProducto;
		},
		toggleEditProduct() {
			this.editProduct = !this.editProduct;
		},
		toggleDeleteProduct() {
			this.borrarProducto = !this.borrarProducto;
		},
		async getProducts() {
			const querySnapshot = await getDocs(collection(db, 'productos'));
			querySnapshot.forEach((doc) => {
				if (!this.productDatabase.some((product) => product.docId == doc.id)) {
					const data = {
						idDoc: doc.id,
						...doc.data(),
					};
					this.productDatabase.push(data);
				}
			});

			this.productLoaded = true;
		},
		setCurrentProduct(id) {
			this.currentProduct = this.productDatabase.find(
				(product) => product.idDoc == id
			);
			console.log(this.currentProduct);
		},
		deleteProduct(id) {
			this.productDatabase = this.productDatabase.filter(
				(product) => product.idDoc != id
			);
		},
	},
});

export const usePedidosStore = defineStore('PedidosStore', {
	state: () => {
		return {
			pedidoFormOpen: null,
			pedidosDatabase: [],
			productLoaded: null,
			deletingPedido: null,
			currentPedido: null,
			detallePedidoAbierto: null,
			editingPedido: null,
		};
	},
	actions: {
		toggleDetallePedidoAbierto() {
			this.detallePedidoAbierto = !this.detallePedidoAbierto;
		},
		toggleEditPedido() {
			this.editingPedido = !this.editingPedido;
		},

		siguienteEstado(id) {
			const pedido = this.pedidosDatabase.find((pedido) => pedido.docId == id);
			if (pedido.enPreparacion) {
				pedido.enPreparacion = false;
				pedido.enMesa = true;
				return {
					enPreparacion: false,
					enMesa: true,
				};
			} else if (pedido.enMesa) {
				pedido.enMesa = false;
				pedido.enCamino = true;
				return {
					enMesa: false,
					enCamino: true,
				};
			} else if (pedido.enCamino) {
				pedido.enCamino = false;
				pedido.entregado = true;
				return {
					enCamino: false,
					entregado: true,
				};
			} else if (pedido.entregado) {
				pedido.entregado = false;
				pedido.enPreparacion = true;
				return {
					entregado: false,
					enPreparacion: true,
				};
			}
		},
		toggleDelete() {
			this.deletingPedido = !this.deletingPedido;
		},
		setCurrentPedido(id) {
			this.currentPedido = this.pedidosDatabase.find(
				(pedido) => pedido.docId == id
			);
		},
		addPedido(pedido) {
			this.pedidosDatabase.push(pedido);
		},
		deletePedido(id) {
			this.pedidosDatabase = this.pedidosDatabase.filter(
				(pedido) => pedido.docId != id
			);
		},
		buscarCliente() {
			const clientes = useClientesStore();
			this.clientesFiltrados = clientes.clientDatabase.filter(
				(cliente) => cliente.numero == this.filtroCliente
			);
		},
		tooglePedidoFormOpen() {
			this.pedidoFormOpen = !this.pedidoFormOpen;
		},
		async getPedidos() {
			const querySnapshot = await getDocs(collection(db, 'pedidos'));
			querySnapshot.forEach((doc) => {
				if (!this.pedidosDatabase.some((pedido) => pedido.docId == doc.id)) {
					const data = {
						docId: doc.id,
						...doc.data(),
					};
					this.pedidosDatabase.push(data);
				}
			});

			this.productLoaded = true;
		},
	},
});

export const useUtilsStore = defineStore('UtilsStore', {
	state: () => {
		return {};
	},
	actions: {
		confirmAction(Mensaje, timer = 2000, icon = 'success') {
			Swal.fire({
				position: 'top-end',
				icon,
				title: Mensaje,
				showConfirmButton: false,
				timer,
			});
		},
		fechaLocal(fecha) {
			return moment(fecha).format('ll');
		},
		horaLocal(hora) {
			return moment(hora).format('LT');
		},
	},
});
