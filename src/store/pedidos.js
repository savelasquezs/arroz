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
	getters: {
		pedidosHoy: (state) =>
			state.pedidosDatabase.filter(
				(pedido) =>
					moment(pedido.fecha).format('DD-MM-YYYY') ==
					moment().format('DD-MM-YYYY')
			),
	},
});
