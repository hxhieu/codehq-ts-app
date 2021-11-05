import { defineStore, _GettersTree as PiniaGettersTree } from 'pinia'
import { SHELL_STORE_KEY } from './store.keys'
import { ApiResponse, ClientConfiguration } from './types/models'
import { get } from './utils/http-client'
import * as logger from './utils/logger'
import * as alert from './utils/alert'
import { router } from './router'

interface ShellStoreState {
	upn: string
	accessToken: string
	configUrl: string
	apiUrl: string
	issuerUrl: string
	clientId: string
	theme: 'dark' | 'light'
}

interface ShellStoreGetter extends PiniaGettersTree<ShellStoreState> {
	validConfig: (state: ShellStoreState) => boolean
	isLoggedIn: (state: ShellStoreState) => boolean
}

interface ShellStoreAction {
	fetchConfiguration: (
		configUrl: string,
	) => Promise<ClientConfiguration | undefined>
}

/* Actions implementations */
const fetchConfiguration = async (
	configUrl: string,
): Promise<ClientConfiguration | undefined> => {
	const response = await get<ApiResponse<ClientConfiguration>>(configUrl)
	if (response.error) {
		throw new Error(response.error)
	}
	return response.data
}

const useShellStore = defineStore<
	string,
	ShellStoreState,
	ShellStoreGetter,
	ShellStoreAction
>(SHELL_STORE_KEY, {
	state: () => ({
		upn: '',
		accessToken: '',
		configUrl: import.meta.env.VITE_CLIENT_CONFIGURATION_URL as string,
		apiUrl: '',
		issuerUrl: '',
		clientId: '',
		theme: 'dark',
	}),
	getters: {
		validConfig: (state) =>
			!!state.apiUrl && !!state.clientId && !!state.issuerUrl,
		isLoggedIn: (state) => !!state.upn && !!state.accessToken,
	},
	actions: {
		fetchConfiguration,
	},
})

const initShellStore = async () => {
	const store = useShellStore()
	// Auto save state to localStorage
	store.$subscribe((_, state) => {
		localStorage.setItem(SHELL_STORE_KEY, JSON.stringify(state))
	})

	// Try to rehydrate the state from the localStorage
	const savedStateJson = localStorage.getItem(SHELL_STORE_KEY)
	try {
		const savedState = JSON.parse(savedStateJson || '{}')
		delete savedState.$id
		store.$state = savedState
	} catch (err) {
		logger.error(`Failed to rehydrate the state from localStorage. ${err}`)
		// Fail to load the configure then reset/reload to restart
		localStorage.removeItem(SHELL_STORE_KEY)
		window.location.reload()
	}

	// Validate the configuration
	if (!store.validConfig) {
		try {
			const { configUrl } = store
			const clientConfig = await store.fetchConfiguration(configUrl)
			if (!clientConfig) {
				throw new Error(
					`Client configuration is not set on the server. Fetched from ${configUrl}`,
				)
			}
			const {
				auth: { issuer: issuerUrl, client_id: clientId },
				api_url: apiUrl,
			} = clientConfig
			store.$state = {
				...store,
				issuerUrl,
				clientId,
				apiUrl,
			}
		} catch (err) {
			logger.error(err)
			alert.error(`Failed to fetch the configuration. ${err}`, 10000)
			router.replace('/configuration')
		}
	}
}

export { useShellStore, initShellStore }
