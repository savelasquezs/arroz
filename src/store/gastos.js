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
			formOpenned: null,
		};
	},
	actions: {
		toggleForm() {
			this.formOpenned = !this.formOpenned;
		},
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

export const useTipoGastos = defineStore('tipoGastos', {
	state: () => {
		return {
			allTipoGastos: [],
			deletingTipoGasto: null,
			currentTipoGasto: null,
			editingTipoGasto: null,
			formOpenned: null,
		};
	},
	actions: {
		toggleEditing() {
			this.editingTipoGasto = !this.editingTipoGasto;
		},
		toggleDeleting() {
			this.deletingTipoGasto = !this.deletingTipoGasto;
		},
		toggleForm() {
			this.formOpenned = !this.formOpenned;
		},
		setCurrent(id) {
			this.currentTipoGasto = this.allTipoGastos.find(
				(gasto) => gasto.docId == id
			);
		},
		addTipoGasto(object) {
			this.allTipoGastos.push(object);
		},
		deleteTipoGasto(id) {
			this.allTipoGastos = this.allTipoGastos.filter(
				(gasto) => gasto.docId != id
			);
		},
		async getTipoGastos() {
			const allTipo = await getDocs(collection(db, 'tipoGastos'));
			allTipo.forEach((doc) => {
				if (!this.allTipoGastos.some((gasto) => gasto.docId == doc.id)) {
					const data = {
						docId: doc.id,
						...doc.data(),
					};
					this.allTipoGastos.push(data);
				}
			});
		},
	},
});
export const useGastosHoy = defineStore('gastosHoy', {
	state: () => {
		return {
			allGastos: [],
			deletingGasto: null,
			currentGasto: null,
			editingGasto: null,
			formOpenned: null,
		};
	},
	actions: {
		toggleEditing() {
			this.editingGasto = !this.editingGasto;
		},
		toggleDeleting() {
			this.deletingGasto = !this.deletingGasto;
		},
		toggleForm() {
			this.formOpenned = !this.formOpenned;
		},
		setCurrent(id) {
			this.currentGasto = this.allGastos.find((gasto) => gasto.docId == id);
		},
		addGasto(object) {
			this.allGastos.push(object);
		},
		deleteGasto(id) {
			this.allGastos = this.allGastos.filter((gasto) => gasto.docId != id);
		},
		async getGastos() {
			const all = await getDocs(collection(db, 'Gastos'));
			all.forEach((doc) => {
				if (!this.allGastos.some((gasto) => gasto.docId == doc.id)) {
					const data = {
						docId: doc.id,
						...doc.data(),
					};
					this.allGastos.push(data);
				}
			});
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
					// useCategorias().addCategoria({ ...data, docId: docRef.id });
					mensaje = 'Categoria Guardado exitosamente';
					break;
				case 'tipoGastos':
					// useTipoGastos().addTipoGasto({ ...data, docId: docRef.id });
					mensaje = 'Tipo de gasto guardado exitosamente';
					break;
				case 'Gastos':
					// useGastosHoy().addGasto({ ...data, docId: docRef.id });
					mensaje = 'Gasto guardado exitosamente';
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
				case 'tipoGastos':
					index = useTipoGastos().allTipoGastos.findIndex(
						(gasto) => gasto.docId == id
					);
					cambio = useTipoGastos().allTipoGastos.find(
						(gasto) => gasto.docId == id
					);
					useTipoGastos().allTipoGastos[index] = { ...cambio, ...data };
					mensaje = 'Tipo de gasto actualizado exitosamente';
					break;
				case 'Gastos':
					index = useGastosHoy().allGastos.findIndex(
						(gasto) => gasto.docId == id
					);
					cambio = useGastosHoy().allGastos.find((gasto) => gasto.docId == id);
					useGastosHoy().allGastos[index] = { ...cambio, ...data };
					mensaje = 'Gasto actualizado exitosamente';
					break;

				default:
					break;
			}
			useUtilsStore().confirmAction(mensaje);
		},
	},
});
