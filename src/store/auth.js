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
import router from '../router/main';

export const useAuth = defineStore('authArroz', {
	state: () => {
		return {
			user: { isAdmin: null },
		};
	},
	actions: {
		setUser(datos) {
			localStorage.setItem('user', JSON.stringify({ ...this.user, ...datos }));
			this.user = JSON.parse(localStorage.getItem('user'));
		},
		showUser() {
			console.log(this.user);
		},
		setAdmin(value) {
			this.user.isAdmin = value;
		},
		clearUser() {
			localStorage.removeItem('user');
			this.user = {};
		},
		async registerUser(datosUsuario) {
			const { email, password, password2, fullName } = datosUsuario;
			try {
				if (password == password2) {
					createUserWithEmailAndPassword(auth, email, password).then((cred) => {
						updateProfile(cred.user, {
							displayName: fullName,
						});
						this.setUser(cred.user);
						console.log(this.user);
					});
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

			signInWithEmailAndPassword(auth, email, password)
				.then((user) => {
					this.setUser(user.user);
					this.showUser();
					router.push('/pedidos/todos');
				})
				.catch((error) => {
					console.log(error.code);
					let mensaje = '';
					switch (error.code) {
						case 'auth/user-not-found':
							mensaje = 'No encontramos este usuario';
							break;
						case 'auth/wrong-password':
							mensaje = 'La contraseña no coincide, intenta de nuevo';
							break;
						case 'auth/invalid-email':
							mensaje = 'el correo ingresado no es valido';
							break;
						default:
							mensaje = `Algo salió mal ${error.code}`;
							break;
					}
					useUtilsStore().confirmAction(mensaje, 2000, 'error');
				});
		},

		async logout() {
			await auth.signOut();
			this.clearUser();
			await router.push('/login');
		},
	},
});
