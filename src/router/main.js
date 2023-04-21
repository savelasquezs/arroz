import { createRouter, createWebHashHistory } from 'vue-router';
import { auth } from '../firebase/firebaseInit';

const NODE_ENV = process.env.NODE_ENV;

const routes = [
	{
		path: '/login',
		component: () => import('../views/Login.vue'),
		name: 'Login',
	},
	{
		path: '/register',
		component: () => import('../views/Register.vue'),
		name: 'Register',
	},
	{
		path: '/admin',
		meta: {
			requiresAuth: true,
		},
		children: [
			{
				path: '/pedidos/todos',
				name: 'Pedidos',
				component: () => import('../views/Pedidos.vue'),
			},
			{
				path: '/gastos',
				name: 'Gastos',
				component: () => import('../views/Gastos.vue'),
			},
			{
				path: '/clientes',
				name: 'Clientes',
				component: () => import('../views/Clientes.vue'),
			},
			{
				path: '/productos',
				name: 'Productos',
				component: () => import('../views/Productos.vue'),
			},
			{
				path: '/home',
				name: 'Home',
				component: () => import('../views/Home.vue'),
			},
			// {
			// 	path: '/pedidos/:pedidoId',
			// 	name: 'detallePedido',
			// 	component: DetallePedido,
			// },
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.matched.some((ruta) => ruta.meta.requiresAuth)) {
		const user = auth.currentUser;
		if (user) {
			next();
		} else {
			next({
				name: 'Login',
			});
		}
	} else {
		if ((to.path == '/login' || to.path == '/register') && auth.currentUser) {
			next({ name: 'Pedidos' });
			console.log(to);
		} else {
			next();
			console.log(to);
		}
	}
});

export default router;
