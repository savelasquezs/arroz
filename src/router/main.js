import { createRouter, createWebHashHistory } from 'vue-router';

const NODE_ENV = process.env.NODE_ENV;

const routes = [
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
];

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
