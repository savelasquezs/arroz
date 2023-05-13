import { db } from '../firebase/firebaseInit';
import { defineStore } from 'pinia';
import { useUtilsStore } from './utils';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export const useDomiciliarios = defineStore('domiciliarios', {
	state: () => {
		return {
			currentDomiciliario: {},
			allDomiciliarios: [],
			registerFormOpened: null,
			loginFormOpened: null,
		};
	},
	actions: {
		toggleregisterFormOpened() {
			this.registerFormOpened = !this.registerFormOpened;
		},
		toggleloginFormOpened() {
			this.loginFormOpened = !this.loginFormOpened;
		},
		setCurrentDomiciliario(id) {
			this.currentDomiciliario = this.allDomiciliarios.find(
				(domiciliario) => domiciliario.docId == id
			);
		},

		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'domiciliarios',
				ordenarPor: 'nombreDomiciliario',
				arrayName: 'allDomiciliarios',
			});
		},
	},
});

export const useAbonos = defineStore('Abonos', {
	state: () => {
		return {
			addingAbono: null,
			allAbonos: [],
		};
	},
	actions: {
		toogleAbonoForm() {
			this.addingAbono = !this.addingAbono;
		},
		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'abonos',
				ordenarPor: 'domiciliario.nombreDomiciliario',
				arrayName: 'allAbonos',
			});
		},
	},
});

export const useDetallesPedidosYAbonos = defineStore('DetallesYAnonos', {
	state: () => {
		return {
			detallesPedidosYAbonosOppened: null,
		};
	},
	actions: {
		toggleDetallesYPedidos() {
			console.log(this.detallesPedidosYAbonosOppened);
			this.detallesPedidosYAbonosOppened = !this.detallesPedidosYAbonosOppened;
			console.log(this.detallesPedidosYAbonosOppened);
		},
	},
});
