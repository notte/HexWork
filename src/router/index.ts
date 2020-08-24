import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		// component: () => import('@/views/Main.vue'),
		redirect: { name: 'About' },
	},
	{
		path: '/About',
		name: 'About',
		component: () => import('@/views/About.vue'),
	},
	{
		path: '/ProductList',
		name: 'ProductList',
		component: () => import('@/views/ProductList.vue'),
	},
	{
		path: '/ShoppingCart',
		name: 'ShoppingCart',
		component: () => import('@/views/ShoppingCart.vue'),
	},
	{
		path: '/Payment',
		name: 'Payment',
		component: () => import('@/views/Payment.vue'),
	},
	{
		path: '/Backoffice',
		name: 'Backoffice',
		component: () => import('@/views/Backoffice.vue'),
		children: [
			{
				path: 'Login',
				name: 'Login',
				component: () => import('@/components/Backoffice/Login.vue'),
			},
		],
	},
	// {
	// 	path: '/Id',
	// 	name: 'TaiwanItem',
	// 	component: () => import('@/components/Taiwan/Location.vue'),
	// },
	// {
	// 	path: '/Cart',
	// 	name: 'Cart',
	// 	component: () => import('@/views/Cart.vue'),
	// },
	// {
	// 	path: '/Order',
	// 	name: 'Order',
	// 	component: () => import('@/components/Cart/SetOrder.vue'),
	// },
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
});

export default router;
