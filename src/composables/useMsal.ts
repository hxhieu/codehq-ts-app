import { PublicClientApplication } from '@azure/msal-browser'
import { useShellStore } from '../App.store'
import { WeakInstance } from '../utils/weak-instance'

interface MsalHook {
	login: () => Promise<void>
	logout: () => void
	handleCallback: () => Promise<string | undefined>
}

let msalInstance: WeakInstance<PublicClientApplication>

const login = async () => {
	msalInstance.get()?.loginRedirect({
		scopes: ['openid', 'profile'],
		redirectUri: '/auth_callback',
	})
}

const logout = () => {
	console.log('logout')
}

const handleCallback = async (): Promise<string | undefined> => {
	const tokenResponse = await msalInstance.get()?.handleRedirectPromise()
	if (!tokenResponse) {
		return Promise.reject(
			'Failed to get the token response, result in a null token',
		)
	}
	Promise.resolve(tokenResponse.accessToken)
}

const useMsal = (): MsalHook => {
	if (!msalInstance) {
		const { issuerUrl, clientId } = useShellStore()
		const authority = issuerUrl.replace(/\/v2.0/, '')
		msalInstance = new WeakInstance(
			new PublicClientApplication({
				auth: {
					authority,
					clientId,
				},
			}),
		)
	}
	return {
		login,
		logout,
		handleCallback,
	}
}

export { useMsal }
