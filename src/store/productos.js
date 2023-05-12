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

		listenChanges() {
			const q = query(collection(db, 'productos'), orderBy('nombre'));
			onSnapshot(q, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type == 'added') {
						if (
							!this.productDatabase.some(
								(product) => product.docId == change.doc.id
							)
						) {
							const data = {
								docId: change.doc.id,
								...change.doc.data(),
							};
							this.productDatabase.push(data);
						}
					} else if (change.type == 'modified') {
						let cambio = this.productDatabase.find(
							(product) => product.docId == change.doc.id
						);
						let index = this.productDatabase.findIndex(
							(product) => product.docId == change.doc.id
						);
						this.productDatabase[index] = { ...cambio, ...change.doc.data() };
					} else if (change.type == 'removed') {
						this.productDatabase = this.productDatabase.filter(
							(product) => product.docId != change.doc.id
						);
					}
				});
			});
		},

		setCurrentProduct(id) {
			this.currentProduct = this.productDatabase.find(
				(product) => product.docId == id
			);
			console.log(this.currentProduct);
		},
	},
});
