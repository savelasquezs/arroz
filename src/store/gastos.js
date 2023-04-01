import { db } from '../firebase/firebaseInit';
import { defineStore } from 'pinia';
import { useUtilsStore } from './main';
import { getDocs, collection, addDoc } from 'firebase/firestore';

export const useCategorias = defineStore('categorias', {
	state: () => {
		return {
			allCategories: [],
		};
	},
	actions: {
		async getCategories() {
			const querySnapshot = await getDocs(collection(db, 'categories'));
			querySnapshot.forEach((doc) => {
				if (!this.allCategories.some((cat) => cat.docId == doc.id)) {
					const data = {
						docId: doc.id,
						...doc.data(),
					};
					this.allCategories.push(data);
				}
			});
		},
		addCategoria(object) {
			this.allCategories.push(object);
		},
	},
});

export const useUtilsGastos = defineStore('utilsGastos', {
	state: () => {
		return {};
	},
	actions: {
		async saveElement(data, tabla) {
			const docRef = await addDoc(collection(db, tabla), data);
			console.log(docRef.id);
			let mensaje = '';
			switch (tabla) {
				case 'categories':
					useCategorias().addCategoria({ ...data, docId: docRef.id });
					mensaje = 'Categoria Guardad exitosamente';
					break;
				default:
					break;
			}
			useUtilsStore().confirmAction(`${mensaje}`);
		},
	},
});
