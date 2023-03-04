import { defineStore } from 'pinia';
import { getDocs, collection } from 'firebase/firestore';

import { db } from '../firebase/firebaseInit';

export const useClientesStore = defineStore('ClientesStore', {
	state: () => {
		return {
			clienteFormShowed: null,
			clientDatabase: [],
			clientesLoaded: null,
			editClient: null,
			currentcliente: null,
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
					};
					this.clientDatabase.push(data);
				}
			});
			this.invoicesLoaded = true;
		},
		setCurrentCliente(id) {
			this.currentcliente = this.clientDatabase.find(
				(cliente) => cliente.docId == id
			);
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
		};
	},
	actions: {
		buscarCliente() {
			const clientes = useClientesStore();
			this.clientesFiltrados = clientes.clientDatabase.filter(
				(cliente) => cliente.numero == this.filtroCliente
			);
		},
		tooglePedidoFormOpen() {
			this.pedidoFormOpen = !this.pedidoFormOpen;
		},
	},
});
