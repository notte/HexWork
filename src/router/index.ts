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
		path: '/Product',
		name: 'Product',
		component: () => import('@/views/Product.vue'),
	},
	{
		path: '/Cart',
		name: 'Cart',
		component: () => import('@/views/Cart.vue'),
	},
	{
		path: '/SetOrder',
		name: 'SetOrder',
		component: () => import('@/views/Cart.vue'),
	},
	{
		path: '/CheckOut',
		name: 'CheckOut',
		component: () => import('@/views/Cart.vue'),
	},
	{
		path: '/Completed',
		name: 'Completed',
		component: () => import('@/views/Cart.vue'),
	},
	{
		path: '/Backoffice',
		name: 'Backoffice',
		component: () => import('@/views/Backoffice.vue'),
		// children: [],
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('@/components/Backoffice/Login.vue'),
	},
	{
		path: '/:id',
		name: 'TaiwanItem',
		component: () => import('@/components/Common/Location.vue'),
	},
];

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	next();
});

export default router;
