import { db } from '../firebase/firebaseInit';
import { defineStore } from 'pinia';
import { useUtilsStore } from './utils';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';

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

		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'categories',
				ordenarPor: 'categorie',
				arrayName: 'allCategories',
			});
		},

		toogleDelete() {
			this.deletingCat = !this.deletingCat;
		},
		setCurrent(id) {
			this.currentCat = this.allCategories.find((cat) => cat.docId == id);
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
		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'tipoGastos',
				ordenarPor: 'nombre',
				arrayName: 'allTipoGastos',
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

		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'Gastos',
				ordenarPor: 'fecha',
				arrayName: 'allGastos',
			});
		},
	},
});
