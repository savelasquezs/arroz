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
import { useUtilsStore } from './utils';

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
		async actualizarLiquidado(id) {
			const pedido = this.pedidosDatabase.find((pedido) => pedido.docId == id);
			const docRef = doc(db, 'pedidos', id);
			const liquidado = !pedido.liquidado;
			await updateDoc(docRef, { liquidado: liquidado });
		},
		async actualizarPagoConfimado(id) {
			const pedido = this.pedidosDatabase.find((pedido) => pedido.docId == id);
			const docRef = doc(db, 'pedidos', id);
			const pagoConfirmado = !pedido.pagoConfirmado;
			await updateDoc(docRef, { pagoConfirmado });
		},
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
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'pedidos',
				ordenarPor: 'horaToma',
				arrayName: 'pedidosDatabase',
			});
		},
	},
	getters: {
		getPedidos: (state) => (nombre, diaInicio, diaFinal) =>
			state.pedidosDatabase.filter((pedido) =>
				diaInicio
					? moment(pedido.horaToma).valueOf() >=
							moment(diaInicio).subtract(1, 'days').valueOf() &&
					  moment(pedido.horaToma).valueOf() <= moment(diaFinal).valueOf() &&
					  pedido.cliente.nombre
							.toLowerCase()
							.includes(nombre.toLocaleLowerCase())
					: pedido
			),
		pedidosHoy: (state) => {
			return state.pedidosDatabase.filter(
				(pedido) =>
					moment(pedido.fecha).format('DD-MM-YYYY') ==
					moment().format('DD-MM-YYYY')
			);
		},
		totalPedidosHoy() {
			return this.pedidosHoy.reduce((a, b) => a + b.total, 0);
		},
		pedidosBancoHoy() {
			const pedidos = this.pedidosHoy;
			return (banco) =>
				pedidos.filter((pedido) =>
					pedido.pagoOnline.some((pago) => pago.banco == banco)
				);
		},
		valorPedidosBancoHoy() {
			const pedidos = this.pedidosHoy;
			return (banco) =>
				pedidos
					.map((pedido) => {
						const valores = pedido.pagoOnline?.map((pago) => {
							if (pago.banco == banco) return pago.valor;
							return 0;
						});
						return valores.reduce((a, b) => a + b, 0);
					})
					.reduce((a, b) => a + b, 0);
		},
		valorBancoXpedido(state) {
			const pedidos = state.pedidosDatabase;
			return (banco, pedidoId) =>
				pedidos
					.find((pedido) => pedido.docId == pedidoId)
					.pagoOnline?.map((pago) => {
						if (pago.banco == banco) return pago.valor;
						return 0;
					})
					.reduce((a, b) => a + b, 0);
		},
		totalPedidosHoy() {
			return this.pedidosHoy.reduce((a, b) => a + b.total, 0);
		},
		pedidosBancoHoy() {
			const pedidos = this.pedidosHoy;
			return (banco) =>
				pedidos.filter((pedido) =>
					pedido.pagoOnline.some((pago) => pago.banco == banco)
				);
		},
		valorPedidosBancoHoy() {
			const pedidos = this.pedidosHoy;
			return (banco) =>
				pedidos
					.map((pedido) => {
						const valores = pedido.pagoOnline?.map((pago) => {
							if (pago.banco == banco) return pago.valor;
							return 0;
						});
						return valores.reduce((a, b) => a + b, 0);
					})
					.reduce((a, b) => a + b, 0);
		},
		valorBancoXpedido(state) {
			const pedidos = state.pedidosDatabase;
			return (banco, pedidoId) =>
				pedidos
					.find((pedido) => pedido.docId == pedidoId)
					?.pagoOnline?.map((pago) => {
						if (pago.banco == banco) return pago.valor;
						return 0;
					})
					.reduce((a, b) => a + b, 0);
		},
		valorPedidosBanco(state) {
			const pedidos = state.pedidosDatabase;
			return (banco) =>
				pedidos
					.map((pedido) => {
						const valores = pedido.pagoOnline?.map((pago) => {
							if (pago.banco == banco) return pago.valor;
							return 0;
						});
						return valores ? valores.reduce((a, b) => a + b, 0) : 0;
					})
					.reduce((a, b) => a + b, 0);
		},
		valorPedidosBancolombia(state) {
			const pedidos = state.pedidosDatabase;
			const Bancolombia = pedidos
				.map((pedido) => {
					const valores = pedido.pagoOnline?.map((pago) => {
						if (pago.banco == 'Bancolombia') return pago.valor;
						return 0;
					});
					return valores ? valores.reduce((a, b) => a + b, 0) : 0;
				})
				.reduce((a, b) => a + b, 0);
			const didi = pedidos
				.map((pedido) => {
					if (pedido.liquidado) {
						const valores = pedido.pagoOnline?.map((pago) => {
							if (pago.banco == 'Didi') return pago.valor;
							return 0;
						});
						return valores ? valores.reduce((a, b) => a + b, 0) : 0;
					}
					return 0;
				})
				.reduce((a, b) => a + b, 0);
			return didi + Bancolombia;
		},

		valorPedidosDidi(state) {
			const pedidos = state.pedidosDatabase;
			return pedidos
				.map((pedido) => {
					if (!pedido.liquidado) {
						const valores = pedido.pagoOnline?.map((pago) => {
							if (pago.banco == 'Didi') return pago.valor;
							return 0;
						});
						return valores ? valores.reduce((a, b) => a + b, 0) : 0;
					}
					return 0;
				})
				.reduce((a, b) => a + b, 0);
		},
	},
});
