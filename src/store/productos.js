import { defineStore } from 'pinia';
import { useUtilsStore } from './utils';

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
			useUtilsStore().listenChanges({
				store: this,
				tabla: 'productos',
				ordenarPor: 'nombre',
				arrayName: 'productDatabase',
			});
		},

		setCurrentProduct(id) {
			this.currentProduct = this.productDatabase.find(
				(product) => product.docId == id
			);
			console.log(this.currentProduct);
		},
	},
	getters: {
		getProducts: (state) => (search) =>
			state.productDatabase.filter((product) =>
				product.nombre.toLowerCase().includes(search.toLowerCase())
			),
	},
});
