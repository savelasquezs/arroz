import { db } from '../firebase/firebaseInit';
import { defineStore } from 'pinia';
import { useUtilsStore } from './main';
import {
	getDocs,
	collection,
	addDoc,
	updateDoc,
	doc,
} from 'firebase/firestore';

export const useCategorias = defineStore('categorias', {
	state: () => {
		return {
			allCategories: [],
			deletingCat: null,
			currentCat: null,
			editingCat: null,
		};
	},
	actions: {
		toggleEditingd() {
			this.editingCat = !this.editingCat;
		},
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
		toogleDelete() {
			this.deletingCat = !this.deletingCat;
		},
		setCurrent(id) {
			this.currentCat = this.allCategories.find((cat) => cat.docId == id);
		},
		addCategoria(object) {
			this.allCategories.push(object);
		},
		deleteCat(id) {
			this.allCategories = this.allCategories.filter((cat) => cat.docId != id);
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
		async updateElement(data, tabla, id) {
			const docRef = doc(db, tabla, id);
			await updateDoc(docRef, data);
			let index;
			let cambio;
			let mensaje;
			switch (tabla) {
				case 'categories':
					index = useCategorias().allCategories.findIndex(
						(cat) => cat.docId == id
					);
					cambio = useCategorias().allCategories.find((cat) => cat.docId == id);
					useCategorias().allCategories[index] = { ...cambio, ...data };
					mensaje = 'Categoria actualizada exitosamente';
					break;

				default:
					break;
			}
			useUtilsStore().confirmAction(mensaje);
		},
	},
});
