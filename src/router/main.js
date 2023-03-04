import { createRouter, createWebHistory } from 'vue-router';
import Clientes from '../views/Clientes.vue';
import Pedidos from '../views/Pedidos.vue';
import Productos from '../views/Productos.vue';

const NODE_ENV = process.env.NODE_ENV;

const routes = [
	{
		path: '/pedidos/todos',
		name: 'Pedidos',
		component: Pedidos,
	},
	{
		path: '/clientes',
		name: 'Clientes',
		component: Clientes,
	},
	{
		path: '/productos',
		name: 'Productos',
		component: Productos,
	},
	// {
	// 	path: '/pedidos/:pedidoId',
	// 	name: 'detallePedido',
	// 	component: DetallePedido,
	// },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
