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
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
