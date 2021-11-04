// Abstract REST client, using fetch API for now

import { error } from './logger'

const get = async <T>(url: string, jwt?: string): Promise<T> => {
	const options: RequestInit = {
		method: 'GET',
	}
	if (jwt) {
		options.headers = new Headers({
			Authorization: `Bearer ${jwt}`,
		})
	}
	try {
		const response = await fetch(url, options)
		if (response.status >= 300) {
			error(response)
			const err = await response.text()
			return Promise.reject(`${response.statusText} - ${err}`)
		}
		return response.json()
	} catch (err) {
		return Promise.reject(err)
	}
}

export { get }
