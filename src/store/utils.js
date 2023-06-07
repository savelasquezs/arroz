import { defineStore } from 'pinia';
import {
	collection,
	onSnapshot,
	query,
	orderBy,
	doc,
	updateDoc,
	addDoc,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import moment from 'moment';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebase/firebaseInit';

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
						store[arrayName] = store[arrayName].filter(
							(item) => item.docId != change.doc.id
						);
					}
				});
			});
		},
		async saveElement(data, tabla) {
			const docRef = await addDoc(collection(db, tabla), data);
			useUtilsStore().confirmAction(`Registro guardado exitosamente`);
			return docRef;
		},
		async updateElement(data, tabla, id) {
			const docRef = doc(db, tabla, id);
			await updateDoc(docRef, data);

			useUtilsStore().confirmAction('Actualización completada');
		},
		async saveElementWithImage(data, tabla, imageNombre, imageFile) {
			try {
				const articulo = await this.saveElement(data, tabla);
				const articuloId = articulo.id;
				console.log(articuloId);
				const storageRef = ref(
					storage,
					`${tabla}/${articuloId}/${imageNombre}`
				);
				await uploadBytes(storageRef, imageFile);
				const imageUrl = await getDownloadURL(storageRef);
				console.log(imageUrl);
				await this.updateElement({ imageUrl: imageUrl }, tabla, articuloId);
			} catch (err) {
				alert('Error al guardar articulo', err);
			}
		},
	},
});
