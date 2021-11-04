import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('./pages/Home/index.vue'),
	},
	{
		path: '/configuration',
		component: () => import('./pages/Configuration/index.vue'),
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
