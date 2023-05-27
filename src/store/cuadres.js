import { defineStore } from 'pinia';
import { useUtilsStore } from './utils';

export const useCuadres = defineStore('cuadres', {
	state: () => {
		return {
			currentCuadre: {},
			allCuadres: [],
			editCuadreFormOpened: null,
		};
	},
	actions: {
		toggleloginFormOpened() {
			this.loginFormOpened = !this.loginFormOpened;
		},
		setCurrentCuadre(id) {
			this.currentCuadre = this.allCuadres.find((cuadre) => cuadre.docId == id);
		},

		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'cuadres',
				ordenarPor: 'fecha',
				arrayName: 'allCuadres',
			});
		},
	},
});
