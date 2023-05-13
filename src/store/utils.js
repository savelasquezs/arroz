import { defineStore } from 'pinia';
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	doc,
	updateDoc,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import moment from 'moment';

import { db } from '../firebase/firebaseInit';
import { array } from 'i/lib/util';

export const useProductsStore = defineStore('ProductosStore', {
	state: () => {
		return {
			editProduct: null,
			productDatabase: [],
			modalProducto: null,
			productLoaded: false,
			currentProduct: null,
			borrarProducto: null,
		};
	},
	actions: {
		addProduct(product) {
			this.productDatabase.push(product);
		},
		toggleModalProducto() {
			this.modalProducto = !this.modalProducto;
		},
		toggleEditProduct() {
			this.editProduct = !this.editProduct;
		},
		toggleDeleteProduct() {
			this.borrarProducto = !this.borrarProducto;
		},

		setCurrentProduct(id) {
			this.currentProduct = this.productDatabase.find(
				(product) => product.docId == id
			);
			console.log(this.currentProduct);
		},
	},
});

export const useUtilsStore = defineStore('UtilsStore', {
	state: () => {
		return {};
	},
	actions: {
		confirmAction(Mensaje, timer = 2000, icon = 'success') {
			Swal.fire({
				icon,
				title: Mensaje,
				showConfirmButton: false,
				timer,
			});
		},
		fechaLocal(fecha) {
			return moment(fecha).format('ll');
		},
		horaLocal(hora) {
			return moment(hora).format('LT');
		},
		horaYFechaLocal(hora) {
			return moment(hora).format('MMMM Do YY, h:mm a');
		},
		capitalize(words) {
			const wordsArray = words.split(' ');
			const wordsUppercase = wordsArray.map(
				(word) => word[0].toUpperCase() + word.substring(1)
			);
			const result = wordsUppercase.join(' ');
			return result;
		},
		listenChanges({ store, tabla, ordenarPor, arrayName }) {
			console.log(store);
			const q = ordenarPor
				? query(collection(db, tabla), orderBy(ordenarPor))
				: collection(db, tabla);
			onSnapshot(q, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type == 'added') {
						if (!store[arrayName].some((item) => item.docId == change.doc.id)) {
							const data = {
								docId: change.doc.id,
								...change.doc.data(),
							};
							store[arrayName].unshift(data);
						}
					} else if (change.type == 'modified') {
						let cambio = store[arrayName].find(
							(item) => item.docId == change.doc.id
						);
						let index = store[arrayName].findIndex(
							(item) => item.docId == change.doc.id
						);
						store[arrayName][index] = { ...cambio, ...change.doc.data() };
					} else if (change.type == 'removed') {
						store[arrayName] = store.productDatabase.filter(
							(item) => item.docId != change.doc.id
						);
					}
				});
			});
		},
		async saveElement(data, tabla) {
			const docRef = await addDoc(collection(db, tabla), data);

			useUtilsStore().confirmAction(`Registro guardado exitosamente`);
		},
		async updateElement(data, tabla, id) {
			const docRef = doc(db, tabla, id);
			await updateDoc(docRef, data);

			useUtilsStore().confirmAction('Actualización completada');
		},
	},
});
