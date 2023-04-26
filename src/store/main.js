import { defineStore } from 'pinia';
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	doc,
	updateDoc,
} from 'firebase/firestore';
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

		listenChanges() {
			const q = query(collection(db, 'clientes'), orderBy('nombre'));
			onSnapshot(q, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type == 'added') {
						if (
							!this.clientDatabase.some(
								(client) => client.docId == change.doc.id
							)
						) {
							const data = {
								docId: change.doc.id,
								...change.doc.data(),
								direccionCompleta: `${change.doc.data().direccion}, ${
									change.doc.data().notasDir
								}, ${change.doc.data().barrio}`,
							};
							this.clientDatabase.push(data);
						}
					} else if (change.type == 'removed') {
						this.clientDatabase = this.clientDatabase.filter(
							(doc) => doc.docId !== change.doc.id
						);
					} else if (change.type == 'modified') {
						let cambio = this.clientDatabase.find(
							(cliente) => cliente.docId == change.doc.id
						);
						let index = this.clientDatabase.findIndex(
							(cliente) => cliente.docId == change.doc.id
						);
						this.clientDatabase[index] = { ...cambio, ...change.doc.data() };
					}
				});
			});
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

		listenChanges() {
			const q = query(collection(db, 'productos'), orderBy('nombre'));
			onSnapshot(q, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type == 'added') {
						if (
							!this.productDatabase.some(
								(product) => product.docId == change.doc.id
							)
						) {
							const data = {
								docId: change.doc.id,
								...change.doc.data(),
							};
							this.productDatabase.push(data);
						}
					} else if (change.type == 'modified') {
						let cambio = this.productDatabase.find(
							(product) => product.docId == change.doc.id
						);
						let index = this.productDatabase.findIndex(
							(product) => product.docId == change.doc.id
						);
						this.productDatabase[index] = { ...cambio, ...change.doc.data() };
					} else if (change.type == 'removed') {
						this.productDatabase = this.productDatabase.filter(
							(product) => product.docId != change.doc.id
						);
					}
				});
			});
		},

		setCurrentProduct(id) {
			this.currentProduct = this.productDatabase.find(
				(product) => product.docId == id
			);
			console.log(this.currentProduct);
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

		siguienteEstado(id, domiciliario = null) {
			const pedido = this.pedidosDatabase.find((pedido) => pedido.docId == id);
			if (pedido.enPreparacion) {
				pedido.enPreparacion = false;
				pedido.enMesa = true;
				return {
					enPreparacion: false,
					enMesa: true,
					horaMesa: new Date().getTime(),
				};
			} else if (pedido.enMesa) {
				pedido.enMesa = false;
				pedido.enCamino = true;
				return {
					enMesa: false,
					enCamino: true,
					horaCamino: new Date().getTime(),
					domiciliario: domiciliario,
				};
			} else if (pedido.enCamino) {
				pedido.enCamino = false;
				pedido.entregado = true;
				return {
					enCamino: false,
					entregado: true,
					horaEntregado: new Date().getTime(),
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

		async actualizarEstado(id, domiciliario = null) {
			const docRef = doc(db, 'pedidos', id);
			await updateDoc(docRef, this.siguienteEstado(id, domiciliario));
		},

		toggleDelete() {
			this.deletingPedido = !this.deletingPedido;
		},
		setCurrentPedido(id) {
			this.currentPedido = this.pedidosDatabase.find(
				(pedido) => pedido.docId == id
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

		listenChanges() {
			const q = query(collection(db, 'pedidos'), orderBy('horaToma', 'desc'));
			onSnapshot(q, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type == 'added') {
						if (
							!this.pedidosDatabase.some(
								(pedido) => pedido.docId == change.doc.id
							)
						) {
							const data = {
								docId: change.doc.id,
								...change.doc.data(),
							};
							this.pedidosDatabase.unshift(data);
						}
					} else if (change.type == 'modified') {
						let cambio = this.pedidosDatabase.find(
							(pedido) => pedido.docId == change.doc.id
						);
						let index = this.pedidosDatabase.findIndex(
							(pedido) => pedido.docId == change.doc.id
						);
						this.pedidosDatabase[index] = { ...cambio, ...change.doc.data() };
					} else if (change.type == 'removed') {
						this.pedidosDatabase = this.pedidosDatabase.filter(
							(pedido) => pedido.docId != change.doc.id
						);
					}
				});
			});
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
		capitalize(words) {
			const wordsArray = words.split(' ');
			const wordsUppercase = wordsArray.map(
				(word) => word[0].toUpperCase() + word.substring(1)
			);
			const result = wordsUppercase.join(' ');
			return result;
		},
	},
});
