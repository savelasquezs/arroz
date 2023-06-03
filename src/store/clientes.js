import { defineStore } from 'pinia';
import { useUtilsStore } from './utils';

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
		filtradosClientesArray(state) {
			return (filtro) => {
				return state.clientDatabase.filter((cliente) =>
					cliente.cedula.toString().includes(filtro)
				);
			};
		},
		getCustomers: (state) => (search) =>
			state.clientDatabase.filter((cliente) =>
				cliente.cedula.toString().includes(search)
			),
	},
	actions: {
		toggleDelete() {
			this.deletingCliente = !this.deletingCliente;
			console.log(this.deletingCliente);
		},
		toggleClientForm() {
			this.clienteFormShowed = !this.clienteFormShowed;
		},
		toggleEditCliente() {
			this.editClient = !this.editClient;
		},
		toggleDetalleCliente() {
			this.detalleCliente = !this.detalleCliente;
		},

		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'clientes',
				ordenarPor: 'nombre',
				arrayName: 'clientDatabase',
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
