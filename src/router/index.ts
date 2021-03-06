import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
	return (originalPush.call(this, location) as any).catch((err: any) => err);
};

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Main.vue'),
	},
	{
		path: '/Product',
		name: 'Product',
		component: () => import('@/components/Common/TravelList.vue'),
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
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('@/components/Backoffice/Login.vue'),
	},
	{
		path: '/:id',
		name: 'Location',
		component: () => import('@/components/Common/Location.vue'),
	},
	{ path: '*', redirect: '/' },
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
