import { db } from '../firebase/firebaseInit';
import { defineStore } from 'pinia';
import { useUtilsStore } from './main';
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
			const q = query(
				collection(db, 'domiciliarios'),
				orderBy('nombreDomiciliario')
			);
			onSnapshot(q, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type == 'added') {
						if (
							!this.allDomiciliarios.some(
								(domiciliario) => domiciliario.docId == change.doc.id
							)
						) {
							const data = {
								docId: change.doc.id,
								...change.doc.data(),
							};
							this.allDomiciliarios.push(data);
						}
					} else if (change.type == 'removed') {
						this.allDomiciliarios = this.allDomiciliarios.filter(
							(doc) => doc.docId !== change.doc.id
						);
					} else if (change.type == 'modified') {
						let cambio = this.allDomiciliarios.find(
							(domiciliario) => domiciliario.docId == change.doc.id
						);
						let index = this.allDomiciliarios.findIndex(
							(domiciliario) => domiciliario.docId == change.doc.id
						);
						this.allDomiciliarios[index] = { ...cambio, ...change.doc.data() };
					}
				});
			});
		},
	},
});
