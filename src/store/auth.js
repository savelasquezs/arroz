import { db, auth } from '../firebase/firebaseInit';

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { defineStore } from 'pinia';
import { useUtilsStore } from './main';
import {
	getDocs,
	collection,
	addDoc,
	updateDoc,
	doc,
} from 'firebase/firestore';

export const useAuth = defineStore('authArroz', {
	state: () => {
		return {
			user: null,
		};
	},
	actions: {
		setUser(user) {
			localStorage.setItem('user', JSON.stringify(user));
			this.user = JSON.parse(localStorage.getItem('user'));
		},
		clearUser() {
			localStorage.removeItem('user');
			this.user = '';
		},
		async registerUser(datosUsuario) {
			const { email, password, password2, fullName } = datosUsuario;
			try {
				if (password == password2) {
					const cred = await createUserWithEmailAndPassword(
						auth,
						email,
						password
					);
					updateProfile(cred.user, {
						displayName: fullName,
					});
					this.setUser(cred.user);
					console.log(this.user);
					return;
				} else {
					useUtilsStore().confirmAction(
						'Las contraseñas no coinciden, intenta de nuevo',
						2000,
						'error'
					);
				}
			} catch (error) {
				let mensaje = '';
				switch (error.code) {
					case 'auth/email-already-in-use':
						mensaje = 'El correo ingresado ya esta registrado, inicia sesión';
						break;
					case 'auth/invalid-email':
						mensaje = 'Debes ingresar un correo valido';
						break;
					case 'auth/operation-not-allowed':
						mensaje = 'Operación no permitida en este momento';
						break;
					case 'auth/weak-password':
						mensaje =
							'La contraseña ingresada es debil, intenta con una mas fuerte';
						break;
					default:
						mensaje = `Algo salió mal , ${error}`;
				}
				useUtilsStore().confirmAction(mensaje, 2000, 'error');
			}
		},
		async login(datosUsuario) {
			const { email, password } = datosUsuario;
			try {
				signInWithEmailAndPassword(auth, email, password);
			} catch (error) {
				let mensaje = '';
				switch (error.code) {
					case 'auth/user-not-found':
						(mensaje = 'No encontramos este usuario'), 'error';
						break;
					case 'auth/wrong-password':
						(mensaje = 'La contraseña no coincide, intenta de nuevo'), 'error';
						break;
					default:
						(mensaje = `Algo salió mal ${error}`), 'error';
						break;
				}
				useUtilsStore().confirmAction(mensaje, 2000, 'error');
				return;
			}
		},
	},
});
