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
			const q = query(
				collection(db, 'abonos'),
				orderBy('domiciliario.nombreDomiciliario')
			);
			onSnapshot(q, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type == 'added') {
						if (!this.allAbonos.some((abono) => abono.docId == change.doc.id)) {
							const data = {
								docId: change.doc.id,
								...change.doc.data(),
							};
							this.allAbonos.push(data);
						}
					} else if (change.type == 'removed') {
						this.allAbonos = this.allAbonos.filter(
							(doc) => doc.docId !== change.doc.id
						);
					} else if (change.type == 'modified') {
						let cambio = this.allAbonos.find(
							(abono) => abono.docId == change.doc.id
						);
						let index = this.allAbonos.findIndex(
							(abono) => abono.docId == change.doc.id
						);
						this.allAbonos[index] = { ...cambio, ...change.doc.data() };
					}
				});
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
