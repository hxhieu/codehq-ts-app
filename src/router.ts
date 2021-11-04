import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/configuration',
		component: () => import('./views/Configuration.vue'),
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
