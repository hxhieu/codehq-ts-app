<script setup lang="ts">
import { useShellStore } from '../App.store'
import { useMsal } from '../composables'
import { router } from '../router'
import { error } from '../utils/alert'

const { isLoggedIn } = useShellStore()

if (isLoggedIn) {
	router.replace('/')
} else {
	const { handleCallback } = useMsal()
	handleCallback()
		.then((accessToken) => {
			console.log(accessToken)
		})
		.catch(error)
}
</script>

<template>
	<h1>Logging you in...</h1>
</template>
