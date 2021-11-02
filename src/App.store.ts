import { defineStore, Store } from 'pinia'
import { SHELL_STORE_KEY } from './store.keys'

export interface ShellStoreState {
	upn: string
	configUrl: string
	apiUrl: string
	issuerUrl: string
	clientId: string
}

const useShellStore = defineStore<string, ShellStoreState>(SHELL_STORE_KEY, {
	state: () => ({
		upn: '',
		configUrl: '',
		apiUrl: '',
		issuerUrl: '',
		clientId: '',
	}),
})

const initShellStore = (store: Store<string, ShellStoreState>) => {
	// Auto save state to localStorage
	store.$subscribe((_, state) => {
		localStorage.setItem(SHELL_STORE_KEY, JSON.stringify(state))
	})

	// Rehydrate the store from localStorage
	const savedStateJson = localStorage.getItem(SHELL_STORE_KEY)
	if (!savedStateJson) {
		localStorage.setItem(SHELL_STORE_KEY, JSON.stringify(store))
	} else {
		const savedState = JSON.parse(savedStateJson)
		delete savedState.$id
		store.$state = savedState
	}
}

export { useShellStore, initShellStore }
