import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Main.vue'),
	},
	{
		path: '/Foreign',
		name: 'Foreign',
		component: () => import('@/views/Foreign.vue'),
	},
	{
		path: '/Taiwan',
		name: 'Taiwan',
		component: () => import('@/views/Taiwan.vue'),
	},
	{
		path: '/Taiwan/Id',
		name: 'TaiwanItem',
		component: () => import('@/components/Taiwan/Location.vue'),
	},
	{
		path: '/Cart',
		name: 'Cart',
		component: () => import('@/views/Cart.vue'),
	},
	{
		path: '/Order',
		name: 'Order',
		component: () => import('@/components/Cart/SetOrder.vue'),
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
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
});

export default router;
