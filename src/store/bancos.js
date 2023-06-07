import { defineStore } from 'pinia';
import { useUtilsStore } from './utils';

export const useBancos = defineStore('BancosStore', {
	state: () => {
		return {
			bancoFormShowed: null,
			bancoDatabase: [],
			bancosLoaded: null,
			editbanco: null,
			currentbanco: {},
			deletingbanco: null,
			detallebanco: null,
		};
	},
	getters: {
		filtradosbancosArray(state) {
			return (filtro) => {
				return state.bancoDatabase.filter((banco) =>
					banco.nombre.toString().includes(filtro)
				);
			};
		},
	},
	actions: {
		toggleDelete() {
			this.deletingbanco = !this.deletingbanco;
		},
		togglebancoForm() {
			this.bancoFormShowed = !this.bancoFormShowed;
		},
		toggleEditbanco() {
			this.editbanco = !this.editbanco;
		},
		toggleDetallebanco() {
			this.detallebanco = !this.detallebanco;
		},

		listenChanges() {
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'bancos',
				ordenarPor: 'nombre',
				arrayName: 'bancoDatabase',
			});
		},
		setCurrentbanco(id) {
			this.currentbanco = {
				...this.bancoDatabase.find((banco) => banco.docId == id),
			};
			console.log(this.currentbanco);
		},
	},
	// other options...
});
