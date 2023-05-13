import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
const pinia = createPinia();
import router from './router/main';
import VueSweetalert2 from 'vue-sweetalert2';
import { auth } from './firebase/firebaseInit';
import { useAuth } from './store/auth';

auth.onAuthStateChanged(async (user) => {
	if (user == null) {
		useAuth().clearUser();
	} else {
		await user.getIdTokenResult().then((idTokenResult) => {
			console.log(idTokenResult.claims.admin);
			useAuth().user.isAdmin = idTokenResult.claims.admin;
			useAuth().setUser(user);
			useAuth().setAdmin(idTokenResult.claims.admin);
			useAuth().showUser();
		});
		if (
			router.isReady() &&
			(router.currentRoute.value.path == '/login' ||
				router.currentRoute.value.path == '/register')
		) {
			router.push('/pedidos/todos');
		}
	}
});

createApp(App).use(router).use(pinia).use(VueSweetalert2).mount('#app');
