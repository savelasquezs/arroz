import { createRouter, createWebHashHistory } from 'vue-router';
import Clientes from '../views/Clientes.vue';
import Pedidos from '../views/Pedidos.vue';
import Productos from '../views/Productos.vue';
import Home from '../views/Home.vue';

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
	{
		path: '/home',
		name: 'Home',
		component: Home,
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
