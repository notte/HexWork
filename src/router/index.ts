import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
	{
		path: '/',
		name: 'Home',
		redirect: { name: 'ThirdWeek' },
		// component: () => import('@/views/Main.vue'),
	},
	// {
	// 	path: '/Foreign',
	// 	name: 'Foreign',
	// 	component: () => import('@/views/Foreign.vue'),
	// },
	// {
	// 	path: '/Taiwan',
	// 	name: 'Taiwan',
	// 	component: () => import('@/views/Taiwan.vue'),
	// },
	{
		path: 'ThirdWeek',
		name: 'ThirdWeek',
		component: () => import('@/views/MainMission/ThirdWeek.vue'),
	},
	{
		path: 'FourthWeek',
		name: 'FourthWeek',
		component: () => import('@/views/MainMission/FourthWeek.vue'),
	},
	{
		path: 'FifthWeek',
		name: 'FifthWeek',
		component: () => import('@/views/MainMission/FifthWeek.vue'),
	},
	{
		path: 'FourthWeek_login',
		name: 'FourthWeek_login',
		component: () => import('@/views/MainMission/FourthWeek_login.vue'),
	},
	{
		path: 'FifthWeek_login',
		name: 'FifthWeek_login',
		component: () => import('@/views/MainMission/FifthWeek_login.vue'),
	},
	// {
	// 	path: '*',
	// 	name: '404',
	// 	component: () => import('@/views/MainMission/404.vue'),
	// },
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
