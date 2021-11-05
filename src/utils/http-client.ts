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
		const { status, statusText } = response
		if (status >= 300) {
			error(response)
			const err = await response.text()
			return Promise.reject(`${status} ${statusText} - ${err}`)
		}
		return response.json()
	} catch (err) {
		return Promise.reject(err)
	}
}

export { get }
