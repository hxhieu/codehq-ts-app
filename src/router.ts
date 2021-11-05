import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import { useShellStore } from './App.store'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: Home,
	},
	{
		path: '/configuration',
		component: () => import('./views/Configuration.vue'),
		meta: {
			anon: true,
		},
	},
	{
		path: '/login',
		component: () => import('./views/Login.vue'),
		meta: {
			anon: true,
		},
	},
	{
		path: '/auth_callback',
		component: () => import('./views/AuthCallback.vue'),
		meta: {
			anon: true,
		},
	},
	{
		path: '/401',
		component: () => import('./views/401.vue'),
		meta: {
			anon: true,
		},
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('./views/404.vue'),
		meta: {
			anon: true,
		},
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.matched.some((x) => x.meta.anon)) {
		return next()
	}
	const shellStore = useShellStore()
	if (shellStore.isLoggedIn) {
		return next()
	}
	next('/login')
})

export { router }
