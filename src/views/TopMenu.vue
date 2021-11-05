<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useShellStore } from '../App.store'
import { SettingOutlined as IconSettings } from '@ant-design/icons-vue'
import { router } from '../router'

const { theme, upn } = storeToRefs(useShellStore())

const onSelect = ({ key }: { key: string }) => {
	router.push(key)
}
</script>

<template>
	<a-menu mode="horizontal" :theme="theme" @select="onSelect">
		<a-menu-item key="/">Home</a-menu-item>
		<a-menu-item key="/configuration" class="icon-only right">
			<template #icon>
				<IconSettings />
			</template>
		</a-menu-item>
		<a-sub-menu v-if="!!upn">
			<template #title>{{ upn }}</template>
			<a-menu-item key="/logout">Log out</a-menu-item>
		</a-sub-menu>
	</a-menu>
</template>
