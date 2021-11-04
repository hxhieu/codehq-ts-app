<script setup lang="ts">
import { initShellStore } from './App.store'
import { ref } from 'vue'

const loading = ref(true)
initShellStore().finally(() => (loading.value = false))
</script>

<template>
	<h1 v-if="loading">Configuring the application...</h1>
	<router-view v-else></router-view>
</template>
