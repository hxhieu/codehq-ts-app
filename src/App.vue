<script setup lang="ts">
import styles from './App.module.css'
import { initShellStore } from './App.store'
import { ref } from 'vue'
import TopMenu from './views/TopMenu.vue'

const loading = ref(true)
initShellStore().finally(() => (loading.value = false))
</script>

<template>
	<TopMenu v-if="!loading" />
	<div v-if="loading" :class="styles.configurationLoader">
		<h1>Configuring the application...</h1>
	</div>
	<div v-else :class="styles.mainContainer">
		<router-view></router-view>
	</div>
</template>
